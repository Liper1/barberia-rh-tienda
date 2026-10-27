"use client";
import Link from "next/link";
import { obtenerUsuarioPorCorreo, obtenerUsuarioPorRun, crearUsuario } from "@/data/usuarios";
import { limpiarRun } from "@/lib/validaciones";
import { iniciarSesion } from "@/data/sesion";
import FormularioRegistro from "@/components/tienda/FormularioRegistro";

export default function Registro() {
  async function registrar(datos) {
    if ((await obtenerUsuarioPorCorreo(datos.correo)) !== null) {
      return "Ya existe una cuenta con ese correo.";
    }
    const run = limpiarRun(datos.run);
    if ((await obtenerUsuarioPorRun(run)) !== null) {
      return "Ya existe una cuenta con ese RUN.";
    }

    const creado = await crearUsuario({
      run: run,
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      correo: datos.correo,
      clave: datos.clave,
      fechaNacimiento: datos.fechaNacimiento,
      region: datos.region,
      comuna: datos.comuna,
      direccion: datos.direccion,
      tipo: "Cliente",
    });
    if (creado === null) {
      return "No se pudo crear la cuenta. Intenta de nuevo.";
    }
    await iniciarSesion(datos.correo, datos.clave);
    window.location.href = "/";
    return "";
  }

  return (
    <div className="container py-5">
      <div className="col-12 col-lg-7 mx-auto">
        <h1 className="mb-4">Crear cuenta</h1>
        <FormularioRegistro onRegistrar={registrar} />
        <p className="mt-3">
          ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}
