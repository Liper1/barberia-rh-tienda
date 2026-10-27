"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerOrdenes } from "@/data/ordenes";
import { obtenerProductos } from "@/data/productos";
import { obtenerUsuarios } from "@/data/usuarios";
import { obtenerSesion } from "@/data/sesion";
import { ordenesVendidas, totalVendido } from "@/lib/reportes";
import { formatearPrecio } from "@/lib/validaciones";

const ACCESOS = [
  { texto: "Órdenes", ruta: "/admin/ordenes", descripcion: "Revisa las compras y cambia su estado.", soloAdmin: false },
  { texto: "Servicios", ruta: "/admin/productos", descripcion: "Precios, duración y cupos de cada servicio.", soloAdmin: false },
  { texto: "Categorías", ruta: "/admin/categorias", descripcion: "Ordena los servicios por categoría.", soloAdmin: true },
  { texto: "Usuarios", ruta: "/admin/usuarios", descripcion: "Administra clientes, vendedores y administradores.", soloAdmin: true },
  { texto: "Reportes", ruta: "/admin/reportes", descripcion: "Mira las ventas y los servicios más vendidos.", soloAdmin: true },
  { texto: "Perfil", ruta: "/admin/perfil", descripcion: "Edita tus datos personales.", soloAdmin: false },
];

export default function Dashboard() {
  const [sesion, setSesion] = useState(null);
  const [resumen, setResumen] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      const ordenes = await obtenerOrdenes();
      const productos = await obtenerProductos();
      const usuarios = await obtenerUsuarios();
      let unidades = 0;
      productos.forEach((producto) => {
        unidades = unidades + producto.stock;
      });
      let clientes = 0;
      usuarios.forEach((usuario) => {
        if (usuario.tipo === "Cliente") {
          clientes = clientes + 1;
        }
      });
      setSesion(await obtenerSesion());
      setResumen({
        compras: ordenesVendidas(ordenes).length,
        monto: totalVendido(ordenes),
        productos: productos.length,
        unidades: unidades,
        usuarios: usuarios.length,
        clientes: clientes,
      });
    }
    cargarDatos();
  }, []);

  if (resumen === null || sesion === null) {
    return <p>Cargando…</p>;
  }

  let accesos = [];
  ACCESOS.forEach((acceso) => {
    if (sesion.tipo === "Vendedor" && acceso.soloAdmin) {
      return;
    }
    accesos.push(
      <div className="col-md-6 col-xl-4" key={acceso.ruta}>
        <Link href={acceso.ruta} className="d-block bg-white shadow-sm p-3 text-decoration-none text-dark h-100">
          <strong>{acceso.texto}</strong>
          <br />
          <span className="text-muted">{acceso.descripcion}</span>
        </Link>
      </div>
    );
  });

  return (
    <div>
      <h1 className="h3 mb-4">Dashboard</h1>
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="resumen-panel bg-white shadow-sm p-3 h-100">
            <h2 className="h5">Compras</h2>
            <p className="display-6 mb-0">{resumen.compras}</p>
            <p className="text-muted mb-0">órdenes pagadas o atendidas por {formatearPrecio(resumen.monto)}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="resumen-panel bg-white shadow-sm p-3 h-100">
            <h2 className="h5">Servicios</h2>
            <p className="display-6 mb-0">{resumen.productos}</p>
            <p className="text-muted mb-0">{resumen.unidades} cupos disponibles esta semana</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="resumen-panel bg-white shadow-sm p-3 h-100">
            <h2 className="h5">Usuarios</h2>
            <p className="display-6 mb-0">{resumen.usuarios}</p>
            <p className="text-muted mb-0">{resumen.clientes} son clientes</p>
          </div>
        </div>
      </div>
      <h2 className="h5 mb-3">Accesos</h2>
      <div className="row g-3">{accesos}</div>
    </div>
  );
}
