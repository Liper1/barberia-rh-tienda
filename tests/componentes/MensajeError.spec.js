import { render, screen } from "@testing-library/react";
import MensajeError from "@/components/tienda/MensajeError";

describe("MensajeError (renderizado condicional)", () => {
  it("no muestra nada cuando no hay mensaje", () => {
    const { container } = render(<MensajeError mensaje="" />);

    expect(screen.queryByRole("alert")).toBeNull();
    expect(container.innerHTML).toBe("");
  });

  it("muestra la alerta con el texto cuando hay un error", () => {
    render(<MensajeError mensaje="Correo o contraseña incorrectos." />);

    const alerta = screen.getByRole("alert");
    expect(alerta.textContent).toBe("Correo o contraseña incorrectos.");
    expect(alerta.classList.contains("alert-danger")).toBeTrue();
  });
});
