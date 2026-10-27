"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerCategoriaPorId, actualizarCategoria } from "@/data/categorias";
import { obtenerProductosPorCategoria, actualizarProducto } from "@/data/productos";
import FormularioCategoria from "./FormularioCategoria";

export default function EditarCategoria({ id }) {
  const [categoria, setCategoria] = useState(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setCategoria(await obtenerCategoriaPorId(id));
      setCargado(true);
    }
    cargarDatos();
  }, [id]);

  if (!cargado) {
    return <p>Cargando…</p>;
  }
  if (categoria === null) {
    return (
      <div>
        <h1 className="h3">Categoría no encontrada</h1>
        <Link href="/admin/categorias">Volver a categorías</Link>
      </div>
    );
  }

  async function guardar(datos) {
    if (datos.nombre !== categoria.nombre) {
      const productos = await obtenerProductosPorCategoria(categoria.nombre);
      for (let i = 0; i < productos.length; i++) {
        await actualizarProducto(productos[i].id, { categoria: datos.nombre });
      }
    }
    await actualizarCategoria(categoria.id, datos);
    window.location.href = "/admin/categorias?aviso=categoria-editada";
  }

  return (
    <div>
      <h1 className="h3 mb-3">Editar categoría</h1>
      <FormularioCategoria categoriaInicial={categoria} onGuardar={guardar} />
    </div>
  );
}
