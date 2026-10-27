import { render, screen, fireEvent } from "@testing-library/react";
import BarraBusqueda from "@/components/tienda/BarraBusqueda";

describe("BarraBusqueda (eventos)", () => {
  it("avisa el texto escrito con onTextoFiltroChange", () => {
    const onTexto = jasmine.createSpy("onTextoFiltroChange");
    render(<BarraBusqueda textoFiltro="" onTextoFiltroChange={onTexto} soloEnStock={false} onSoloEnStockChange={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("Buscar servicio..."), { target: { value: "cera" } });

    expect(onTexto).toHaveBeenCalledWith("cera");
  });

  it("avisa el cambio del checkbox con onSoloEnStockChange", () => {
    const onSoloEnStock = jasmine.createSpy("onSoloEnStockChange");
    render(<BarraBusqueda textoFiltro="" onTextoFiltroChange={() => {}} soloEnStock={false} onSoloEnStockChange={onSoloEnStock} />);

    fireEvent.click(screen.getByLabelText("Sólo con cupos"));

    expect(onSoloEnStock).toHaveBeenCalledWith(true);
  });

  it("muestra los valores que recibe por props", () => {
    render(<BarraBusqueda textoFiltro="navaja" onTextoFiltroChange={() => {}} soloEnStock={true} onSoloEnStockChange={() => {}} />);

    expect(screen.getByPlaceholderText("Buscar servicio...").value).toBe("navaja");
    expect(screen.getByLabelText("Sólo con cupos").checked).toBeTrue();
  });
});
