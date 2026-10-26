import { leer, enviar, leerLista } from "./api";

export async function obtenerUsuarios() {
  return await leerLista("usuarios");
}

export async function obtenerUsuarioPorId(id) {
  return await leer("usuarios/" + id);
}

export async function obtenerUsuarioPorCorreo(correo) {
  const buscado = correo.trim().toLowerCase();
  const usuarios = await obtenerUsuarios();
  let encontrado = null;
  usuarios.forEach((usuario) => {
    if (usuario.correo.toLowerCase() === buscado) {
      encontrado = usuario;
    }
  });
  return encontrado;
}

export async function obtenerUsuarioPorRun(run) {
  const usuarios = await obtenerUsuarios();
  let encontrado = null;
  usuarios.forEach((usuario) => {
    if (usuario.run === run) {
      encontrado = usuario;
    }
  });
  return encontrado;
}

export async function crearUsuario(datos) {
  return await enviar("usuarios", "POST", datos);
}

export async function actualizarUsuario(id, datos) {
  return await enviar("usuarios/" + id, "PATCH", datos);
}

export async function eliminarUsuario(id) {
  const eliminado = await enviar("usuarios/" + id, "DELETE");
  return eliminado !== null;
}
