"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerUsuarioPorId } from "@/data/usuarios";
import { InsigniaTipo } from "./Insignias";

export default function DetalleUsuario({ id }) {
  const [usuario, setUsuario] = useState(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setUsuario(await obtenerUsuarioPorId(id));
      setCargado(true);
    }
    cargarDatos();
  }, [id]);

  if (!cargado) {
    return <p>Cargando…</p>;
  }
  if (usuario === null) {
    return (
      <div>
        <h1 className="h3">Usuario no encontrado</h1>
        <Link href="/admin/usuarios">Volver a usuarios</Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="h3 mb-3">
        {usuario.nombre} {usuario.apellidos}
      </h1>
      <dl className="row">
        <dt className="col-sm-3">RUN</dt>
        <dd className="col-sm-9">{usuario.run}</dd>
        <dt className="col-sm-3">Correo</dt>
        <dd className="col-sm-9">{usuario.correo}</dd>
        <dt className="col-sm-3">Tipo</dt>
        <dd className="col-sm-9">
          <InsigniaTipo tipo={usuario.tipo} />
        </dd>
        <dt className="col-sm-3">Fecha de nacimiento</dt>
        <dd className="col-sm-9">{usuario.fechaNacimiento}</dd>
        <dt className="col-sm-3">Región</dt>
        <dd className="col-sm-9">{usuario.region}</dd>
        <dt className="col-sm-3">Comuna</dt>
        <dd className="col-sm-9">{usuario.comuna}</dd>
        <dt className="col-sm-3">Dirección</dt>
        <dd className="col-sm-9">{usuario.direccion}</dd>
      </dl>
      <Link href={"/admin/usuarios/" + usuario.id + "/editar"} className="btn btn-primary me-2">
        Editar
      </Link>
      <Link href={"/admin/usuarios/" + usuario.id + "/historial"} className="btn btn-outline-dark me-2">
        Historial de compras
      </Link>
      <Link href="/admin/usuarios" className="btn btn-outline-dark">
        Volver
      </Link>
    </div>
  );
}
