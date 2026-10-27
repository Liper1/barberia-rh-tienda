"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerProductoPorId } from "@/data/productos";
import { obtenerSesion } from "@/data/sesion";
import { formatearPrecio } from "@/lib/validaciones";

export default function DetalleProductoAdmin({ id }) {
  const [sesion, setSesion] = useState(null);
  const [producto, setProducto] = useState(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setSesion(await obtenerSesion());
      setProducto(await obtenerProductoPorId(id));
      setCargado(true);
    }
    cargarDatos();
  }, [id]);

  if (!cargado || sesion === null) {
    return <p>Cargando…</p>;
  }
  if (producto === null) {
    return (
      <div>
        <h1 className="h3">Servicio no encontrado</h1>
        <Link href="/admin/productos">Volver a servicios</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h3 mb-3">{producto.nombre}</h1>
      <div className="row">
        <div className="col-md-4 mb-3">
          <img src={producto.imagen} alt={producto.nombre} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <dl className="row">
            <dt className="col-sm-4">Código</dt>
            <dd className="col-sm-8">{producto.codigo}</dd>
            <dt className="col-sm-4">Duración</dt>
            <dd className="col-sm-8">{producto.duracion} minutos</dd>
            <dt className="col-sm-4">Categoría</dt>
            <dd className="col-sm-8">{producto.categoria}</dd>
            <dt className="col-sm-4">Descripción</dt>
            <dd className="col-sm-8">{producto.descripcion || "-"}</dd>
            <dt className="col-sm-4">Precio</dt>
            <dd className="col-sm-8">{formatearPrecio(producto.precio)}</dd>
            <dt className="col-sm-4">Precio de oferta</dt>
            <dd className="col-sm-8">{producto.precioOferta !== null ? formatearPrecio(producto.precioOferta) : "-"}</dd>
            <dt className="col-sm-4">Cupos de la semana</dt>
            <dd className={"col-sm-8" + (producto.stock <= producto.stockCritico ? " text-danger fw-bold" : "")}>
              {producto.stock}
            </dd>
            <dt className="col-sm-4">Cupo crítico</dt>
            <dd className="col-sm-8">{producto.stockCritico}</dd>
          </dl>
          {sesion.tipo !== "Vendedor" && (
            <Link href={"/admin/productos/" + producto.id + "/editar"} className="btn btn-primary me-2">
              Editar
            </Link>
          )}
          <Link href="/admin/productos" className="btn btn-outline-dark">
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
