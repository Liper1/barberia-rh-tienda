"use client";
import { useState } from "react";
import Link from "next/link";
import Campo from "@/components/tienda/Campo";
import Boton from "@/components/tienda/Boton";
import { IMAGENES } from "./imagenes";

function aTexto(valor) {
  if (valor === null || valor === undefined) {
    return "";
  }
  return String(valor);
}

function esNumero(texto) {
  return texto.trim() !== "" && !isNaN(Number(texto));
}

export function validarProducto(datos) {
  const errores = {};
  const codigo = aTexto(datos.codigo).trim();
  const nombre = aTexto(datos.nombre).trim();
  const descripcion = aTexto(datos.descripcion);
  const precio = aTexto(datos.precio);
  const precioOferta = aTexto(datos.precioOferta);
  const stock = aTexto(datos.stock);
  const stockCritico = aTexto(datos.stockCritico);

  if (codigo === "") {
    errores.codigo = "El código es obligatorio.";
  } else if (codigo.length < 3) {
    errores.codigo = "El código debe tener al menos 3 caracteres.";
  }

  if (nombre === "") {
    errores.nombre = "El nombre es obligatorio.";
  } else if (nombre.length > 100) {
    errores.nombre = "El nombre puede tener como máximo 100 caracteres.";
  }

  if (descripcion.length > 500) {
    errores.descripcion = "La descripción puede tener como máximo 500 caracteres.";
  }

  if (!esNumero(precio) || Number(precio) < 0) {
    errores.precio = "El precio es obligatorio y debe ser un número mayor o igual a 0.";
  }

  if (precioOferta.trim() !== "") {
    if (!esNumero(precioOferta) || Number(precioOferta) < 0) {
      errores.precioOferta = "El precio de oferta debe ser un número mayor o igual a 0.";
    } else if (esNumero(precio) && Number(precioOferta) >= Number(precio)) {
      errores.precioOferta = "El precio de oferta debe ser menor que el precio.";
    }
  }

  if (!esNumero(stock) || !Number.isInteger(Number(stock)) || Number(stock) < 0) {
    errores.stock = "Los cupos son obligatorios y deben ser un número entero mayor o igual a 0.";
  }

  if (!esNumero(stockCritico) || !Number.isInteger(Number(stockCritico)) || Number(stockCritico) < 0) {
    errores.stockCritico = "El cupo crítico es obligatorio y debe ser un número entero mayor o igual a 0.";
  }

  const duracion = aTexto(datos.duracion);
  if (!esNumero(duracion) || !Number.isInteger(Number(duracion)) || Number(duracion) <= 0) {
    errores.duracion = "La duración es obligatoria y debe ser un número entero de minutos.";
  }

  return errores;
}

export default function FormularioProducto({ productoInicial, categorias, onGuardar }) {
  const [datos, setDatos] = useState({
    duracion: productoInicial ? aTexto(productoInicial.duracion) : "30",
    codigo: productoInicial ? productoInicial.codigo : "",
    nombre: productoInicial ? productoInicial.nombre : "",
    descripcion: productoInicial ? productoInicial.descripcion : "",
    precio: productoInicial ? aTexto(productoInicial.precio) : "",
    precioOferta: productoInicial ? aTexto(productoInicial.precioOferta) : "",
    stock: productoInicial ? aTexto(productoInicial.stock) : "",
    stockCritico: productoInicial ? aTexto(productoInicial.stockCritico) : "",
    categoria: productoInicial ? productoInicial.categoria : categorias[0].nombre,
    imagen: productoInicial ? productoInicial.imagen : IMAGENES[0].ruta,
  });
  const [errores, setErrores] = useState({});

  function cambiar(nombre, valor) {
    setDatos({ ...datos, [nombre]: valor });
  }

  let opcionesCategoria = [];
  categorias.forEach((categoria) => {
    opcionesCategoria.push(
      <option key={categoria.id} value={categoria.nombre}>
        {categoria.nombre}
      </option>
    );
  });
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
    const nuevosErrores = validarProducto(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }
    onGuardar({
      duracion: Number(datos.duracion),
      codigo: datos.codigo.trim(),
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      precio: Number(datos.precio),
      precioOferta: datos.precioOferta.trim() === "" ? null : Number(datos.precioOferta),
      stock: Number(datos.stock),
      stockCritico: Number(datos.stockCritico),
      categoria: datos.categoria,
      imagen: datos.imagen,
    });
  }

  return (
    <form onSubmit={guardar} noValidate>
      <div className="row">
        <div className="col-md-3">
          <Campo etiqueta="Código" nombre="codigo" valor={datos.codigo} onChange={cambiar} error={errores.codigo} />
        </div>
        <div className="col-md-6">
          <Campo etiqueta="Nombre" nombre="nombre" valor={datos.nombre} onChange={cambiar} error={errores.nombre} />
        </div>
        <div className="col-md-3">
          <Campo etiqueta="Duración (minutos)" nombre="duracion" tipo="number" valor={datos.duracion} onChange={cambiar} error={errores.duracion} />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">
          Descripción (opcional)
        </label>
        <textarea
          id="descripcion"
          className={"form-control" + (errores.descripcion ? " is-invalid" : "")}
          rows={3}
          value={datos.descripcion}
          onChange={(e) => cambiar("descripcion", e.target.value)}
        />
        {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
      </div>
      <div className="row">
        <div className="col-md-6">
          <Campo etiqueta="Precio" nombre="precio" tipo="number" valor={datos.precio} onChange={cambiar} error={errores.precio} />
        </div>
        <div className="col-md-6">
          <Campo
            etiqueta="Precio de oferta (opcional)"
            nombre="precioOferta"
            tipo="number"
            valor={datos.precioOferta}
            onChange={cambiar}
            error={errores.precioOferta}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Campo etiqueta="Cupos de la semana" nombre="stock" tipo="number" valor={datos.stock} onChange={cambiar} error={errores.stock} />
        </div>
        <div className="col-md-6">
          <Campo
            etiqueta="Cupo crítico"
            nombre="stockCritico"
            tipo="number"
            valor={datos.stockCritico}
            onChange={cambiar}
            error={errores.stockCritico}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="categoria" className="form-label">
            Categoría
          </label>
          <select id="categoria" className="form-select" value={datos.categoria} onChange={(e) => cambiar("categoria", e.target.value)}>
            {opcionesCategoria}
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="imagen" className="form-label">
            Imagen
          </label>
          <select id="imagen" className="form-select" value={datos.imagen} onChange={(e) => cambiar("imagen", e.target.value)}>
            {opcionesImagen}
          </select>
        </div>
      </div>
      <Boton etiqueta="Guardar" tipo="submit" />{" "}
      <Link href="/admin/productos" className="btn btn-outline-dark">
        Cancelar
      </Link>
    </form>
  );
}
