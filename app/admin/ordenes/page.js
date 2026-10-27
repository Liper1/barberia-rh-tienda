import ListaOrdenes from "@/components/admin/ListaOrdenes";

export const metadata = { title: "Órdenes | Panel R&H" };

export const instant = false;

export default function PaginaOrdenes() {
  return <ListaOrdenes />;
}
