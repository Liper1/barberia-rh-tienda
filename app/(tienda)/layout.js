import BarraNavegacion from "@/components/tienda/BarraNavegacion";
import PiePagina from "@/components/tienda/PiePagina";

export default function LayoutTienda({ children }) {
  return (
    <>
      <BarraNavegacion />
      <main>{children}</main>
      <PiePagina />
    </>
  );
}
