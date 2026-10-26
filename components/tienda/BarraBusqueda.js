export default function BarraBusqueda({ textoFiltro, onTextoFiltroChange, soloEnStock, onSoloEnStockChange }) {
  return (
    <form className="row g-2 align-items-center mb-4" onSubmit={(e) => e.preventDefault()}>
      <div className="col-12 col-md-6">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar servicio..."
          aria-label="Buscar servicio"
          value={textoFiltro}
          onChange={(e) => onTextoFiltroChange(e.target.value)}
        />
      </div>
      <div className="col-12 col-md-6">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="soloEnStock"
            checked={soloEnStock}
            onChange={(e) => onSoloEnStockChange(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="soloEnStock">
            Sólo con cupos
          </label>
        </div>
      </div>
    </form>
  );
}
