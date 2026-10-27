import { render, screen, fireEvent } from "@testing-library/react";
import Boton from "@/components/tienda/Boton";

describe("Boton (props)", () => {
  it("muestra la etiqueta recibida por props", () => {
    render(<Boton etiqueta="Comprar ahora" onClick={() => {}} />);

    expect(screen.getByRole("button", { name: "Comprar ahora" })).toBeTruthy();
  });

  it("ejecuta la función onClick al hacer clic", () => {
    const alHacerClic = jasmine.createSpy("onClick");
    render(<Boton etiqueta="Añadir" onClick={alHacerClic} />);

    fireEvent.click(screen.getByRole("button", { name: "Añadir" }));

    expect(alHacerClic).toHaveBeenCalledTimes(1);
  });

  it("no ejecuta onClick cuando está deshabilitado", () => {
    const alHacerClic = jasmine.createSpy("onClick");
    render(<Boton etiqueta="Sin stock" onClick={alHacerClic} deshabilitado />);

    const boton = screen.getByRole("button", { name: "Sin stock" });
    fireEvent.click(boton);

    expect(boton.disabled).toBeTrue();
    expect(alHacerClic).not.toHaveBeenCalled();
  });

  it("arma las clases de Bootstrap según la variante", () => {
    render(<Boton etiqueta="Eliminar" onClick={() => {}} variante="outline-danger" chico />);

    const boton = screen.getByRole("button", { name: "Eliminar" });
    expect(boton.className).toBe("btn btn-outline-danger btn-sm");
  });
});
