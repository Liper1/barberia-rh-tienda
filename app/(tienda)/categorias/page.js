"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerCategorias } from "@/data/categorias";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      setCategorias(await obtenerCategorias());
    }
    cargarDatos();
  }, []);

  const tarjetas = [];
  categorias.forEach((categoria) => {
    tarjetas.push(
      <div className="col" key={categoria.id}>
        <div className="card h-100">
          <img src={categoria.imagen} className="card-img-top" alt={categoria.nombre} />
          <div className="card-body d-flex flex-column">
            <h2 className="h5 card-title">{categoria.nombre}</h2>
            <p className="card-text">{categoria.descripcion}</p>
            <Link href={"/categorias/" + categoria.id} className="btn btn-primary mt-auto align-self-start">
              Ver todo
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4">Categorías</h1>
      <div className="row row-cols-1 row-cols-sm-3 g-4">
        {tarjetas}
      </div>
    </div>
  );
}
