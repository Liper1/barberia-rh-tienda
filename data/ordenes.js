import { leer, enviar, leerLista } from "./api";
import { obtenerProductoPorId, actualizarProducto } from "./productos";

export async function obtenerOrdenes() {
  return await leerLista("ordenes");
}

export async function obtenerOrdenPorId(id) {
  return await leer("ordenes/" + id);
}

export async function obtenerOrdenesPorUsuario(usuarioId) {
  const ordenes = await obtenerOrdenes();
  const resultado = [];
  ordenes.forEach((orden) => {
    if (orden.usuarioId === usuarioId) {
      resultado.push(orden);
    }
  });
  return resultado;
}

export async function eliminarOrden(id) {
  const eliminada = await enviar("ordenes/" + id, "DELETE");
  return eliminada !== null;
}

function siguienteNumero(ordenes) {
  let mayor = 10000;
  ordenes.forEach((orden) => {
    if (orden.numero > mayor) {
      mayor = orden.numero;
    }
  });
  return mayor + 1;
}

async function moverStock(items, signo) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const producto = await obtenerProductoPorId(item.productoId);
    if (producto !== null) {
      await actualizarProducto(producto.id, { stock: producto.stock + signo * item.cantidad });
    }
  }
}

export async function actualizarOrden(id, datos) {
  const orden = await obtenerOrdenPorId(id);
  if (orden === null) {
    return null;
  }
  const estabaRechazada = orden.estado === "Rechazada";
  const quedaRechazada = datos.estado !== undefined ? datos.estado === "Rechazada" : estabaRechazada;
  if (!estabaRechazada && quedaRechazada) {
    await moverStock(orden.items, 1);
  }
  if (estabaRechazada && !quedaRechazada) {
    const faltantes = await revisarStock(orden.items);
    if (faltantes.length > 0) {
      return null;
    }
    await moverStock(orden.items, -1);
  }
  return await enviar("ordenes/" + id, "PATCH", datos);
}

export async function revisarStock(carrito) {
  const faltantes = [];
  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const producto = await obtenerProductoPorId(item.productoId);
    if (producto === null || producto.stock < item.cantidad) {
      faltantes.push(item.nombre);
    }
  }
  return faltantes;
}

export async function crearOrden(cliente, carrito, usuarioId, pagoAprobado, motivo) {
  const ordenes = await obtenerOrdenes();
  const items = [];
  let total = 0;
  carrito.forEach((item) => {
    items.push({ productoId: item.productoId, nombre: item.nombre, precio: item.precio, cantidad: item.cantidad });
    total = total + item.precio * item.cantidad;
  });
  const orden = {
    numero: siguienteNumero(ordenes),
    fecha: new Date().toISOString().slice(0, 10),
    usuarioId: usuarioId,
    estado: pagoAprobado ? "Pagada" : "Rechazada",
    motivo: pagoAprobado ? "" : motivo,
    cliente: cliente,
    items: items,
    total: total,
  };
  const creada = await enviar("ordenes", "POST", orden);
  if (creada !== null && pagoAprobado) {
    await moverStock(items, -1);
  }
  return creada;
}
