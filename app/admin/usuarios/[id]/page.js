import DetalleUsuario from "@/components/admin/DetalleUsuario";
import SoloAdministrador from "@/components/admin/SoloAdministrador";

export const metadata = { title: "Usuario | Panel R&H" };

export const instant = false;

export default async function PaginaUsuario({ params }) {
  const { id } = await params;
  return (
    <SoloAdministrador>
      <DetalleUsuario id={id} />
    </SoloAdministrador>
  );
}
