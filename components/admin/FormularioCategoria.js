"use client";
import { useState } from "react";
import Link from "next/link";
import Campo from "@/components/tienda/Campo";
import Boton from "@/components/tienda/Boton";
import { IMAGENES } from "./imagenes";

export default function FormularioCategoria({ categoriaInicial, onGuardar }) {
  const [datos, setDatos] = useState({
    nombre: categoriaInicial ? categoriaInicial.nombre : "",
    descripcion: categoriaInicial ? categoriaInicial.descripcion : "",
    imagen: categoriaInicial ? categoriaInicial.imagen : IMAGENES[0].ruta,
  });
  const [errores, setErrores] = useState({});

  function cambiar(nombre, valor) {
    setDatos({ ...datos, [nombre]: valor });
  }

  let opcionesImagen = [];
  IMAGENES.forEach((imagen) => {
    opcionesImagen.push(
      <option key={imagen.ruta} value={imagen.ruta}>
        {imagen.nombre}
      </option>
    );
  });

  function guardar(e) {
    e.preventDefault();
    const nuevosErrores = {};
    if (datos.nombre.trim() === "") {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }
    onGuardar({ nombre: datos.nombre.trim(), descripcion: datos.descripcion.trim(), imagen: datos.imagen });
  }

  return (
    <form onSubmit={guardar} noValidate>
      <Campo etiqueta="Nombre" nombre="nombre" valor={datos.nombre} onChange={cambiar} error={errores.nombre} />
      <Campo etiqueta="Descripción" nombre="descripcion" valor={datos.descripcion} onChange={cambiar} error={errores.descripcion} />
      <div className="mb-3">
        <label htmlFor="imagen" className="form-label">
          Imagen
        </label>
        <select id="imagen" className="form-select" value={datos.imagen} onChange={(e) => cambiar("imagen", e.target.value)}>
          {opcionesImagen}
        </select>
      </div>
      <Boton etiqueta="Guardar" tipo="submit" />{" "}
      <Link href="/admin/categorias" className="btn btn-outline-dark">
        Cancelar
      </Link>
    </form>
  );
}
