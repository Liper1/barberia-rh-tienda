"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerProductosCriticos } from "@/data/productos";

export default function ProductosCriticos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      setProductos(await obtenerProductosCriticos());
    }
    cargarDatos();
  }, []);

  let filas = [];
  productos.forEach((producto) => {
    filas.push(
      <tr key={producto.id}>
        <td>{producto.codigo}</td>
        <td>{producto.nombre}</td>
        <td>{producto.categoria}</td>
        <td className="text-danger fw-bold">{producto.stock}</td>
        <td>{producto.stockCritico}</td>
        <td>{producto.stockCritico - producto.stock + 1} cupos como mínimo</td>
      </tr>
    );
  });

  return (
    <div>
      <h1 className="h3 mb-3">Cupos críticos</h1>
      <p>Servicios con cupos iguales o menores a su cupo crítico.</p>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cupos</th>
              <th>Crítico</th>
              <th>Falta reponer</th>
            </tr>
          </thead>
          <tbody>
            {filas}
          </tbody>
        </table>
      </div>
      {productos.length === 0 && <p>No hay servicios con cupos críticos.</p>}
      <Link href="/admin/productos" className="btn btn-outline-dark">
        Volver a servicios
      </Link>
    </div>
  );
}
