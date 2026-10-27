import ListaCategorias from "@/components/admin/ListaCategorias";
import AvisoPanel from "@/components/admin/AvisoPanel";
import SoloAdministrador from "@/components/admin/SoloAdministrador";

export const metadata = { title: "Categorías | Panel R&H" };

export const instant = false;

export default async function PaginaCategorias({ searchParams }) {
  const { aviso } = await searchParams;
  return (
    <SoloAdministrador>
      <AvisoPanel aviso={aviso} />
      <ListaCategorias />
    </SoloAdministrador>
  );
}
