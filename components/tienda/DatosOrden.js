import { formatearPrecio } from "@/lib/validaciones";

export default function DatosOrden({ orden }) {
  const c = orden.cliente;

  const filas = [];
  orden.items.forEach((item) => {
    filas.push(
      <tr key={item.productoId}>
        <td>{item.nombre}</td>
        <td>{formatearPrecio(item.precio)}</td>
        <td>{item.cantidad}</td>
        <td>{formatearPrecio(item.precio * item.cantidad)}</td>
      </tr>
    );
  });

  return (
    <>
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6">
          <h2 className="h5">Datos del cliente</h2>
          <p className="mb-1">{c.nombre} {c.apellidos}</p>
          <p className="mb-0">{c.correo}</p>
        </div>
        <div className="col-12 col-md-6">
          <h2 className="h5">Dirección</h2>
          <p className="mb-1">{c.calle}{c.departamento ? ", " + c.departamento : ""}</p>
          <p className="mb-1">{c.comuna}, {c.region}</p>
          {c.indicaciones && <p className="mb-0">Comentario: {c.indicaciones}</p>}
        </div>
      </div>
      <h2 className="h5">Detalle de la compra</h2>
      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {filas}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="3" className="text-end">Total</th>
              <th>{formatearPrecio(orden.total)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
