import { leer, enviar, leerLista } from "./api";

export async function obtenerCategorias() {
  return await leerLista("categorias");
}

export async function obtenerCategoriaPorId(id) {
  return await leer("categorias/" + id);
}

export async function crearCategoria(datos) {
  return await enviar("categorias", "POST", datos);
}

export async function actualizarCategoria(id, datos) {
  return await enviar("categorias/" + id, "PATCH", datos);
}

export async function eliminarCategoria(id) {
  const eliminada = await enviar("categorias/" + id, "DELETE");
  return eliminada !== null;
}
