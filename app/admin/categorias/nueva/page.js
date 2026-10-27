import NuevaCategoria from "@/components/admin/NuevaCategoria";
import SoloAdministrador from "@/components/admin/SoloAdministrador";

export const metadata = { title: "Nueva categoría | Panel R&H" };

export const instant = false;

export default function PaginaNuevaCategoria() {
  return (
    <SoloAdministrador>
      <NuevaCategoria />
    </SoloAdministrador>
  );
}
