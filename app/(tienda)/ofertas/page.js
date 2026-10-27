"use client";
import { useEffect, useState } from "react";
import { obtenerProductosEnOferta } from "@/data/productos";
import { agregarAlCarrito } from "@/data/carrito";
import ListaProductos from "@/components/tienda/ListaProductos";

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      setOfertas(await obtenerProductosEnOferta());
    }
    cargarDatos();
  }, []);

  return (
    <div className="container py-5">
      <h1>Ofertas</h1>
      <p className="text-body-secondary mb-4">Hay {ofertas.length} servicios en oferta.</p>
      <ListaProductos productos={ofertas} onAgregar={agregarAlCarrito} />
    </div>
  );
}
