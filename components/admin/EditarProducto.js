"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerProductoPorId, actualizarProducto } from "@/data/productos";
import { obtenerCategorias } from "@/data/categorias";
import { obtenerSesion } from "@/data/sesion";
import FormularioProducto from "./FormularioProducto";
import SinPermiso from "./SinPermiso";

export default function EditarProducto({ id }) {
  const [sesion, setSesion] = useState(null);
  const [producto, setProducto] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setSesion(await obtenerSesion());
      setProducto(await obtenerProductoPorId(id));
      setCategorias(await obtenerCategorias());
      setCargado(true);
    }
    cargarDatos();
  }, [id]);

  if (!cargado || sesion === null) {
    return <p>Cargando…</p>;
  }
  if (sesion.tipo === "Vendedor") {
    return <SinPermiso />;
  }
  if (producto === null) {
    return (
      <div>
        <h1 className="h3">Servicio no encontrado</h1>
        <Link href="/admin/productos">Volver a servicios</Link>
      </div>
    );
  }

  async function guardar(datos) {
    await actualizarProducto(producto.id, datos);
    window.location.href = "/admin/productos?aviso=producto-editado";
  }

  return (
    <div>
      <h1 className="h3 mb-3">Editar</h1>
      <FormularioProducto productoInicial={producto} categorias={categorias} onGuardar={guardar} />
    </div>
  );
}
