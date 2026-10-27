import { render, screen, fireEvent } from "@testing-library/react";
import FormularioRegistro from "@/components/tienda/FormularioRegistro";

describe("FormularioRegistro (validación y mensaje de error)", () => {
  function escribir(etiqueta, valor) {
    fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
  }

  function llenarCorrecto() {
    escribir("RUN", "1901102K");
    escribir("Nombre", "Ana");
    escribir("Apellidos", "Pérez Soto");
    escribir("Correo", "ana@gmail.com");
    escribir("Contraseña", "clave1");
    escribir("Repetir contraseña", "clave1");
    escribir("Región", "Biobío");
    escribir("Comuna", "Concepción");
    escribir("Dirección", "Calle 1");
  }

  it("marca el RUN inválido y no llama a onRegistrar", () => {
    const onRegistrar = jasmine.createSpy("onRegistrar");
    render(<FormularioRegistro onRegistrar={onRegistrar} />);
    llenarCorrecto();
    escribir("RUN", "19011022K");

    fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));

    expect(onRegistrar).not.toHaveBeenCalled();
    expect(screen.getByLabelText("RUN").classList.contains("is-invalid")).toBeTrue();
  });

  it("con datos válidos llama a onRegistrar con lo escrito", () => {
    const onRegistrar = jasmine.createSpy("onRegistrar").and.returnValue("");
    render(<FormularioRegistro onRegistrar={onRegistrar} />);
    llenarCorrecto();

    fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));

    expect(onRegistrar).toHaveBeenCalledTimes(1);
    expect(onRegistrar.calls.mostRecent().args[0].correo).toBe("ana@gmail.com");
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("muestra el error que devuelve onRegistrar (correo repetido)", async () => {
    const onRegistrar = jasmine.createSpy("onRegistrar").and.returnValue("Ya existe una cuenta con ese correo.");
    render(<FormularioRegistro onRegistrar={onRegistrar} />);
    llenarCorrecto();

    fireEvent.click(screen.getByRole("button", { name: "Crear cuenta" }));

    expect((await screen.findByRole("alert")).textContent).toBe("Ya existe una cuenta con ese correo.");
  });
});
