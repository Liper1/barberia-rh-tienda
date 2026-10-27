import { render, screen, fireEvent } from "@testing-library/react";
import FormularioCheckout from "@/components/tienda/FormularioCheckout";

describe("FormularioCheckout (estado, props y validación)", () => {
  const usuario = { nombre: "Matías", apellidos: "González Rojas", correo: "cliente@gmail.com", region: "Valparaíso", comuna: "Viña del Mar", calle: "Calle 5 Norte 220" };

  it("precarga los datos del usuario recibidos por props", () => {
    render(<FormularioCheckout datosIniciales={usuario} onConfirmar={() => {}} />);

    expect(screen.getByLabelText("Nombre").value).toBe("Matías");
    expect(screen.getByLabelText("Correo").value).toBe("cliente@gmail.com");
    expect(screen.getByLabelText("Región").value).toBe("Valparaíso");
    expect(screen.getByLabelText("Comuna").value).toBe("Viña del Mar");
  });

  it("al cambiar la región se limpia la comuna y cambian las opciones", () => {
    render(<FormularioCheckout datosIniciales={usuario} onConfirmar={() => {}} />);

    fireEvent.change(screen.getByLabelText("Región"), { target: { value: "Biobío" } });

    const comuna = screen.getByLabelText("Comuna");
    expect(comuna.value).toBe("");
    const opciones = [];
    comuna.querySelectorAll("option").forEach((opcion) => {
      opciones.push(opcion.value);
    });
    expect(opciones).toContain("Concepción");
  });

  it("con datos incompletos muestra los errores y no confirma", () => {
    const onConfirmar = jasmine.createSpy("onConfirmar");
    render(<FormularioCheckout datosIniciales={{}} onConfirmar={onConfirmar} />);

    fireEvent.click(screen.getByRole("button", { name: "Pagar ahora" }));

    expect(onConfirmar).not.toHaveBeenCalled();
    expect(screen.getByText("El nombre es obligatorio.")).toBeTruthy();
    expect(screen.getByText("La tarjeta debe tener 16 números.")).toBeTruthy();
  });

  it("con todo correcto llama a onConfirmar con los datos del formulario", () => {
    const onConfirmar = jasmine.createSpy("onConfirmar");
    render(<FormularioCheckout datosIniciales={usuario} onConfirmar={onConfirmar} />);

    fireEvent.change(screen.getByLabelText("Número de tarjeta"), { target: { value: "4111 1111 1111 1111" } });
    fireEvent.click(screen.getByRole("button", { name: "Pagar ahora" }));

    expect(onConfirmar).toHaveBeenCalledTimes(1);
    const datos = onConfirmar.calls.mostRecent().args[0];
    expect(datos.calle).toBe("Calle 5 Norte 220");
    expect(datos.tarjeta).toBe("4111 1111 1111 1111");
  });
});
