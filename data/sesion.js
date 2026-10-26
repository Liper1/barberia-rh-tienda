import { leer, enviar, avisarCambio } from "./api";
import { obtenerUsuarioPorCorreo } from "./usuarios";

export async function iniciarSesion(correo, clave) {
  const usuario = await obtenerUsuarioPorCorreo(correo);
  if (usuario === null || usuario.clave !== clave) {
    return null;
  }
  await enviar("sesion", "PUT", { id: usuario.id, nombre: usuario.nombre, tipo: usuario.tipo });
  avisarCambio("sesion");
  return usuario;
}

export async function cerrarSesion() {
  await enviar("sesion", "PUT", {});
  avisarCambio("sesion");
}

export async function obtenerSesion() {
  const sesion = await leer("sesion");
  if (sesion === null || !sesion.id) {
    return null;
  }
  return sesion;
}

export async function actualizarSesionDeUsuario(usuario) {
  const sesion = await obtenerSesion();
  if (sesion === null || sesion.id !== usuario.id) {
    return;
  }
  await enviar("sesion", "PUT", { id: usuario.id, nombre: usuario.nombre, tipo: usuario.tipo });
  avisarCambio("sesion");
}

export function puedeEntrarAlPanel(sesion) {
  return sesion !== null && (sesion.tipo === "Administrador" || sesion.tipo === "Vendedor");
}
