"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerProductos } from "@/data/productos";
import { obtenerCategorias } from "@/data/categorias";
import { resumenPorCategoria, porcentaje } from "@/lib/reportes";
import { formatearPrecio } from "@/lib/validaciones";

export default function ReporteProductos() {
  const [filas, setFilas] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      const productos = await obtenerProductos();
      const categorias = await obtenerCategorias();
      setFilas(resumenPorCategoria(productos, categorias));
    }
    cargarDatos();
  }, []);

  let maximo = 0;
  filas.forEach((fila) => {
    if (fila.valor > maximo) {
      maximo = fila.valor;
    }
  });

  let filasTabla = [];
  let barras = [];
  filas.forEach((fila) => {
    filasTabla.push(
      <tr key={fila.categoria}>
        <td>{fila.categoria}</td>
        <td>{fila.cantidad}</td>
        <td>{fila.unidades}</td>
        <td>{formatearPrecio(fila.valor)}</td>
      </tr>
    );
    barras.push(
      <div className="row align-items-center mb-2" key={fila.categoria}>
        <div className="col-4 col-md-2">{fila.categoria}</div>
        <div className="col-5 col-md-7">
          <div className="barra-grafico" style={{ width: porcentaje(fila.valor, maximo) + "%" }}></div>
        </div>
        <div className="col-3 col-md-3 small">{formatearPrecio(fila.valor)}</div>
      </div>
    );
  });

  return (
    <div>
      <h1 className="h3 mb-3">Reporte de servicios</h1>
      <div className="table-responsive mb-4">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Servicios</th>
              <th>Cupos de la semana</th>
              <th>Ingreso posible (precio × cupos)</th>
            </tr>
          </thead>
          <tbody>
            {filasTabla}
          </tbody>
        </table>
      </div>
      <h2 className="h5">Ingreso posible por categoría</h2>
      {barras}

      <Link href="/admin/productos" className="btn btn-outline-dark mt-3">
        Volver a servicios
      </Link>
    </div>
  );
}
