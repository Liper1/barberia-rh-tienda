import EditarProducto from "@/components/admin/EditarProducto";

export const metadata = { title: "Editar servicio | Panel R&H" };

export const instant = false;

export default async function PaginaEditarProducto({ params }) {
  const { id } = await params;
  return <EditarProducto id={id} />;
}
