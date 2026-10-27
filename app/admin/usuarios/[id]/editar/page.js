import EditarUsuario from "@/components/admin/EditarUsuario";
import SoloAdministrador from "@/components/admin/SoloAdministrador";

export const metadata = { title: "Editar usuario | Panel R&H" };

export const instant = false;

export default async function PaginaEditarUsuario({ params }) {
  const { id } = await params;
  return (
    <SoloAdministrador>
      <EditarUsuario id={id} />
    </SoloAdministrador>
  );
}
