"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerOrdenPorId, actualizarOrden } from "@/data/ordenes";
import { formatearPrecio } from "@/lib/validaciones";
import { InsigniaEstado } from "./Insignias";

export default function BoletaOrden({ id }) {
  const [orden, setOrden] = useState(null);
  const [cargado, setCargado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      setOrden(await obtenerOrdenPorId(id));
      setCargado(true);
    }
    cargarDatos();
  }, [id]);

  if (!cargado) {
    return <p>Cargando…</p>;
  }

  if (orden === null) {
    return (
      <div>
        <h1 className="h3">Orden no encontrada</h1>
        <Link href="/admin/ordenes">Volver a órdenes</Link>
      </div>
    );
  }

  async function cambiarEstado(e) {
    await actualizarOrden(orden.id, { estado: e.target.value });
    const actualizada = await obtenerOrdenPorId(orden.id);
    setOrden(actualizada);
    setMensaje("Estado actualizado a " + actualizada.estado + ".");
  }

  const cliente = orden.cliente;

  let filas = [];
  orden.items.forEach((item) => {
    filas.push(
      <tr key={item.productoId}>
        <td>{item.nombre}</td>
        <td>{formatearPrecio(item.precio)}</td>
        <td>{item.cantidad}</td>
        <td className="text-end">{formatearPrecio(item.precio * item.cantidad)}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1 className="h3 mb-1">Orden de compra #{orden.numero}</h1>
      <p className="text-muted">Fecha: {orden.fecha}</p>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <h2 className="h5">Datos del cliente</h2>
          <p className="mb-0">
            {cliente.nombre} {cliente.apellidos}
          </p>
          <p className="mb-0">{cliente.correo}</p>
        </div>
        <div className="col-md-6">
          <h2 className="h5">Dirección</h2>
          <p className="mb-0">
            {cliente.calle}
            {cliente.departamento ? ", " + cliente.departamento : ""}
          </p>
          <p className="mb-0">
            {cliente.comuna}, {cliente.region}
          </p>
          {cliente.indicaciones && <p className="mb-0">Comentario: {cliente.indicaciones}</p>}
        </div>
      </div>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {filas}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} className="text-end">
                Total
              </th>
              <th className="text-end">{formatearPrecio(orden.total)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
      <p>
        Estado actual: <InsigniaEstado estado={orden.estado} />
      </p>
      <div className="d-print-none">
        {mensaje && (
          <div className="alert alert-success" role="alert">
            {mensaje}
          </div>
        )}
        <div className="col-md-4 px-0 mb-3">
          <label htmlFor="estado" className="form-label">
            Cambiar estado
          </label>
          <select id="estado" className="form-select" value={orden.estado} onChange={cambiarEstado}>
            <option value="Pagada">Pagada</option>
            <option value="Atendida">Atendida</option>
            <option value="Rechazada">Rechazada</option>
          </select>
        </div>
        <button type="button" className="btn btn-dark me-2" onClick={() => window.print()}>
          Imprimir
        </button>
        <Link href="/admin/ordenes" className="btn btn-outline-dark">
          Volver
        </Link>
      </div>
    </div>
  );
}
