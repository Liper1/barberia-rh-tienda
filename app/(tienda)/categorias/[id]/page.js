import DetalleCategoria from "@/components/tienda/DetalleCategoria";

export const metadata = { title: "Categoría | Barbería R&H" };

export const instant = false;

export default async function PaginaCategoria({ params }) {
  const { id } = await params;
  return (
    <div className="container py-5">
      <DetalleCategoria id={id} />
    </div>
  );
}
