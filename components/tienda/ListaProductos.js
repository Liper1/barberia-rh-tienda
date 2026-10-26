import TarjetaProducto from "./TarjetaProducto";

export default function ListaProductos({ productos, onAgregar }) {
  if (productos.length === 0) {
    return <p className="text-body-secondary">No hay resultados para la búsqueda.</p>;
  }

  const tarjetas = [];
  productos.forEach((producto) => {
    tarjetas.push(
      <div className="col" key={producto.id}>
        <TarjetaProducto producto={producto} onAgregar={onAgregar} />
      </div>
    );
  });
  return <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">{tarjetas}</div>;
}
