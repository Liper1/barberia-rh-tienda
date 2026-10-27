"use client";
import { useEffect, useState } from "react";
import { obtenerUsuarioPorId, actualizarUsuario } from "@/data/usuarios";
import { obtenerSesion, actualizarSesionDeUsuario } from "@/data/sesion";
import FormularioUsuario from "./FormularioUsuario";

export default function PerfilAdmin() {
  const [sesion, setSesion] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      const sesionLeida = await obtenerSesion();
      setSesion(sesionLeida);
      if (sesionLeida !== null) {
        setUsuario(await obtenerUsuarioPorId(sesionLeida.id));
      }
    }
    cargarDatos();
  }, []);

  if (sesion === null || usuario === null) {
    return <p>Cargando…</p>;
  }

  async function guardar(datos) {
    const actualizado = await actualizarUsuario(usuario.id, datos);
    if (actualizado !== null) {
      await actualizarSesionDeUsuario(actualizado);
    }
    setUsuario(await obtenerUsuarioPorId(usuario.id));
    setMensaje("Tus datos se guardaron correctamente.");
  }

  return (
    <div>
      <h1 className="h3 mb-3">Mi perfil</h1>
      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}
      <FormularioUsuario usuarioInicial={usuario} onGuardar={guardar} permitirCambiarTipo={false} />
    </div>
  );
}
