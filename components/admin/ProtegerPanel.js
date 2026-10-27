"use client";
import { useEffect, useState } from "react";
import { obtenerSesion, puedeEntrarAlPanel } from "@/data/sesion";
import MenuLateral from "./MenuLateral";

export default function ProtegerPanel({ children }) {
  const [sesion, setSesion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      const sesionLeida = await obtenerSesion();
      setSesion(sesionLeida);
      setCargando(false);
      if (!puedeEntrarAlPanel(sesionLeida)) {
        window.location.href = "/login";
      }
    }
    cargarDatos();
  }, []);

  if (cargando || !puedeEntrarAlPanel(sesion)) {
    return <p className="p-4">Cargando…</p>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 p-0 d-print-none panel-lateral">
          <MenuLateral sesion={sesion} />
        </div>
        <main className="col-lg-10 p-3 p-lg-4">{children}</main>
      </div>
    </div>
  );
}
