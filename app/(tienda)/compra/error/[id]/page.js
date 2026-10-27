import CompraError from "@/components/tienda/CompraError";

export const metadata = { title: "Pago con error | Barbería R&H" };

export const instant = false;

export default async function PaginaCompraError({ params }) {
  const { id } = await params;
  return (
    <div className="container py-5">
      <CompraError id={id} />
    </div>
  );
}
