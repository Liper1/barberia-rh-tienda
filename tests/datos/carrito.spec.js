import { obtenerCarrito, agregarAlCarrito, quitarServicioDelCarrito, cambiarCantidad, quitarDelCarrito, calcularTotal, contarUnidades, vaciarCarrito } from "@/data/carrito";
import { crearApiFalsa } from "../mocks/apiFalsa";
import { productosPrueba } from "../datos-prueba";

describe("data/carrito.js (carrito guardado en la API)", () => {
  const degradado = productosPrueba[0];
  const barba = productosPrueba[1];
  const sinCupos = productosPrueba[2];

  beforeEach(() => {
    crearApiFalsa();
  });

  it("agrega un ítem nuevo con el precio de oferta y cantidad 1", async () => {
    const carrito = await agregarAlCarrito(degradado);

    expect(carrito.length).toBe(1);
    expect(carrito[0].productoId).toBe(degradado.id);
    expect(carrito[0].precio).toBe(7000);
    expect(carrito[0].cantidad).toBe(1);
  });

  it("si ya está en el carrito, suma uno a la cantidad", async () => {
    await agregarAlCarrito(barba);
    const carrito = await agregarAlCarrito(barba);

    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(2);
  });

  it("no deja pasar de los cupos ni agregar servicios sin cupos", async () => {
    for (let i = 0; i < 5; i++) {
      await agregarAlCarrito(barba);
    }
    const carrito = await agregarAlCarrito(sinCupos);

    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(barba.stock);
  });

  it("calcula total y unidades, y quita el ítem cuando la cantidad llega a 0", async () => {
    await agregarAlCarrito(degradado);
    let carrito = await agregarAlCarrito(barba);
    carrito = await cambiarCantidad(carrito[0].id, 3);

    expect(contarUnidades(carrito)).toBe(4);
    expect(calcularTotal(carrito)).toBe(7000 * 3 + 4500);

    carrito = await quitarDelCarrito(carrito[1].id);
    expect(carrito.length).toBe(1);

    await quitarServicioDelCarrito(degradado.id);
    expect((await obtenerCarrito()).length).toBe(0);
    expect(carrito[0].productoId).toBe(degradado.id);
  });

  it("vaciarCarrito deja la lista vacía y avisa el cambio a la barra", async () => {
    spyOn(window, "dispatchEvent");
    await agregarAlCarrito(degradado);

    expect(await vaciarCarrito()).toEqual([]);
    expect(await obtenerCarrito()).toEqual([]);
    expect(window.dispatchEvent.calls.mostRecent().args[0].type).toBe("cambio-carrito");
  });
});
