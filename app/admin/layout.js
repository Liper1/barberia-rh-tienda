import ProtegerPanel from "@/components/admin/ProtegerPanel";

export const instant = false;

export default function LayoutAdmin({ children }) {
  return <ProtegerPanel>{children}</ProtegerPanel>;
}
