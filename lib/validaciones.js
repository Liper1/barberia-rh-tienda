export function validarRut(rutCompleto) {
  if (!rutCompleto || typeof rutCompleto !== "string") return false;

  const valor = rutCompleto.replace(/^0+|[\.-]/g, "").toUpperCase();

  if (valor.length < 2) return false;

  const cuerpo = valor.slice(0, -1);
  const dv = valor.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const dvEsperado = 11 - (suma % 11);
  let dvCalculado;

  if (dvEsperado === 11) {
    dvCalculado = "0";
  } else if (dvEsperado === 10) {
    dvCalculado = "K";
  } else {
    dvCalculado = dvEsperado.toString();
  }

  return dvCalculado === dv;
}

export function limpiarRun(run) {
  let limpio = "";
  for (let i = 0; i < run.length; i++) {
    const letra = run.charAt(i);
    if (letra !== "." && letra !== "-" && letra !== " ") {
      limpio = limpio + letra;
    }
  }
  return limpio.toUpperCase();
}

export function validarCorreo(correo) {
  if (!correo || correo.length > 100) return false;
  const texto = correo.trim().toLowerCase();
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(texto);
}

export function validarClave(clave) {
  return typeof clave === "string" && clave.length >= 4 && clave.length <= 10;
}

export function validarTarjeta(numero) {
  const limpio = (numero || "").replace(/\s/g, "");
  return /^\d{16}$/.test(limpio);
}

export const TARJETA_RECHAZADA = "4000000000000002";

export function pagoAprobado(numeroTarjeta) {
  return numeroTarjeta.replace(/\s/g, "") !== TARJETA_RECHAZADA;
}

export function validarRegistro(datos) {
  const errores = {};
  if (!validarRut(datos.run)) errores.run = "El RUN no es válido. Escríbelo sin puntos ni guion, por ejemplo 1901102K.";
  if (!datos.nombre || datos.nombre.trim() === "") errores.nombre = "El nombre es obligatorio.";
  if (!datos.apellidos || datos.apellidos.trim() === "") errores.apellidos = "Los apellidos son obligatorios.";
  if (!validarCorreo(datos.correo)) errores.correo = "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  if (!validarClave(datos.clave)) errores.clave = "La contraseña debe tener entre 4 y 10 caracteres.";
  if (datos.clave !== datos.confirmarClave) errores.confirmarClave = "Las contraseñas no coinciden.";
  if (!datos.region) errores.region = "Selecciona una región.";
  if (!datos.comuna) errores.comuna = "Selecciona una comuna.";
  if (!datos.direccion || datos.direccion.trim() === "") errores.direccion = "La dirección es obligatoria.";
  return errores;
}

export function validarCheckout(datos) {
  const errores = {};
  if (!datos.nombre || datos.nombre.trim() === "") errores.nombre = "El nombre es obligatorio.";
  if (!datos.apellidos || datos.apellidos.trim() === "") errores.apellidos = "Los apellidos son obligatorios.";
  if (!validarCorreo(datos.correo)) errores.correo = "Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).";
  if (!datos.region) errores.region = "Selecciona una región.";
  if (!datos.comuna) errores.comuna = "Selecciona una comuna.";
  if (!datos.calle || datos.calle.trim() === "") errores.calle = "La calle y el número son obligatorios.";
  if (!validarTarjeta(datos.tarjeta)) errores.tarjeta = "La tarjeta debe tener 16 números.";
  return errores;
}

export function formatearPrecio(valor) {
  return "$" + Number(valor).toLocaleString("es-CL");
}
