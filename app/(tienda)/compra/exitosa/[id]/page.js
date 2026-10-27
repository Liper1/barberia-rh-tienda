import CompraExitosa from "@/components/tienda/CompraExitosa";

export const metadata = { title: "Compra exitosa | Barbería R&H" };

export const instant = false;

export default async function PaginaCompraExitosa({ params }) {
  const { id } = await params;
  return (
    <div className="container py-5">
      <CompraExitosa id={id} />
    </div>
  );
}
