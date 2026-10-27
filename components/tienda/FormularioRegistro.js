"use client";
import { useState } from "react";
import { validarRegistro } from "@/lib/validaciones";
import Campo from "./Campo";
import Boton from "./Boton";
import MensajeError from "./MensajeError";
import SelectorRegionComuna from "./SelectorRegionComuna";

export default function FormularioRegistro({ onRegistrar }) {
  const [datos, setDatos] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    clave: "",
    confirmarClave: "",
    fechaNacimiento: "",
    region: "",
    comuna: "",
    direccion: "",
  });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  function cambiarCampo(nombre, valor) {
    if (nombre === "region") {
      setDatos({ ...datos, region: valor, comuna: "" });
    } else {
      setDatos({ ...datos, [nombre]: valor });
    }
  }

  async function enviar(e) {
    e.preventDefault();
    const nuevosErrores = validarRegistro(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length === 0) {
      setMensaje(await onRegistrar(datos));
    }
  }

  return (
    <form onSubmit={enviar} noValidate>
      <MensajeError mensaje={mensaje} />
      <Campo etiqueta="RUN" nombre="run" valor={datos.run} onChange={cambiarCampo} error={errores.run} placeholder="Sin puntos ni guion" />
      <div className="row">
        <div className="col-12 col-md-6">
          <Campo etiqueta="Nombre" nombre="nombre" valor={datos.nombre} onChange={cambiarCampo} error={errores.nombre} />
        </div>
        <div className="col-12 col-md-6">
          <Campo etiqueta="Apellidos" nombre="apellidos" valor={datos.apellidos} onChange={cambiarCampo} error={errores.apellidos} />
        </div>
      </div>
      <Campo etiqueta="Correo" nombre="correo" tipo="email" valor={datos.correo} onChange={cambiarCampo} error={errores.correo} />
      <div className="row">
        <div className="col-12 col-md-6">
          <Campo etiqueta="Contraseña" nombre="clave" tipo="password" valor={datos.clave} onChange={cambiarCampo} error={errores.clave} />
        </div>
        <div className="col-12 col-md-6">
          <Campo etiqueta="Repetir contraseña" nombre="confirmarClave" tipo="password" valor={datos.confirmarClave} onChange={cambiarCampo} error={errores.confirmarClave} />
        </div>
      </div>
      <Campo etiqueta="Fecha de nacimiento (opcional)" nombre="fechaNacimiento" tipo="date" valor={datos.fechaNacimiento} onChange={cambiarCampo} />
      <SelectorRegionComuna
        region={datos.region}
        comuna={datos.comuna}
        errorRegion={errores.region}
        errorComuna={errores.comuna}
        onChange={cambiarCampo}
      />
      <Campo etiqueta="Dirección" nombre="direccion" valor={datos.direccion} onChange={cambiarCampo} error={errores.direccion} />
      <Boton etiqueta="Crear cuenta" tipo="submit" />
    </form>
  );
}
