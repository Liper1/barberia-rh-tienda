"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerProductos, obtenerProductoPorId } from "@/data/productos";
import { obtenerCarrito, agregarAlCarrito, cambiarCantidad, quitarDelCarrito, vaciarCarrito, calcularTotal } from "@/data/carrito";
import { formatearPrecio } from "@/lib/validaciones";
import ListaProductos from "@/components/tienda/ListaProductos";
import TablaCarrito from "@/components/tienda/TablaCarrito";
import Boton from "@/components/tienda/Boton";
import MensajeError from "@/components/tienda/MensajeError";

export default function Carrito() {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    async function cargarDatos() {
      setProductos(await obtenerProductos());
      setCarrito(await obtenerCarrito());
    }
    cargarDatos();
  }, []);

  async function cambiar(id, cantidad) {
    let itemActual = null;
    carrito.forEach((item) => {
      if (item.id === id) {
        itemActual = item;
      }
    });
    const producto = await obtenerProductoPorId(itemActual.productoId);
    const estaSumando = cantidad > itemActual.cantidad;
    if (estaSumando && producto !== null && cantidad > producto.stock) {
      setMensaje("No quedan más cupos de " + producto.nombre + " (disponible: " + producto.stock + ").");
      return;
    }
    setMensaje("");
    setCarrito(await cambiarCantidad(id, cantidad));
  }

  async function agregar(producto) {
    setCarrito(await agregarAlCarrito(producto));
  }

  async function quitar(id) {
    setCarrito(await quitarDelCarrito(id));
  }

  async function vaciar() {
    setCarrito(await vaciarCarrito());
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Carrito de compras</h1>
      <div className="row g-4">
        <div className="col-12 col-xl-7">
          <h2 className="h4 mb-3">Servicios</h2>
          <div>
            <ListaProductos productos={productos} onAgregar={agregar} />
          </div>
        </div>
        <div className="col-12 col-xl-5">
          <h2 className="h4 mb-3">Tu carrito</h2>
          <MensajeError mensaje={mensaje} />
          <TablaCarrito items={carrito} onCambiarCantidad={cambiar} onQuitar={quitar} />
          <p className="fs-4 fw-bold">Total: {formatearPrecio(calcularTotal(carrito))}</p>
          <div className="d-flex flex-wrap gap-2">
            <Boton etiqueta="Limpiar carrito" variante="outline-danger" onClick={vaciar} deshabilitado={carrito.length === 0} />
            {carrito.length === 0 ? (
              <span className="btn btn-primary disabled" aria-disabled="true">Comprar ahora</span>
            ) : (
              <Link href="/checkout" className="btn btn-primary">Comprar ahora</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
