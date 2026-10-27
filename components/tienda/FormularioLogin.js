"use client";
import { useState } from "react";
import { validarCorreo } from "@/lib/validaciones";
import Campo from "./Campo";
import Boton from "./Boton";
import MensajeError from "./MensajeError";

export default function FormularioLogin({ onEntrar }) {
  const [datos, setDatos] = useState({ correo: "", clave: "" });
  const [error, setError] = useState("");

  function cambiarCampo(nombre, valor) {
    setDatos({ ...datos, [nombre]: valor });
  }

  async function enviar(e) {
    e.preventDefault();
    if (!validarCorreo(datos.correo)) {
      setError("Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).");
      return;
    }
    if (datos.clave === "") {
      setError("Ingresa tu contraseña.");
      return;
    }
    const correcto = await onEntrar(datos.correo, datos.clave);
    if (!correcto) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    setError("");
  }

  return (
    <form onSubmit={enviar} noValidate>
      <MensajeError mensaje={error} />
      <Campo etiqueta="Correo" nombre="correo" tipo="email" valor={datos.correo} onChange={cambiarCampo} />
      <Campo etiqueta="Contraseña" nombre="clave" tipo="password" valor={datos.clave} onChange={cambiarCampo} />
      <Boton etiqueta="Iniciar sesión" tipo="submit" />
    </form>
  );
}
