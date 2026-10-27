"use client";
import { useEffect, useState } from "react";
import { crearProducto } from "@/data/productos";
import { obtenerCategorias } from "@/data/categorias";
import { obtenerSesion } from "@/data/sesion";
import FormularioProducto from "./FormularioProducto";
import SinPermiso from "./SinPermiso";

export default function NuevoProducto() {
  const [sesion, setSesion] = useState(null);
  const [categorias, setCategorias] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      setSesion(await obtenerSesion());
      setCategorias(await obtenerCategorias());
    }
    cargarDatos();
  }, []);

  if (sesion === null || categorias === null) {
    return <p>Cargando…</p>;
  }
  if (sesion.tipo === "Vendedor") {
    return <SinPermiso />;
  }
  if (categorias.length === 0) {
    return <p>Primero debes crear una categoría.</p>;
  }

  async function guardar(datos) {
    await crearProducto(datos);
    window.location.href = "/admin/productos?aviso=producto-creado";
  }

  return (
    <div>
      <h1 className="h3 mb-3">Agregar servicio</h1>
      <FormularioProducto productoInicial={null} categorias={categorias} onGuardar={guardar} />
    </div>
  );
}
