"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerCategorias, obtenerCategoriaPorId } from "@/data/categorias";
import { obtenerProductosPorCategoria } from "@/data/productos";
import { agregarAlCarrito } from "@/data/carrito";
import ListaProductos from "./ListaProductos";

export default function DetalleCategoria({ id }) {
  const [categoria, setCategoria] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      const encontrada = await obtenerCategoriaPorId(id);
      setCategoria(encontrada);
      setCategorias(await obtenerCategorias());
      if (encontrada !== null) {
        setProductos(await obtenerProductosPorCategoria(encontrada.nombre));
      }
      setCargado(true);
    }
    cargarDatos();
  }, [id]);

  if (!cargado) {
    return <p>Cargando...</p>;
  }

  if (categoria === null) {
    return (
      <div>
        <h1>Categoría no encontrada</h1>
        <Link href="/categorias">Ver todas las categorías</Link>
      </div>
    );
  }

  const botones = [];
  categorias.forEach((otra) => {
    botones.push(
      <Link
        key={otra.id}
        href={"/categorias/" + otra.id}
        className={"btn btn-sm " + (otra.id === categoria.id ? "btn-primary" : "btn-outline-primary")}
      >
        {otra.nombre}
      </Link>
    );
  });

  return (
    <>
      <h1>{categoria.nombre}</h1>
      <p className="lead">{categoria.descripcion}</p>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {botones}
      </div>
      <ListaProductos productos={productos} onAgregar={agregarAlCarrito} />
    </>
  );
}
