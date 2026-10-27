import { render, screen, fireEvent } from "@testing-library/react";
import TarjetaProducto from "@/components/tienda/TarjetaProducto";
import { productosPrueba } from "../datos-prueba";

describe("TarjetaProducto (props y eventos)", () => {
  const enOferta = productosPrueba[0];
  const servicioSinCupos = productosPrueba[2];

  it("al hacer clic en 'Añadir al carrito' entrega el producto a onAgregar", () => {
    const onAgregar = jasmine.createSpy("onAgregar");
    render(<TarjetaProducto producto={enOferta} onAgregar={onAgregar} />);

    fireEvent.click(screen.getByRole("button", { name: "Añadir al carrito" }));

    expect(onAgregar).toHaveBeenCalledOnceWith(enOferta);
  });

  it("muestra la etiqueta Oferta y el precio tachado cuando hay precio de oferta", () => {
    render(<TarjetaProducto producto={enOferta} onAgregar={() => {}} />);

    expect(screen.getByText("Oferta")).toBeTruthy();
    expect(screen.getByText("$8.000").classList.contains("precio-antes")).toBeTrue();
    expect(screen.getByText("$7.000").classList.contains("precio-oferta")).toBeTrue();
  });

  it("si es un servicio sin cupos, deshabilita el botón y dice Sin cupos", () => {
    render(<TarjetaProducto producto={servicioSinCupos} onAgregar={() => {}} />);

    const boton = screen.getByRole("button", { name: "Sin cupos" });
    expect(boton.disabled).toBeTrue();
    expect(screen.getByText("Tratamientos · 30 min")).toBeTruthy();
    expect(screen.queryByText("Oferta")).toBeNull();
  });

  it("enlaza la imagen y el nombre al detalle del producto", () => {
    render(<TarjetaProducto producto={enOferta} onAgregar={() => {}} />);

    const enlaces = screen.getAllByRole("link");
    enlaces.forEach((enlace) => {
      expect(enlace.getAttribute("href")).toBe("/productos/1");
    });
  });
});
