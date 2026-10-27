"use client";
import { crearUsuario } from "@/data/usuarios";
import FormularioUsuario from "./FormularioUsuario";

export default function NuevoUsuario() {
  async function guardar(datos) {
    await crearUsuario(datos);
    window.location.href = "/admin/usuarios?aviso=usuario-creado";
  }

  return (
    <div>
      <h1 className="h3 mb-3">Nuevo usuario</h1>
      <FormularioUsuario usuarioInicial={null} onGuardar={guardar} permitirCambiarTipo={true} />
    </div>
  );
}
