import { formatearPrecio } from "@/lib/validaciones";

export default function Precio({ producto }) {
  if (producto.precioOferta !== null) {
    return (
      <p className="mb-2">
        <span className="precio-antes me-2">{formatearPrecio(producto.precio)}</span>
        <span className="precio-oferta fs-5">{formatearPrecio(producto.precioOferta)}</span>
      </p>
    );
  }
  return <p className="mb-2 fw-bold fs-5">{formatearPrecio(producto.precio)}</p>;
}
