"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerOrdenPorId } from "@/data/ordenes";
import DatosOrden from "./DatosOrden";
import Boton from "./Boton";

export default function CompraExitosa({ id }) {
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

  if (orden === null || orden.estado === "Rechazada") {
    return (
      <div>
        <h1>Orden no encontrada</h1>
        <Link href="/productos">Ir a servicios</Link>
      </div>
    );
  }

  return (
    <>
      <div className="alert alert-success" role="alert">
        <h1 className="h4 mb-0">Se ha realizado la compra. Nro #{orden.numero}</h1>
      </div>
      <DatosOrden orden={orden} />
      <div className="d-flex flex-wrap gap-2">
        <Boton etiqueta="Imprimir boleta" variante="outline-primary" onClick={() => window.print()} />
        <Link href="/productos" className="btn btn-primary">Seguir comprando</Link>
      </div>
    </>
  );
}
