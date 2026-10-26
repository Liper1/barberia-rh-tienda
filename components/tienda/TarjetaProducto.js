import Link from "next/link";
import Precio from "./Precio";
import Boton from "./Boton";

export default function TarjetaProducto({ producto, onAgregar }) {
  const sinStock = producto.stock <= 0;
  return (
    <div className="card h-100 tarjeta-producto position-relative">
      {producto.precioOferta !== null && <span className="badge text-bg-warning etiqueta-oferta">Oferta</span>}
      <Link href={"/productos/" + producto.id}>
        <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
      </Link>
      <div className="card-body d-flex flex-column">
        <small className="text-body-secondary">
          {producto.categoria}
          {" · " + producto.duracion + " min"}
        </small>
        <h3 className="h6 card-title">
          <Link href={"/productos/" + producto.id} className="text-reset text-decoration-none">
            {producto.nombre}
          </Link>
        </h3>
        <Precio producto={producto} />
        <div className="mt-auto">
          <Boton
            etiqueta={sinStock ? "Sin cupos" : "Añadir al carrito"}
            onClick={() => onAgregar(producto)}
            deshabilitado={sinStock}
            chico
          />
        </div>
      </div>
    </div>
  );
}
