"use client";
import { useState } from "react";
import Link from "next/link";
import { cerrarSesion } from "@/data/sesion";

const ENLACES = [
  { texto: "Dashboard", ruta: "/admin", soloAdmin: false },
  { texto: "Órdenes", ruta: "/admin/ordenes", soloAdmin: false },
  { texto: "Servicios", ruta: "/admin/productos", soloAdmin: false },
  { texto: "Categorías", ruta: "/admin/categorias", soloAdmin: true },
  { texto: "Usuarios", ruta: "/admin/usuarios", soloAdmin: true },
  { texto: "Reportes", ruta: "/admin/reportes", soloAdmin: true },
  { texto: "Perfil", ruta: "/admin/perfil", soloAdmin: false },
];

export default function MenuLateral({ sesion }) {
  const [abierto, setAbierto] = useState(false);

  const esVendedor = sesion.tipo === "Vendedor";
  let items = [];
  ENLACES.forEach((enlace) => {
    if (esVendedor && enlace.soloAdmin) {
      return;
    }
    items.push(
      <li className="nav-item" key={enlace.ruta}>
        <Link href={enlace.ruta} className="nav-link" onClick={() => setAbierto(false)}>
          {enlace.texto}
        </Link>
      </li>
    );
  });

  async function salir() {
    await cerrarSesion();
    window.location.href = "/login";
  }

  return (
    <nav className="panel-lateral h-100 text-white">
      <div className="sticky-lg-top p-3">
        <div className="d-flex justify-content-between align-items-center mb-lg-3">
          <span className="fs-5 fw-bold">Panel R&amp;H</span>
          <button
            type="button"
            className="btn btn-outline-light btn-sm d-lg-none"
            onClick={() => setAbierto(!abierto)}
          >
            {abierto ? "Cerrar menú" : "Menú"}
          </button>
        </div>
        <div className={abierto ? "mt-3" : "d-none d-lg-block"}>
          <p className="small mb-2">
            {sesion.nombre} ({sesion.tipo})
          </p>
          <ul className="nav nav-pills flex-column gap-1">{items}</ul>
          <hr />
          <Link href="/" className="nav-link text-white px-3">
            Ir a la tienda
          </Link>
          <button type="button" className="btn btn-outline-light btn-sm mt-2 ms-3" onClick={salir}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
