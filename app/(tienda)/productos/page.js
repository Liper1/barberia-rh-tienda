import CatalogoProductos from "@/components/tienda/CatalogoProductos";

export const metadata = { title: "Servicios | Barbería R&H" };

export const instant = false;

export default async function Productos({ searchParams }) {
  const { buscar } = await searchParams;
  return (
    <div className="container py-5">
      <h1 className="mb-4">Servicios</h1>
      <CatalogoProductos busquedaInicial={buscar || ""} />
    </div>
  );
}
