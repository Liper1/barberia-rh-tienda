"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerUsuarios, eliminarUsuario } from "@/data/usuarios";
import { obtenerSesion } from "@/data/sesion";
import { InsigniaTipo } from "./Insignias";

export default function ListaUsuarios() {
  const [sesion, setSesion] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      setSesion(await obtenerSesion());
      setUsuarios(await obtenerUsuarios());
    }
    cargarDatos();
  }, []);

  async function eliminar(usuario) {
    if (!window.confirm("¿Seguro que quieres eliminar a " + usuario.nombre + " " + usuario.apellidos + "?")) {
      return;
    }
    await eliminarUsuario(usuario.id);
    setUsuarios(await obtenerUsuarios());
    setMensaje("Usuario eliminado: " + usuario.nombre + " " + usuario.apellidos + ".");
  }

  if (sesion === null) {
    return <p>Cargando…</p>;
  }

  let filas = [];
  usuarios.forEach((usuario) => {
    if (filtroTipo !== "" && usuario.tipo !== filtroTipo) {
      return;
    }
    filas.push(
      <tr key={usuario.id}>
        <td>{usuario.run}</td>
        <td>
          {usuario.nombre} {usuario.apellidos}
        </td>
        <td>{usuario.correo}</td>
        <td>
          <InsigniaTipo tipo={usuario.tipo} />
        </td>
        <td className="text-nowrap">
          <Link href={"/admin/usuarios/" + usuario.id} className="btn btn-sm btn-outline-dark me-1">
            Ver
          </Link>
          <Link href={"/admin/usuarios/" + usuario.id + "/editar"} className="btn btn-sm btn-outline-primary me-1">
            Editar
          </Link>
          {usuario.id !== sesion.id && (
            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminar(usuario)}>
              Eliminar
            </button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h1 className="h3 mb-0">Usuarios</h1>
        <Link href="/admin/usuarios/nuevo" className="btn btn-primary">
          Nuevo usuario
        </Link>
      </div>
      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}

      <div className="col-md-4 px-0 mb-3">
        <label htmlFor="filtroTipo" className="form-label">
          Filtrar por tipo
        </label>
        <select id="filtroTipo" className="form-select" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
          <option value="">Todos</option>
          <option value="Administrador">Administrador</option>
          <option value="Vendedor">Vendedor</option>
          <option value="Cliente">Cliente</option>
        </select>
      </div>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>RUN</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filas}
          </tbody>
        </table>
      </div>
      {filas.length === 0 && <p>No hay usuarios para mostrar.</p>}
    </div>
  );
}
