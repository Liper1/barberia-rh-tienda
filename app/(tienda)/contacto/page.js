import FormularioContacto from "@/components/tienda/FormularioContacto";

export const metadata = { title: "Contacto | Barbería R&H" };

export const instant = false;

export default function Contacto() {
  return (
    <div className="container py-5">
      <div className="col-12 col-md-10 col-lg-6 mx-auto">
        <h1 className="mb-2">Contacto</h1>
        <p className="text-body-secondary mb-4">¿Tienes dudas sobre un servicio o una compra? Escríbenos.</p>
        <FormularioContacto />
      </div>
    </div>
  );
}
