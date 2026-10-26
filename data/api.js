const URL_API = "http://localhost:4000/";

export async function leer(ruta) {
  try {
    const response = await fetch(URL_API + ruta);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function enviar(ruta, metodo, datos) {
  const opciones = { method: metodo, headers: { "Content-Type": "application/json" } };
  if (datos !== undefined) {
    opciones.body = JSON.stringify(datos);
  }
  try {
    const response = await fetch(URL_API + ruta, opciones);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function leerLista(ruta) {
  const lista = await leer(ruta);
  if (lista === null) {
    return [];
  }
  return lista;
}

export async function apiDisponible() {
  const respuesta = await leer("categorias");
  return respuesta !== null;
}

export function avisarCambio(nombre) {
  window.dispatchEvent(new Event("cambio-" + nombre));
}
