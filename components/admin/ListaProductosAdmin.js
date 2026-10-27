"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerProductos, eliminarProducto, contiene } from "@/data/productos";
import { obtenerSesion } from "@/data/sesion";
import { formatearPrecio } from "@/lib/validaciones";
import { quitarServicioDelCarrito } from "@/data/carrito";

export default function ListaProductosAdmin() {
  const [sesion, setSesion] = useState(null);
  const [productos, setProductos] = useState([]);
  const [texto, setTexto] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      setSesion(await obtenerSesion());
      setProductos(await obtenerProductos());
    }
    cargarDatos();
  }, []);

  async function eliminar(producto) {
    if (!window.confirm("¿Seguro que quieres eliminar " + producto.nombre + "?")) {
      return;
    }
    await eliminarProducto(producto.id);
    await quitarServicioDelCarrito(producto.id);
    setProductos(await obtenerProductos());
    setMensaje("Servicio eliminado: " + producto.nombre + ".");
  }

  if (sesion === null) {
    return <p>Cargando…</p>;
  }

  const esVendedor = sesion.tipo === "Vendedor";

  const buscado = texto.trim().toLowerCase();
  let filas = [];
  productos.forEach((producto) => {
    if (!contiene(producto.nombre, buscado) && !contiene(producto.codigo, buscado)) {
      return;
    }
    filas.push(
      <tr key={producto.id}>
        <td>{producto.codigo}</td>
        <td>{producto.nombre}</td>
        <td>{producto.categoria}</td>
        <td>{formatearPrecio(producto.precio)}</td>
        <td>{producto.precioOferta !== null ? formatearPrecio(producto.precioOferta) : "-"}</td>
        <td>{producto.duracion} min</td>
        <td className={producto.stock <= producto.stockCritico ? "text-danger fw-bold" : ""}>{producto.stock}</td>
        <td className="text-nowrap">
          <Link href={"/admin/productos/" + producto.id} className="btn btn-sm btn-outline-dark me-1">
            Ver
          </Link>
          {!esVendedor && (
            <>
              <Link href={"/admin/productos/" + producto.id + "/editar"} className="btn btn-sm btn-outline-primary me-1">
                Editar
              </Link>
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminar(producto)}>
                Eliminar
              </button>
            </>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h1 className="h3 mb-0">Servicios</h1>
        {!esVendedor && (
          <Link href="/admin/productos/nuevo" className="btn btn-primary">
            Agregar servicio
          </Link>
        )}
      </div>
      <p>
        <Link href="/admin/productos/criticos" className="me-3">
          Cupos críticos
        </Link>
        <Link href="/admin/productos/reportes">Reporte de servicios</Link>
      </p>
      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}

      <div className="col-md-5 px-0 mb-3">
        <label htmlFor="buscador" className="form-label">
          Buscar por nombre o código
        </label>
        <input id="buscador" className="form-control" value={texto} onChange={(e) => setTexto(e.target.value)} />
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Oferta</th>
              <th>Duración</th>
              <th>Cupos</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filas}
          </tbody>
        </table>
      </div>
      {filas.length === 0 && <p>No se encontraron resultados.</p>}
    </div>
  );
}
