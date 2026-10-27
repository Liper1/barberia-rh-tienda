import DetalleBlog from "@/components/tienda/DetalleBlog";

export const metadata = { title: "Artículo | Barbería R&H" };

export const instant = false;

export default async function PaginaBlog({ params }) {
  const { id } = await params;
  return (
    <div className="container py-5">
      <DetalleBlog id={id} />
    </div>
  );
}
