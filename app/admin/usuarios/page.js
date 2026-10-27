import ListaUsuarios from "@/components/admin/ListaUsuarios";
import AvisoPanel from "@/components/admin/AvisoPanel";
import SoloAdministrador from "@/components/admin/SoloAdministrador";

export const metadata = { title: "Usuarios | Panel R&H" };

export const instant = false;

export default async function PaginaUsuarios({ searchParams }) {
  const { aviso } = await searchParams;
  return (
    <SoloAdministrador>
      <AvisoPanel aviso={aviso} />
      <ListaUsuarios />
    </SoloAdministrador>
  );
}
