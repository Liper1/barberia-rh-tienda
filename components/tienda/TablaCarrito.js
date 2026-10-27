import { formatearPrecio } from "@/lib/validaciones";

export default function TablaCarrito({ items, onCambiarCantidad, onQuitar }) {
  if (items.length === 0) {
    return <p className="text-body-secondary">Tu carrito está vacío.</p>;
  }

  const filas = [];
  items.forEach((item) => {
    filas.push(
      <tr key={item.id}>
        <td>
          <div className="d-flex align-items-center gap-2">
            <img src={item.imagen} alt="" width="56" height="42" className="d-none d-sm-block" />
            {item.nombre}
          </div>
        </td>
        <td>{formatearPrecio(item.precio)}</td>
        <td>
          <div className="btn-group btn-group-sm" role="group" aria-label={"Cantidad de " + item.nombre}>
            <button type="button" className="btn btn-outline-secondary" aria-label="Restar uno" onClick={() => onCambiarCantidad(item.id, item.cantidad - 1)}>
              -
            </button>
            <span className="btn btn-outline-secondary disabled">{item.cantidad}</span>
            <button type="button" className="btn btn-outline-secondary" aria-label="Sumar uno" onClick={() => onCambiarCantidad(item.id, item.cantidad + 1)}>
              +
            </button>
          </div>
        </td>
        <td>{formatearPrecio(item.precio * item.cantidad)}</td>
        <td>
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onQuitar(item.id)}>
            Eliminar
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Servicio</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filas}
        </tbody>
      </table>
    </div>
  );
}
