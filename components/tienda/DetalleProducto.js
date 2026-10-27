"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerProductoPorId, obtenerProductosPorCategoria } from "@/data/productos";
import { agregarAlCarrito } from "@/data/carrito";
import Precio from "./Precio";
import Boton from "./Boton";
import ListaProductos from "./ListaProductos";

export default function DetalleProducto({ id }) {
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [cargado, setCargado] = useState(false);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      const encontrado = await obtenerProductoPorId(id);
      setProducto(encontrado);
      if (encontrado !== null) {
        const otros = [];
        const mismaCategoria = await obtenerProductosPorCategoria(encontrado.categoria);
        mismaCategoria.forEach((p) => {
          if (p.id !== encontrado.id) {
            otros.push(p);
          }
        });
        setRelacionados(otros);
      }
      setCargado(true);
    }
    cargarDatos();
  }, [id]);

  if (!cargado) {
    return <p>Cargando...</p>;
  }

  if (producto === null) {
    return (
      <div>
        <h1>Servicio no encontrado</h1>
        <Link href="/productos">Volver a servicios</Link>
      </div>
    );
  }

  async function agregar() {
    await agregarAlCarrito(producto);
    setAgregado(true);
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link href="/productos">Servicios</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
        </ol>
      </nav>
      <div className="row g-4 g-lg-5">
        <div className="col-12 col-md-6">
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid w-100" />
        </div>
        <div className="col-12 col-md-6">
          <small className="text-body-secondary">{producto.categoria} · Código {producto.codigo}</small>
          <h1 className="h2 mt-1">{producto.nombre}</h1>
          <Precio producto={producto} />
          <p>{producto.descripcion}</p>
          <p className="small mb-1">Duración: {producto.duracion} minutos</p>
          <p className="small">{producto.stock > 0 ? "Cupos disponibles esta semana: " + producto.stock : "Sin cupos esta semana"}</p>
          <p className="small text-body-secondary">Pagas el servicio en línea y después eliges el día y la hora con tu número de orden.</p>
          <Boton etiqueta="Añadir al carrito" onClick={agregar} deshabilitado={producto.stock <= 0} />
          {agregado && (
            <div className="alert alert-success mt-3 py-2">
              Agregado al carrito. <Link href="/carrito">Ver carrito</Link>
            </div>
          )}
        </div>
      </div>
      {relacionados.length > 0 && (
        <section className="mt-5">
          <h2 className="h4 mb-3">También te puede interesar</h2>
          <ListaProductos productos={relacionados} onAgregar={agregarAlCarrito} />
        </section>
      )}
    </>
  );
}
