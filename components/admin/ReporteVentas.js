"use client";
import { useEffect, useState } from "react";
import { obtenerOrdenes } from "@/data/ordenes";
import { totalVendido, contarPorEstado, productosMasVendidos, ventasPorRegion, porcentaje } from "@/lib/reportes";
import { formatearPrecio } from "@/lib/validaciones";

export default function ReporteVentas() {
  const [reporte, setReporte] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      const ordenes = await obtenerOrdenes();
      setReporte({
        total: totalVendido(ordenes),
        estados: contarPorEstado(ordenes),
        masVendidos: productosMasVendidos(ordenes, 5),
        regiones: ventasPorRegion(ordenes),
      });
    }
    cargarDatos();
  }, []);

  if (reporte === null) {
    return <p>Cargando…</p>;
  }

  const maxUnidades = reporte.masVendidos.length > 0 ? reporte.masVendidos[0].unidades : 0;

  let barras = [];
  reporte.masVendidos.forEach((producto) => {
    barras.push(
      <div className="row align-items-center mb-2" key={producto.id}>
        <div className="col-12 col-md-4">{producto.nombre}</div>
        <div className="col-9 col-md-6">
          <div className="barra-grafico" style={{ width: porcentaje(producto.unidades, maxUnidades) + "%" }}></div>
        </div>
        <div className="col-3 col-md-2 small">{producto.unidades} un.</div>
      </div>
    );
  });
  let filasRegiones = [];
  reporte.regiones.forEach((region) => {
    filasRegiones.push(
      <tr key={region.region}>
        <td>{region.region}</td>
        <td>{region.ordenes}</td>
        <td>{formatearPrecio(region.total)}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1 className="h3 mb-4">Reporte de ventas</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="resumen-panel bg-white shadow-sm p-3 h-100">
            <h2 className="h5">Total vendido</h2>
            <p className="display-6 mb-0">{formatearPrecio(reporte.total)}</p>
            <p className="text-muted mb-0">órdenes pagadas y atendidas</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="resumen-panel bg-white shadow-sm p-3 h-100">
            <h2 className="h5">Órdenes por estado</h2>
            <p className="mb-0">Pagadas: {reporte.estados.Pagada}</p>
            <p className="mb-0">Atendidas: {reporte.estados.Atendida}</p>
            <p className="mb-0">Rechazadas: {reporte.estados.Rechazada}</p>
          </div>
        </div>
      </div>
      <h2 className="h5">Servicios más vendidos</h2>
      {reporte.masVendidos.length === 0 && <p>Todavía no hay ventas.</p>}
      {barras}

      <h2 className="h5 mt-4">Ventas por región</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Región</th>
              <th>Órdenes</th>
              <th>Total vendido</th>
            </tr>
          </thead>
          <tbody>
            {filasRegiones}
          </tbody>
        </table>
      </div>
    </div>
  );
}
