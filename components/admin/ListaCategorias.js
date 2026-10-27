"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerCategorias, eliminarCategoria } from "@/data/categorias";
import { obtenerProductos } from "@/data/productos";

export default function ListaCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setCategorias(await obtenerCategorias());
      setProductos(await obtenerProductos());
    }
    cargarDatos();
  }, []);

  function contarProductos(categoria) {
    let cantidad = 0;
    productos.forEach((producto) => {
      if (producto.categoria === categoria.nombre) {
        cantidad = cantidad + 1;
      }
    });
    return cantidad;
  }

  async function eliminar(categoria) {
    if (contarProductos(categoria) > 0) {
      setEsError(true);
      setMensaje("No se puede eliminar " + categoria.nombre + " porque tiene servicios.");
      return;
    }
    if (!window.confirm("¿Seguro que quieres eliminar la categoría " + categoria.nombre + "?")) {
      return;
    }
    await eliminarCategoria(categoria.id);
    setCategorias(await obtenerCategorias());
    setEsError(false);
    setMensaje("Categoría eliminada: " + categoria.nombre + ".");
  }

  let filas = [];
  categorias.forEach((categoria) => {
    filas.push(
      <tr key={categoria.id}>
        <td>{categoria.nombre}</td>
        <td>{categoria.descripcion}</td>
        <td>{contarProductos(categoria)}</td>
        <td className="text-nowrap">
          <Link href={"/admin/categorias/" + categoria.id + "/editar"} className="btn btn-sm btn-outline-primary me-1">
            Editar
          </Link>
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => eliminar(categoria)}>
            Eliminar
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h1 className="h3 mb-0">Categorías</h1>
        <Link href="/admin/categorias/nueva" className="btn btn-primary">
          Nueva categoría
        </Link>
      </div>
      {mensaje && (
        <div className={"alert " + (esError ? "alert-danger" : "alert-success")} role="alert">
          {mensaje}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Servicios</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filas}
          </tbody>
        </table>
      </div>
    </div>
  );
}
