import BoletaOrden from "@/components/admin/BoletaOrden";

export const metadata = { title: "Boleta | Panel R&H" };

export const instant = false;

export default async function PaginaBoleta({ params }) {
  const { id } = await params;
  return <BoletaOrden id={id} />;
}
