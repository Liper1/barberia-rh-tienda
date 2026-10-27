"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerUsuarioPorId } from "@/data/usuarios";
import { obtenerOrdenesPorUsuario } from "@/data/ordenes";
import { formatearPrecio } from "@/lib/validaciones";
import { InsigniaEstado } from "./Insignias";

export default function HistorialUsuario({ id }) {
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setUsuario(await obtenerUsuarioPorId(id));
      setOrdenes(await obtenerOrdenesPorUsuario(id));
      setCargado(true);
    }
    cargarDatos();
  }, [id]);

  if (!cargado) {
    return <p>Cargando…</p>;
  }
  if (usuario === null) {
    return (
      <div>
        <h1 className="h3">Usuario no encontrado</h1>
        <Link href="/admin/usuarios">Volver a usuarios</Link>
      </div>
    );
  }

  let filas = [];
  ordenes.forEach((orden) => {
    filas.push(
      <tr key={orden.id}>
        <td>#{orden.numero}</td>
        <td>{orden.fecha}</td>
        <td>{formatearPrecio(orden.total)}</td>
        <td>
          <InsigniaEstado estado={orden.estado} />
        </td>
        <td>
          <Link href={"/admin/ordenes/" + orden.id} className="btn btn-sm btn-outline-dark">
            Ver boleta
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1 className="h3 mb-3">
        Historial de {usuario.nombre} {usuario.apellidos}
      </h1>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Nro</th>
              <th>Fecha</th>
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
      {ordenes.length === 0 && <p>Este usuario todavía no tiene compras.</p>}
      <Link href={"/admin/usuarios/" + usuario.id} className="btn btn-outline-dark">
        Volver al usuario
      </Link>
    </div>
  );
}
