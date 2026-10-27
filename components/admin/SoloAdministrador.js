"use client";
import { useEffect, useState } from "react";
import { obtenerSesion } from "@/data/sesion";
import SinPermiso from "./SinPermiso";

export default function SoloAdministrador({ children }) {
  const [sesion, setSesion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      setSesion(await obtenerSesion());
      setCargando(false);
    }
    cargarDatos();
  }, []);

  if (cargando) {
    return <p>Cargando…</p>;
  }
  if (sesion === null || sesion.tipo !== "Administrador") {
    return <SinPermiso />;
  }
  return <>{children}</>;
}
