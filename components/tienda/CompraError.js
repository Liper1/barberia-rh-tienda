"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerOrdenPorId } from "@/data/ordenes";
import DatosOrden from "./DatosOrden";

export default function CompraError({ id }) {
  const [orden, setOrden] = useState(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setOrden(await obtenerOrdenPorId(id));
      setCargado(true);
    }
    cargarDatos();
  }, [id]);

  if (!cargado) {
    return <p>Cargando...</p>;
  }

  if (orden === null || orden.estado !== "Rechazada") {
    return (
      <div>
        <h1>Orden no encontrada</h1>
        <Link href="/productos">Ir a servicios</Link>
      </div>
    );
  }

  return (
    <>
      <div className="alert alert-danger" role="alert">
        <h1 className="h4">No se pudo realizar el pago. Nro #{orden.numero}</h1>
        <p className="mb-0">{orden.motivo}</p>
      </div>
      <DatosOrden orden={orden} />
      <Link href="/checkout" className="btn btn-primary">Volver a realizar el pago</Link>
    </>
  );
}
