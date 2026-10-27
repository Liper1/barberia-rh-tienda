"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerCategorias } from "@/data/categorias";
import { obtenerProductosEnOferta } from "@/data/productos";
import { agregarAlCarrito } from "@/data/carrito";
import ListaProductos from "@/components/tienda/ListaProductos";

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      setCategorias(await obtenerCategorias());
      const lista = await obtenerProductosEnOferta();
      const primeras = [];
      lista.forEach((producto) => {
        if (primeras.length < 4) {
          primeras.push(producto);
        }
      });
      setOfertas(primeras);
    }
    cargarDatos();
  }, []);

  const tarjetasCategorias = [];
  categorias.forEach((categoria) => {
    tarjetasCategorias.push(
      <div className="col" key={categoria.id}>
        <Link href={"/categorias/" + categoria.id} className="categoria-enlace">
          <div className="overflow-hidden mb-2">
            <img src={categoria.imagen} alt="" />
          </div>
          <span className="titulo fs-5">{categoria.nombre}</span>
        </Link>
      </div>
    );
  });

  return (
    <>
      <section className="portada" style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
        <div className="container py-5">
          <div className="col-12 col-md-8 col-lg-6">
            <h1 className="mb-3">
              Tu corte, <span>pagado en línea</span>
            </h1>
            <p className="lead mb-4">Elige tu servicio, págalo en línea y agenda con tu número de orden.</p>
            <div className="d-flex flex-wrap gap-2">
              <Link href="/productos" className="btn btn-primary btn-lg">
                Ver servicios
              </Link>
              <Link href="/ofertas" className="btn btn-outline-light btn-lg">
                Ofertas
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-5">
        <h2 className="mb-4">Categorías</h2>
        <div className="row row-cols-1 row-cols-sm-3 g-3 g-lg-4">
          {tarjetasCategorias}
        </div>
      </section>
      <section className="container pb-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <h2 className="mb-0">En oferta esta semana</h2>
          <Link href="/ofertas">Ver todas</Link>
        </div>
        <ListaProductos productos={ofertas} onAgregar={agregarAlCarrito} />
      </section>
      <section className="seccion-oscura">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-6">
              <img src="/img/nosotros.jpg" alt="Interior de la Barbería R&H" className="img-fluid" />
            </div>
            <div className="col-12 col-md-6">
              <h2 className="mb-3">La misma barbería de siempre</h2>
              <p>
                Los mismos barberos y los mismos cortes del local, ahora con pago en línea y cupos para toda la semana.
              </p>
              <Link href="/nosotros" className="btn btn-dorado">
                Conoce la barbería
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
