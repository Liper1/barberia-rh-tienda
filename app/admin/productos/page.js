import ListaProductosAdmin from "@/components/admin/ListaProductosAdmin";
import AvisoPanel from "@/components/admin/AvisoPanel";

export const metadata = { title: "Servicios | Panel R&H" };

export const instant = false;

export default async function PaginaProductosAdmin({ searchParams }) {
  const { aviso } = await searchParams;
  return (
    <>
      <AvisoPanel aviso={aviso} />
      <ListaProductosAdmin />
    </>
  );
}
