"use client";
import Link from "next/link";
import { obtenerBlogPorId } from "@/data/blogs";

export default function DetalleBlog({ id }) {
  const blog = obtenerBlogPorId(id);

  if (blog === null) {
    return (
      <div>
        <h1>Artículo no encontrado</h1>
        <Link href="/blogs">Volver al blog</Link>
      </div>
    );
  }

  const parrafos = [];
  blog.contenido.forEach((parrafo, indice) => {
    parrafos.push(<p key={indice}>{parrafo}</p>);
  });

  return (
    <article className="col-12 col-lg-8 mx-auto">
      <Link href="/blogs">← Volver al blog</Link>
      <h1 className="mt-3">{blog.titulo}</h1>
      <p className="text-body-secondary">{blog.fecha}</p>
      <img src={blog.imagen} alt={blog.titulo} className="img-fluid w-100 mb-4" />
      {parrafos}
    </article>
  );
}
