import { render, screen, fireEvent } from "@testing-library/react";
import TablaCarrito from "@/components/tienda/TablaCarrito";

describe("TablaCarrito (eventos)", () => {
  const items = [
    { id: 1, nombre: "Cera mate R&H", precio: 6990, imagen: "", cantidad: 2 },
    { id: 4, nombre: "Aceite para barba", precio: 8990, imagen: "", cantidad: 1 },
  ];

  it("muestra una fila por item con su subtotal", () => {
    render(<TablaCarrito items={items} onCambiarCantidad={() => {}} onQuitar={() => {}} />);

    expect(screen.getAllByRole("row").length).toBe(3);
    expect(screen.getByText("$13.980")).toBeTruthy();
  });

  it("el botón + pide sumar uno a la cantidad", () => {
    const onCambiar = jasmine.createSpy("onCambiarCantidad");
    render(<TablaCarrito items={items} onCambiarCantidad={onCambiar} onQuitar={() => {}} />);

    fireEvent.click(screen.getAllByRole("button", { name: "Sumar uno" })[0]);

    expect(onCambiar).toHaveBeenCalledWith(1, 3);
  });

  it("el botón - pide restar uno a la cantidad", () => {
    const onCambiar = jasmine.createSpy("onCambiarCantidad");
    render(<TablaCarrito items={items} onCambiarCantidad={onCambiar} onQuitar={() => {}} />);

    fireEvent.click(screen.getAllByRole("button", { name: "Restar uno" })[1]);

    expect(onCambiar).toHaveBeenCalledWith(4, 0);
  });

  it("el botón Eliminar entrega el id del item a onQuitar", () => {
    const onQuitar = jasmine.createSpy("onQuitar");
    render(<TablaCarrito items={items} onCambiarCantidad={() => {}} onQuitar={onQuitar} />);

    fireEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[1]);

    expect(onQuitar).toHaveBeenCalledWith(4);
  });

  it("con el carrito vacío muestra un aviso en vez de la tabla", () => {
    render(<TablaCarrito items={[]} onCambiarCantidad={() => {}} onQuitar={() => {}} />);

    expect(screen.queryByRole("table")).toBeNull();
    expect(screen.getByText("Tu carrito está vacío.")).toBeTruthy();
  });
});
