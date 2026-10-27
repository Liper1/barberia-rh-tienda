"use client";
import Link from "next/link";
import { iniciarSesion, obtenerSesion, puedeEntrarAlPanel } from "@/data/sesion";
import FormularioLogin from "@/components/tienda/FormularioLogin";

export default function Login() {
  return (
    <div className="container py-5">
      <div className="col-12 col-md-8 col-lg-5 mx-auto">
        <h1 className="mb-4">Iniciar sesión</h1>
        <FormularioLogin
          onEntrar={async (c, k) => {
            const usuario = await iniciarSesion(c, k);
            if (usuario !== null) {
              const sesion = await obtenerSesion();
              window.location.href = puedeEntrarAlPanel(sesion) ? "/admin" : "/";
            }
            return usuario !== null;
          }}
        />
        <p className="mt-3">
          ¿No tienes cuenta? <Link href="/registro">Regístrate</Link>
        </p>
        <div className="alert alert-secondary small mt-4">
          <p className="fw-bold mb-1">Cuentas de prueba</p>
          <p className="mb-0">admin@duoc.cl / admin123</p>
          <p className="mb-0">vendedor@duoc.cl / vende123</p>
          <p className="mb-0">cliente@gmail.com / cliente1</p>
        </div>
      </div>
    </div>
  );
}
