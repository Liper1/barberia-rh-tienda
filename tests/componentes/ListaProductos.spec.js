import { render, screen } from "@testing-library/react";
import ListaProductos from "@/components/tienda/ListaProductos";
import { productosPrueba } from "../datos-prueba";

describe("ListaProductos (renderizado)", () => {
  it("muestra una tarjeta por cada producto recibido", () => {
    render(<ListaProductos productos={productosPrueba} onAgregar={() => {}} />);

    const titulos = screen.getAllByRole("heading", { level: 3 });
    expect(titulos.length).toBe(productosPrueba.length);
    expect(screen.getByText("Corte degradado")).toBeTruthy();
    expect(screen.getByText("Arreglo de barba")).toBeTruthy();
    expect(screen.getByText("Toalla caliente")).toBeTruthy();
  });

  it("muestra un mensaje cuando la lista viene vacía", () => {
    render(<ListaProductos productos={[]} onAgregar={() => {}} />);

    expect(screen.getByText("No hay resultados para la búsqueda.")).toBeTruthy();
    expect(screen.queryAllByRole("heading").length).toBe(0);
  });
});
