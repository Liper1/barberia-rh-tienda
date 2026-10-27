"use client";
import { useState } from "react";
import { validarCheckout } from "@/lib/validaciones";
import Campo from "./Campo";
import Boton from "./Boton";
import SelectorRegionComuna from "./SelectorRegionComuna";

export default function FormularioCheckout({ datosIniciales, onConfirmar }) {
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    region: "",
    comuna: "",
    calle: "",
    departamento: "",
    indicaciones: "",
    tarjeta: "",
    ...datosIniciales,
  });
  const [errores, setErrores] = useState({});

  function cambiarCampo(nombre, valor) {
    if (nombre === "region") {
      setDatos({ ...datos, region: valor, comuna: "" });
    } else {
      setDatos({ ...datos, [nombre]: valor });
    }
  }

  function enviar(e) {
    e.preventDefault();
    const nuevosErrores = validarCheckout(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) {
      onConfirmar(datos);
    }
  }

  return (
    <form onSubmit={enviar} noValidate>
      <h2 className="h5 mb-3">Datos del cliente</h2>
      <div className="row">
        <div className="col-12 col-md-6">
          <Campo etiqueta="Nombre" nombre="nombre" valor={datos.nombre} onChange={cambiarCampo} error={errores.nombre} />
        </div>
        <div className="col-12 col-md-6">
          <Campo etiqueta="Apellidos" nombre="apellidos" valor={datos.apellidos} onChange={cambiarCampo} error={errores.apellidos} />
        </div>
      </div>
      <Campo etiqueta="Correo" nombre="correo" tipo="email" valor={datos.correo} onChange={cambiarCampo} error={errores.correo} />
      <h2 className="h5 mb-3 mt-4">Dirección para la boleta</h2>
      <SelectorRegionComuna
        region={datos.region}
        comuna={datos.comuna}
        errorRegion={errores.region}
        errorComuna={errores.comuna}
        onChange={cambiarCampo}
      />
      <div className="row">
        <div className="col-12 col-md-8">
          <Campo etiqueta="Calle y número" nombre="calle" valor={datos.calle} onChange={cambiarCampo} error={errores.calle} />
        </div>
        <div className="col-12 col-md-4">
          <Campo etiqueta="Departamento (opcional)" nombre="departamento" valor={datos.departamento} onChange={cambiarCampo} />
        </div>
      </div>
      <Campo etiqueta="Comentario para el barbero (opcional)" nombre="indicaciones" valor={datos.indicaciones} onChange={cambiarCampo} />
      <h2 className="h5 mb-3 mt-4">Pago</h2>
      <Campo
        etiqueta="Número de tarjeta"
        nombre="tarjeta"
        valor={datos.tarjeta}
        onChange={cambiarCampo}
        error={errores.tarjeta}
        placeholder="1234 5678 9012 3456"
      />
      <p className="small text-body-secondary">Para probar un pago rechazado usa la tarjeta 4000 0000 0000 0002</p>
      <Boton etiqueta="Pagar ahora" tipo="submit" />
    </form>
  );
}
