"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerUsuarioPorId, actualizarUsuario } from "@/data/usuarios";
import { actualizarSesionDeUsuario } from "@/data/sesion";
import FormularioUsuario from "./FormularioUsuario";

export default function EditarUsuario({ id }) {
  const [usuario, setUsuario] = useState(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setUsuario(await obtenerUsuarioPorId(id));
      setCargado(true);
    }
    cargarDatos();
  }, [id]);

  if (!cargado) {
    return <p>Cargando…</p>;
  }
  if (usuario === null) {
    return (
      <div>
        <h1 className="h3">Usuario no encontrado</h1>
        <Link href="/admin/usuarios">Volver a usuarios</Link>
      </div>
    );
  }

  async function guardar(datos) {
    const actualizado = await actualizarUsuario(usuario.id, datos);
    if (actualizado !== null) {
      await actualizarSesionDeUsuario(actualizado);
    }
    window.location.href = "/admin/usuarios?aviso=usuario-editado";
  }

  return (
    <div>
      <h1 className="h3 mb-3">Editar usuario</h1>
      <FormularioUsuario usuarioInicial={usuario} onGuardar={guardar} permitirCambiarTipo={true} />
    </div>
  );
}
