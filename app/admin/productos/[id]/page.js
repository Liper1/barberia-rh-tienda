import DetalleProductoAdmin from "@/components/admin/DetalleProductoAdmin";

export const metadata = { title: "Servicio | Panel R&H" };

export const instant = false;

export default async function PaginaProductoAdmin({ params }) {
  const { id } = await params;
  return <DetalleProductoAdmin id={id} />;
}
