import { totalVendido, contarPorEstado, productosMasVendidos, ventasPorRegion, resumenPorCategoria, porcentaje } from "@/lib/reportes";
import datos from "../mocks/datos-iniciales.json";

describe("lib/reportes.js (cálculos del panel)", () => {
  const rechazada = { id: 10003, estado: "Rechazada", cliente: { region: "Biobío" }, items: [{ productoId: "2", nombre: "Corte degradado", cantidad: 5 }], total: 35000 };
  const ordenes = datos.ordenes.concat([rechazada]);

  it("el total vendido no cuenta las órdenes rechazadas", () => {
    expect(totalVendido(ordenes)).toBe(11500 + 25980);
    expect(contarPorEstado(ordenes)).toEqual({ Pagada: 1, Atendida: 1, Rechazada: 1 });
  });

  it("ordena los productos más vendidos por unidades", () => {
    const top = productosMasVendidos(ordenes, 2);

    expect(top.length).toBe(2);
    expect(top[0]).toEqual({ id: "3", nombre: "Corte + barba", unidades: 2 });
  });

  it("agrupa las ventas por región de mayor a menor", () => {
    const regiones = ventasPorRegion(ordenes);

    expect(regiones[0].region).toBe("Biobío");
    expect(regiones[1].region).toBe("Valparaíso");
    expect(regiones[0].total).toBe(25980);
  });

  it("resume el inventario por categoría y calcula el porcentaje de las barras", () => {
    const resumen = resumenPorCategoria(datos.productos, datos.categorias);
    const barba = resumen[1];

    expect(resumen.length).toBe(3);
    expect(barba.categoria).toBe("Barba");
    expect(barba.cantidad).toBe(3);
    expect(barba.valor).toBe(4500 * 35 + 6000 * 4 + 5500 * 25);
    expect(porcentaje(25, 200)).toBe(13);
    expect(porcentaje(5, 0)).toBe(0);
  });
});
