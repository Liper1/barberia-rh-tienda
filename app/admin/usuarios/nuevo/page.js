import NuevoUsuario from "@/components/admin/NuevoUsuario";
import SoloAdministrador from "@/components/admin/SoloAdministrador";

export const metadata = { title: "Nuevo usuario | Panel R&H" };

export const instant = false;

export default function PaginaNuevoUsuario() {
  return (
    <SoloAdministrador>
      <NuevoUsuario />
    </SoloAdministrador>
  );
}
