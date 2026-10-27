import { render, screen, fireEvent, act } from "@testing-library/react";
import BarraNavegacion from "@/components/tienda/BarraNavegacion";
import { agregarAlCarrito } from "@/data/carrito";
import { crearApiFalsa } from "../mocks/apiFalsa";
import { productosPrueba } from "../datos-prueba";

describe("BarraNavegacion (estado del menú y datos de la API)", () => {
  let db;

  beforeEach(() => {
    db = crearApiFalsa();
  });

  it("el buscador es un formulario que envía ?buscar= a /productos", () => {
    const { container } = render(<BarraNavegacion />);

    const formulario = container.querySelector("form[role=search]");
    expect(formulario.getAttribute("action")).toBe("/productos");
    expect(screen.getByRole("searchbox", { name: "Buscar" }).getAttribute("name")).toBe("buscar");
  });

  it("el botón de menú abre y cierra el menú en celular", () => {
    render(<BarraNavegacion />);
    const boton = screen.getByRole("button", { name: "Abrir menú" });

    fireEvent.click(boton);
    expect(boton.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(boton);
    expect(boton.getAttribute("aria-expanded")).toBe("false");
  });

  it("muestra el nombre y el enlace al panel cuando hay un administrador conectado", async () => {
    db.sesion = { id: "1", nombre: "Felipe", tipo: "Administrador" };
    render(<BarraNavegacion />);

    expect(await screen.findByText("Hola, Felipe")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Panel" }).getAttribute("href")).toBe("/admin");
    expect(screen.queryByRole("link", { name: "Iniciar sesión" })).toBeNull();
  });

  it("muestra las categorías de la API en el menú", async () => {
    render(<BarraNavegacion />);

    expect(await screen.findByRole("link", { name: "Tratamientos" })).toBeTruthy();
  });

  it("actualiza el total cuando se agrega algo al carrito", async () => {
    render(<BarraNavegacion />);
    await screen.findByRole("link", { name: "Cortes" });
    expect(screen.getByRole("link", { name: /Carrito/ }).textContent).toBe("Carrito (0) $0");

    await act(async () => {
      await agregarAlCarrito(productosPrueba[0]);
    });

    expect(await screen.findByRole("link", { name: "Carrito (1) $7.000" })).toBeTruthy();
  });
});
