import DetalleProducto from "@/components/tienda/DetalleProducto";

export const instant = false;

export default async function PaginaDetalleProducto({ params }) {
  const { id } = await params;
  return (
    <div className="container py-5">
      <DetalleProducto id={id} />
    </div>
  );
}
