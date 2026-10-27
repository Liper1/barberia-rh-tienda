"use client";
import { crearCategoria } from "@/data/categorias";
import FormularioCategoria from "./FormularioCategoria";

export default function NuevaCategoria() {
  async function guardar(datos) {
    await crearCategoria(datos);
    window.location.href = "/admin/categorias?aviso=categoria-creada";
  }

  return (
    <div>
      <h1 className="h3 mb-3">Nueva categoría</h1>
      <FormularioCategoria categoriaInicial={null} onGuardar={guardar} />
    </div>
  );
}
