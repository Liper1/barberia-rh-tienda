"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Campo from "@/components/tienda/Campo";
import Boton from "@/components/tienda/Boton";
import { validarRut, validarCorreo, validarClave, limpiarRun } from "@/lib/validaciones";
import { regiones, comunasDeRegion } from "@/data/regiones";
import { obtenerUsuarios } from "@/data/usuarios";

export default function FormularioUsuario({ usuarioInicial, onGuardar, permitirCambiarTipo }) {
  const [datos, setDatos] = useState({
    run: usuarioInicial ? usuarioInicial.run : "",
    nombre: usuarioInicial ? usuarioInicial.nombre : "",
    apellidos: usuarioInicial ? usuarioInicial.apellidos : "",
    correo: usuarioInicial ? usuarioInicial.correo : "",
    clave: usuarioInicial ? usuarioInicial.clave : "",
    tipo: usuarioInicial ? usuarioInicial.tipo : "Cliente",
    fechaNacimiento: usuarioInicial ? usuarioInicial.fechaNacimiento : "",
    region: usuarioInicial ? usuarioInicial.region : "",
    comuna: usuarioInicial ? usuarioInicial.comuna : "",
    direccion: usuarioInicial ? usuarioInicial.direccion : "",
  });
  const [errores, setErrores] = useState({});
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      setUsuarios(await obtenerUsuarios());
    }
    cargarDatos();
  }, []);

  function cambiar(nombre, valor) {
    if (nombre === "region") {
      setDatos({ ...datos, region: valor, comuna: "" });
    } else {
      setDatos({ ...datos, [nombre]: valor });
    }
  }

  let opcionesRegion = [];
  regiones.forEach((region) => {
    opcionesRegion.push(
      <option key={region.nombre} value={region.nombre}>
        {region.nombre}
      </option>
    );
  });
  let opcionesComuna = [];
  comunasDeRegion(datos.region).forEach((comuna) => {
    opcionesComuna.push(
      <option key={comuna} value={comuna}>
        {comuna}
      </option>
    );
  });

  function validar() {
    const nuevos = {};
    if (!validarRut(datos.run)) nuevos.run = "El RUN no es válido. Escríbelo sin puntos ni guion, por ejemplo 1901102K.";
    if (datos.nombre.trim() === "") nuevos.nombre = "El nombre es obligatorio.";
    if (datos.apellidos.trim() === "") nuevos.apellidos = "Los apellidos son obligatorios.";
    if (!validarCorreo(datos.correo)) {
      nuevos.correo = "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    } else {
      let repetido = false;
      usuarios.forEach((otro) => {
        if (otro.correo.toLowerCase() === datos.correo.trim().toLowerCase() && (!usuarioInicial || otro.id !== usuarioInicial.id)) {
          repetido = true;
        }
      });
      if (repetido) {
        nuevos.correo = "Ya existe un usuario con ese correo.";
      }
    }
    if (!validarClave(datos.clave)) nuevos.clave = "La contraseña debe tener entre 4 y 10 caracteres.";
    if (datos.region === "") nuevos.region = "Selecciona una región.";
    if (datos.comuna === "") nuevos.comuna = "Selecciona una comuna.";
    if (datos.direccion.trim() === "") nuevos.direccion = "La dirección es obligatoria.";
    return nuevos;
  }

  function guardar(e) {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) {
      return;
    }
    onGuardar({
      run: limpiarRun(datos.run),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim().toLowerCase(),
      clave: datos.clave,
      tipo: datos.tipo,
      fechaNacimiento: datos.fechaNacimiento,
      region: datos.region,
      comuna: datos.comuna,
      direccion: datos.direccion.trim(),
    });
  }

  return (
    <form onSubmit={guardar} noValidate>
      <div className="row">
        <div className="col-md-6">
          <Campo etiqueta="RUN" nombre="run" valor={datos.run} onChange={cambiar} error={errores.run} placeholder="1901102K" />
        </div>
        <div className="col-md-6">
          <Campo etiqueta="Correo" nombre="correo" tipo="email" valor={datos.correo} onChange={cambiar} error={errores.correo} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Campo etiqueta="Nombre" nombre="nombre" valor={datos.nombre} onChange={cambiar} error={errores.nombre} />
        </div>
        <div className="col-md-6">
          <Campo etiqueta="Apellidos" nombre="apellidos" valor={datos.apellidos} onChange={cambiar} error={errores.apellidos} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Campo etiqueta="Contraseña" nombre="clave" tipo="password" valor={datos.clave} onChange={cambiar} error={errores.clave} />
        </div>
        <div className="col-md-6">
          <Campo
            etiqueta="Fecha de nacimiento (opcional)"
            nombre="fechaNacimiento"
            tipo="date"
            valor={datos.fechaNacimiento}
            onChange={cambiar}
            error={errores.fechaNacimiento}
          />
        </div>
      </div>
      {permitirCambiarTipo && (
        <div className="mb-3">
          <label htmlFor="tipo" className="form-label">
            Tipo de usuario
          </label>
          <select id="tipo" className="form-select" value={datos.tipo} onChange={(e) => cambiar("tipo", e.target.value)}>
            <option value="Administrador">Administrador</option>
            <option value="Vendedor">Vendedor</option>
            <option value="Cliente">Cliente</option>
          </select>
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="region" className="form-label">
            Región
          </label>
          <select
            id="region"
            className={"form-select" + (errores.region ? " is-invalid" : "")}
            value={datos.region}
            onChange={(e) => cambiar("region", e.target.value)}
          >
            <option value="">Selecciona una región</option>
            {opcionesRegion}
          </select>
          {errores.region && <div className="invalid-feedback">{errores.region}</div>}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="comuna" className="form-label">
            Comuna
          </label>
          <select
            id="comuna"
            className={"form-select" + (errores.comuna ? " is-invalid" : "")}
            value={datos.comuna}
            onChange={(e) => cambiar("comuna", e.target.value)}
          >
            <option value="">Selecciona una comuna</option>
            {opcionesComuna}
          </select>
          {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
        </div>
      </div>
      <Campo etiqueta="Dirección" nombre="direccion" valor={datos.direccion} onChange={cambiar} error={errores.direccion} />
      <Boton etiqueta="Guardar" tipo="submit" />{" "}
      <Link href={permitirCambiarTipo ? "/admin/usuarios" : "/admin"} className="btn btn-outline-dark">
        Cancelar
      </Link>
    </form>
  );
}
