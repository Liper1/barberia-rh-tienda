import ReporteVentas from "@/components/admin/ReporteVentas";
import SoloAdministrador from "@/components/admin/SoloAdministrador";

export const metadata = { title: "Reportes | Panel R&H" };

export const instant = false;

export default function PaginaReportes() {
  return (
    <SoloAdministrador>
      <ReporteVentas />
    </SoloAdministrador>
  );
}
