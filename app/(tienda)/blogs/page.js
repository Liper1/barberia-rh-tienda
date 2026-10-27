import Link from "next/link";
import { blogs } from "@/data/blogs";

export const metadata = { title: "Blog | Barbería R&H" };

export const instant = false;

export default function Blogs() {
  const tarjetas = [];
  blogs.forEach((blog) => {
    tarjetas.push(
      <div className="col" key={blog.id}>
        <div className="card h-100">
          <img src={blog.imagen} className="card-img-top" alt={blog.titulo} />
          <div className="card-body d-flex flex-column">
            <small className="text-body-secondary">{blog.fecha}</small>
            <h2 className="h5 card-title">{blog.titulo}</h2>
            <p className="card-text">{blog.resumen}</p>
            <Link href={"/blogs/" + blog.id} className="mt-auto">Leer artículo</Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4">Blog</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {tarjetas}
      </div>
    </div>
  );
}
