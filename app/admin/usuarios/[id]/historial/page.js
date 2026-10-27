import HistorialUsuario from "@/components/admin/HistorialUsuario";
import SoloAdministrador from "@/components/admin/SoloAdministrador";

export const metadata = { title: "Historial de compras | Panel R&H" };

export const instant = false;

export default async function PaginaHistorial({ params }) {
  const { id } = await params;
  return (
    <SoloAdministrador>
      <HistorialUsuario id={id} />
    </SoloAdministrador>
  );
}
