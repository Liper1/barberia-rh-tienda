import { render, screen, fireEvent } from "@testing-library/react";
import FormularioProducto, { validarProducto } from "@/components/admin/FormularioProducto";
import datosApi from "../mocks/datos-iniciales.json";

describe("FormularioProducto del panel (validación y props)", () => {
  const valido = { codigo: "SER-010", nombre: "Corte infantil", descripcion: "", duracion: "25", precio: "4000", precioOferta: "", stock: "10", stockCritico: "2" };

  it("validarProducto no devuelve errores con datos correctos", () => {
    expect(validarProducto(valido)).toEqual({});
  });

  it("validarProducto rechaza código corto, precio negativo, cupos con decimales y oferta mayor al precio", () => {
    const errores = validarProducto({ ...valido, codigo: "AB", precio: "-1", stock: "2.5" });
    expect(Object.keys(errores).sort()).toEqual(["codigo", "precio", "stock"]);

    const conOferta = validarProducto({ ...valido, precioOferta: "4500" });
    expect(conOferta.precioOferta).toBe("El precio de oferta debe ser menor que el precio.");
  });

  it("al editar, muestra los datos del producto recibido por props", () => {
    const producto = { codigo: "SER-004", nombre: "Arreglo de barba", descripcion: "Recorte y forma", duracion: 20, precio: 4500, precioOferta: null, stock: 35, stockCritico: 8, categoria: "Barba", imagen: "/img/servicios/arreglo-barba.jpg" };
    render(<FormularioProducto productoInicial={producto} categorias={datosApi.categorias} onGuardar={() => {}} />);

    expect(screen.getByLabelText("Código").value).toBe("SER-004");
    expect(screen.getByLabelText("Precio").value).toBe("4500");
    expect(screen.getByLabelText("Duración (minutos)").value).toBe("20");
    expect(screen.getByLabelText("Categoría").value).toBe("Barba");
  });

  it("al guardar entrega los números convertidos y la oferta vacía como null", () => {
    const onGuardar = jasmine.createSpy("onGuardar");
    render(<FormularioProducto categorias={datosApi.categorias} onGuardar={onGuardar} />);

    fireEvent.change(screen.getByLabelText("Código"), { target: { value: "SER-010" } });
    fireEvent.change(screen.getByLabelText("Nombre"), { target: { value: "Corte infantil" } });
    fireEvent.change(screen.getByLabelText("Precio"), { target: { value: "4000" } });
    fireEvent.change(screen.getByLabelText("Cupos de la semana"), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText("Cupo crítico"), { target: { value: "2" } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onGuardar).toHaveBeenCalledTimes(1);
    const datos = onGuardar.calls.mostRecent().args[0];
    expect(datos.precio).toBe(4000);
    expect(datos.stock).toBe(10);
    expect(datos.precioOferta).toBeNull();
    expect(datos.categoria).toBe("Cortes");
    expect(datos.duracion).toBe(30);
  });
});
