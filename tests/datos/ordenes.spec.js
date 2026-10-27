import { crearOrden, revisarStock, obtenerOrdenes, obtenerOrdenesPorUsuario, actualizarOrden } from "@/data/ordenes";
import { obtenerProductoPorId, actualizarProducto } from "@/data/productos";
import { crearApiFalsa } from "../mocks/apiFalsa";

describe("data/ordenes.js (compra contra la API)", () => {
  const cliente = { nombre: "Ana", apellidos: "Pérez", correo: "ana@gmail.com", region: "Biobío", comuna: "Concepción", calle: "Calle 1", departamento: "", indicaciones: "" };

  beforeEach(() => {
    crearApiFalsa();
  });

  it("revisarStock avisa los servicios que no tienen cupos suficientes", async () => {
    const carrito = [
      { id: "c1", productoId: "1", nombre: "Corte de cabello", precio: 5000, cantidad: 2 },
      { id: "c2", productoId: "7", nombre: "Toalla caliente y limpieza facial", precio: 8000, cantidad: 1 },
    ];

    expect(await revisarStock(carrito)).toEqual(["Toalla caliente y limpieza facial"]);
  });

  it("una compra aprobada queda Pagada, con el número siguiente, y descuenta cupos y stock", async () => {
    const cuposAntes = (await obtenerProductoPorId("1")).stock;
    const carrito = [{ id: "c1", productoId: "1", nombre: "Corte de cabello", precio: 5000, cantidad: 2 }];

    const orden = await crearOrden(cliente, carrito, "3", true);

    expect(orden.estado).toBe("Pagada");
    expect(orden.numero).toBe(10003);
    expect(orden.total).toBe(10000);
    expect((await obtenerProductoPorId("1")).stock).toBe(cuposAntes - 2);
    expect((await obtenerOrdenes()).length).toBe(3);
  });

  it("una compra rechazada queda Rechazada y no toca los cupos", async () => {
    const cuposAntes = (await obtenerProductoPorId("2")).stock;

    const orden = await crearOrden(cliente, [{ id: "c1", productoId: "2", nombre: "Corte degradado", precio: 7000, cantidad: 1 }], null, false, "El banco rechazó la tarjeta.");

    expect(orden.estado).toBe("Rechazada");
    expect(orden.motivo).toBe("El banco rechazó la tarjeta.");
    expect((await obtenerProductoPorId("2")).stock).toBe(cuposAntes);
  });

  it("filtra el historial por usuario y permite cambiar el estado", async () => {
    const historial = await obtenerOrdenesPorUsuario("3");
    expect(historial.length).toBe(1);
    expect(historial[0].numero).toBe(10001);

    const actualizada = await actualizarOrden("10002", { estado: "Atendida" });
    expect(actualizada.estado).toBe("Atendida");
  });

  it("al rechazar una orden se devuelven los cupos, al reactivarla se descuentan y no deja reactivarla sin cupos", async () => {
    const cuposAntes = (await obtenerProductoPorId("3")).stock;

    await actualizarOrden("10002", { estado: "Rechazada" });
    expect((await obtenerProductoPorId("3")).stock).toBe(cuposAntes + 2);

    await actualizarOrden("10002", { estado: "Pagada" });
    expect((await obtenerProductoPorId("3")).stock).toBe(cuposAntes);

    await actualizarOrden("10002", { estado: "Rechazada" });
    await actualizarProducto("7", { stock: 0 });
    expect(await actualizarOrden("10002", { estado: "Pagada" })).toBeNull();
  });
});
