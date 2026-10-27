import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CatalogoProductos from "@/components/tienda/CatalogoProductos";
import { crearApiFalsa } from "../mocks/apiFalsa";

describe("CatalogoProductos (estado y carga desde la API)", () => {
  let db;

  beforeEach(() => {
    db = crearApiFalsa();
  });

  it("carga los 7 servicios con fetch al aparecer", async () => {
    render(<CatalogoProductos busquedaInicial="" />);

    const titulos = await screen.findAllByRole("heading", { level: 3 });
    expect(titulos.length).toBe(7);
    expect(window.fetch).toHaveBeenCalledWith("http://localhost:4000/productos");
  });

  it("al escribir en el buscador cambia el estado y se filtra la lista", async () => {
    render(<CatalogoProductos busquedaInicial="" />);
    await screen.findAllByRole("heading", { level: 3 });

    fireEvent.change(screen.getByPlaceholderText("Buscar servicio..."), { target: { value: "barba" } });

    const titulos = screen.getAllByRole("heading", { level: 3 });
    expect(titulos.length).toBe(2);
    titulos.forEach((titulo) => {
      expect(titulo.textContent.toLowerCase()).toContain("barba");
    });
  });

  it("usa la búsqueda que recibe por props (viene de /productos?buscar=navaja)", async () => {
    render(<CatalogoProductos busquedaInicial="navaja" />);

    const titulos = await screen.findAllByRole("heading", { level: 3 });
    expect(screen.getByPlaceholderText("Buscar servicio...").value).toBe("navaja");
    expect(titulos.length).toBe(1);
  });

  it("al añadir al carrito se guarda en la API", async () => {
    render(<CatalogoProductos busquedaInicial="" />);
    const botones = await screen.findAllByRole("button", { name: "Añadir al carrito" });

    fireEvent.click(botones[0]);

    await waitFor(() => {
      if (db.carrito.length === 0) {
        throw new Error("La API todavía no recibe el ítem");
      }
    });
    expect(db.carrito[0].nombre).toBe("Corte de cabello");
  });

  it("si la API no responde bien, muestra la lista vacía sin romperse", async () => {
    window.fetch.and.returnValue(Promise.resolve({ ok: false, json: async () => null }));
    render(<CatalogoProductos busquedaInicial="" />);

    expect(await screen.findByText("No hay resultados para la búsqueda.")).toBeTruthy();
  });
});
