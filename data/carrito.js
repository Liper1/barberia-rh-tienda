import { leer, enviar, avisarCambio, leerLista } from "./api";
import { precioFinal } from "./productos";

export async function obtenerCarrito() {
  return await leerLista("carrito");
}

function buscarItem(carrito, productoId) {
  let encontrado = null;
  carrito.forEach((item) => {
    if (item.productoId === productoId) {
      encontrado = item;
    }
  });
  return encontrado;
}

export async function agregarAlCarrito(producto) {
  const carrito = await obtenerCarrito();
  const existente = buscarItem(carrito, producto.id);
  if (existente !== null) {
    if (existente.cantidad >= producto.stock) {
      return carrito;
    }
    await enviar("carrito/" + existente.id, "PATCH", { cantidad: existente.cantidad + 1 });
  } else {
    if (producto.stock <= 0) {
      return carrito;
    }
    await enviar("carrito", "POST", {
      productoId: producto.id,
      nombre: producto.nombre,
      precio: precioFinal(producto),
      imagen: producto.imagen,
      cantidad: 1,
    });
  }
  avisarCambio("carrito");
  return await obtenerCarrito();
}

export async function cambiarCantidad(id, cantidad) {
  if (cantidad <= 0) {
    await enviar("carrito/" + id, "DELETE");
  } else {
    await enviar("carrito/" + id, "PATCH", { cantidad: cantidad });
  }
  avisarCambio("carrito");
  return await obtenerCarrito();
}

export async function quitarDelCarrito(id) {
  return await cambiarCantidad(id, 0);
}

export async function vaciarCarrito() {
  const carrito = await obtenerCarrito();
  for (let i = 0; i < carrito.length; i++) {
    await enviar("carrito/" + carrito[i].id, "DELETE");
  }
  avisarCambio("carrito");
  return [];
}

export async function quitarServicioDelCarrito(productoId) {
  const carrito = await obtenerCarrito();
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].productoId === productoId || carrito[i].productoId === null) {
      await enviar("carrito/" + carrito[i].id, "DELETE");
    }
  }
  avisarCambio("carrito");
}

export function calcularTotal(carrito) {
  let total = 0;
  carrito.forEach((item) => {
    total = total + item.precio * item.cantidad;
  });
  return total;
}

export function contarUnidades(carrito) {
  let unidades = 0;
  carrito.forEach((item) => {
    unidades = unidades + item.cantidad;
  });
  return unidades;
}
