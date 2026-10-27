import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  obtenerProductosCriticos,
  obtenerProductosPorCategoria,
  obtenerProductosEnOferta,
  filtrarProductos,
} from "@/data/productos";
import { crearApiFalsa } from "../mocks/apiFalsa";
import { productosPrueba } from "../datos-prueba";

describe("data/productos.js (CRUD contra la API simulada)", () => {
  beforeEach(() => {
    crearApiFalsa();
  });

  it("obtenerProductos pide GET /productos a la API y devuelve los 7 servicios", async () => {
    const productos = await obtenerProductos();

    expect(window.fetch).toHaveBeenCalledWith("http://localhost:4000/productos");
    expect(productos.length).toBe(7);
  });

  it("crearProducto hace un POST y la API le asigna un id", async () => {
    const nuevo = await crearProducto({ codigo: "SER-099", nombre: "Corte infantil", categoria: "Cortes", duracion: 25, precio: 4000, precioOferta: null, stock: 10, stockCritico: 2 });

    expect(nuevo.id).toBeTruthy();
    expect(window.fetch.calls.mostRecent().args[1].method).toBe("POST");
    const guardado = await obtenerProductoPorId(nuevo.id);
    expect(guardado.nombre).toBe("Corte infantil");
  });

  it("actualizarProducto hace un PATCH solo con los campos enviados", async () => {
    const actualizado = await actualizarProducto("1", { precio: 5500 });

    expect(window.fetch.calls.mostRecent().args[1].method).toBe("PATCH");
    expect(actualizado.precio).toBe(5500);
    expect(actualizado.nombre).toBe("Corte de cabello");
  });

  it("eliminarProducto hace un DELETE y devuelve false si ya no existe", async () => {
    expect(await eliminarProducto("2")).toBeTrue();
    expect(await obtenerProductoPorId("2")).toBeNull();
    expect(await eliminarProducto("2")).toBeFalse();
  });

  it("obtenerProductosCriticos devuelve los servicios con cupos bajo el cupo crítico", async () => {
    const criticos = await obtenerProductosCriticos();

    const codigos = [];
    criticos.forEach((producto) => {
      expect(producto.stock).toBeLessThanOrEqual(producto.stockCritico);
      codigos.push(producto.codigo);
    });
    expect(codigos).toContain("SER-007");
  });

  it("separa por categoría y lista las ofertas", async () => {
    const barba = await obtenerProductosPorCategoria("Barba");
    const ofertas = await obtenerProductosEnOferta();

    expect(barba.length).toBe(3);
    expect(ofertas.length).toBe(2);
  });

  it("filtrarProductos busca por nombre sin importar mayúsculas y puede ocultar los sin cupos", () => {
    expect(filtrarProductos(productosPrueba, "DEGRADADO", false).length).toBe(1);
    expect(filtrarProductos(productosPrueba, "", true).length).toBe(2);
    expect(filtrarProductos(productosPrueba, "toalla", true).length).toBe(0);
  });
});
