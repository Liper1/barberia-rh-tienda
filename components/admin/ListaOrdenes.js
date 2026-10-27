"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerOrdenes } from "@/data/ordenes";
import { formatearPrecio } from "@/lib/validaciones";
import { InsigniaEstado } from "./Insignias";

export default function ListaOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      setOrdenes(await obtenerOrdenes());
    }
    cargarDatos();
  }, []);

  function contarItems(orden) {
    let cantidad = 0;
    orden.items.forEach((item) => {
      cantidad = cantidad + item.cantidad;
    });
    return cantidad;
  }

  let filas = [];
  ordenes.forEach((orden) => {
    if (filtroEstado !== "" && orden.estado !== filtroEstado) {
      return;
    }
    filas.push(
      <tr key={orden.id}>
        <td>#{orden.numero}</td>
        <td>{orden.fecha}</td>
        <td>
          {orden.cliente.nombre} {orden.cliente.apellidos}
        </td>
        <td>{contarItems(orden)}</td>
        <td>{formatearPrecio(orden.total)}</td>
        <td>
          <InsigniaEstado estado={orden.estado} />
        </td>
        <td>
          <Link href={"/admin/ordenes/" + orden.id} className="btn btn-sm btn-outline-dark">
            Ver
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1 className="h3 mb-3">Órdenes</h1>
      <div className="mb-3 col-md-4 px-0">
        <label htmlFor="filtroEstado" className="form-label">
          Filtrar por estado
        </label>
        <select
          id="filtroEstado"
          className="form-select"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Pagada">Pagada</option>
          <option value="Atendida">Atendida</option>
          <option value="Rechazada">Rechazada</option>
        </select>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Nro</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Items</th>
              <th>Total</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filas}
          </tbody>
        </table>
      </div>
      {filas.length === 0 && <p>No hay órdenes para mostrar.</p>}
    </div>
  );
}
