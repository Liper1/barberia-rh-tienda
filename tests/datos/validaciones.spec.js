import { limpiarRun, validarRut, validarCorreo, validarClave, validarTarjeta, pagoAprobado, validarRegistro, formatearPrecio } from "@/lib/validaciones";

describe("lib/validaciones.js", () => {
  it("validarRut acepta RUN correctos (módulo 11) y rechaza los incorrectos", () => {
    expect(validarRut("1901102K")).toBeTrue();
    expect(validarRut("12.345.678-5")).toBeTrue();
    expect(validarRut("19011022K")).toBeFalse();
    expect(validarRut("abc")).toBeFalse();
    expect(validarRut("")).toBeFalse();
    expect(limpiarRun("1.901.102-k")).toBe("1901102K");
  });

  it("validarCorreo solo acepta @duoc.cl, @profesor.duoc.cl y @gmail.com", () => {
    expect(validarCorreo("alumno@duoc.cl")).toBeTrue();
    expect(validarCorreo("profe@profesor.duoc.cl")).toBeTrue();
    expect(validarCorreo("cliente@gmail.com")).toBeTrue();
    expect(validarCorreo("cliente@hotmail.com")).toBeFalse();
    expect(validarCorreo("sin-arroba.cl")).toBeFalse();
  });

  it("validarClave exige entre 4 y 10 caracteres", () => {
    expect(validarClave("1234")).toBeTrue();
    expect(validarClave("123")).toBeFalse();
    expect(validarClave("12345678901")).toBeFalse();
  });

  it("valida la tarjeta y rechaza el pago con la tarjeta de prueba", () => {
    expect(validarTarjeta("4111 1111 1111 1111")).toBeTrue();
    expect(validarTarjeta("4111")).toBeFalse();
    expect(pagoAprobado("4111 1111 1111 1111")).toBeTrue();
    expect(pagoAprobado("4000 0000 0000 0002")).toBeFalse();
  });

  it("validarRegistro devuelve un error por cada campo malo y ninguno si todo está bien", () => {
    const correcto = {
      run: "1901102K", nombre: "Ana", apellidos: "Pérez", correo: "ana@gmail.com", clave: "clave1", confirmarClave: "clave1",
      region: "Biobío", comuna: "Concepción", direccion: "Calle 1",
    };
    expect(Object.keys(validarRegistro(correcto)).length).toBe(0);

    const errores = validarRegistro({ ...correcto, run: "111", correo: "ana@yahoo.com", confirmarClave: "otra" });
    expect(Object.keys(errores).sort()).toEqual(["confirmarClave", "correo", "run"]);
  });

  it("formatearPrecio usa el formato chileno", () => {
    expect(formatearPrecio(8990)).toBe("$8.990");
    expect(formatearPrecio(149990)).toBe("$149.990");
  });
});
