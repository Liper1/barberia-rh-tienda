import { leer, enviar, leerLista } from "./api";

export async function obtenerProductos() {
  return await leerLista("productos");
}

export async function obtenerProductoPorId(id) {
  return await leer("productos/" + id);
}

export async function crearProducto(datos) {
  return await enviar("productos", "POST", datos);
}

export async function actualizarProducto(id, datos) {
  return await enviar("productos/" + id, "PATCH", datos);
}

export async function eliminarProducto(id) {
  const eliminado = await enviar("productos/" + id, "DELETE");
  return eliminado !== null;
}

export async function obtenerProductosPorCategoria(nombreCategoria) {
  const resultado = [];
  const productos = await obtenerProductos();
  productos.forEach((producto) => {
    if (producto.categoria === nombreCategoria) {
      resultado.push(producto);
    }
  });
  return resultado;
}

export async function obtenerProductosEnOferta() {
  const resultado = [];
  const productos = await obtenerProductos();
  productos.forEach((producto) => {
    if (producto.precioOferta !== null) {
      resultado.push(producto);
    }
  });
  return resultado;
}

export async function obtenerProductosCriticos() {
  const resultado = [];
  const productos = await obtenerProductos();
  productos.forEach((producto) => {
    if (producto.stock <= producto.stockCritico) {
      resultado.push(producto);
    }
  });
  return resultado;
}

export function precioFinal(producto) {
  return producto.precioOferta !== null ? producto.precioOferta : producto.precio;
}

export function contiene(palabra, fragmento) {
  return palabra.toLowerCase().indexOf(fragmento.toLowerCase()) >= 0;
}

export function filtrarProductos(productos, texto, soloEnStock) {
  const resultado = [];
  productos.forEach((producto) => {
    if (soloEnStock && producto.stock <= 0) {
      return;
    }
    if (contiene(producto.nombre, texto)) {
      resultado.push(producto);
    }
  });
  return resultado;
}
