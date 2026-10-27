import EditarCategoria from "@/components/admin/EditarCategoria";
import SoloAdministrador from "@/components/admin/SoloAdministrador";

export const metadata = { title: "Editar categoría | Panel R&H" };

export const instant = false;

export default async function PaginaEditarCategoria({ params }) {
  const { id } = await params;
  return (
    <SoloAdministrador>
      <EditarCategoria id={id} />
    </SoloAdministrador>
  );
}
