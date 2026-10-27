"use client";
import { useState } from "react";
import { validarCorreo } from "@/lib/validaciones";
import Campo from "./Campo";
import Boton from "./Boton";

export default function FormularioContacto() {
  const [datos, setDatos] = useState({ nombre: "", correo: "", comentario: "" });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function cambiarCampo(nombre, valor) {
    setDatos({ ...datos, [nombre]: valor });
  }

  function validar() {
    const nuevos = {};
    if (datos.nombre.trim() === "") {
      nuevos.nombre = "El nombre es obligatorio.";
    } else if (datos.nombre.length > 100) {
      nuevos.nombre = "El nombre puede tener como máximo 100 caracteres.";
    }
    if (!validarCorreo(datos.correo)) {
      nuevos.correo = "Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).";
    }
    if (datos.comentario.trim() === "") {
      nuevos.comentario = "El comentario es obligatorio.";
    } else if (datos.comentario.length > 500) {
      nuevos.comentario = "El comentario puede tener como máximo 500 caracteres.";
    }
    return nuevos;
  }

  function enviar(e) {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      setDatos({ nombre: "", correo: "", comentario: "" });
      setEnviado(true);
    } else {
      setEnviado(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate>
      {enviado && (
        <div className="alert alert-success" role="alert">
          ¡Gracias por escribirnos! Recibimos tu mensaje y te responderemos pronto.
        </div>
      )}
      <Campo etiqueta="Nombre" nombre="nombre" valor={datos.nombre} onChange={cambiarCampo} error={errores.nombre} />
      <Campo etiqueta="Correo" nombre="correo" tipo="email" valor={datos.correo} onChange={cambiarCampo} error={errores.correo} />
      <div className="mb-3">
        <label htmlFor="comentario" className="form-label">Comentario</label>
        <textarea
          id="comentario"
          className={"form-control" + (errores.comentario ? " is-invalid" : "")}
          rows="5"
          value={datos.comentario}
          onChange={(e) => cambiarCampo("comentario", e.target.value)}
        ></textarea>
        {errores.comentario && <div className="invalid-feedback">{errores.comentario}</div>}
        <div className="form-text">{datos.comentario.length} / 500 caracteres</div>
      </div>
      <Boton etiqueta="Enviar mensaje" tipo="submit" />
    </form>
  );
}
