import { regiones, comunasDeRegion } from "@/data/regiones";

export default function SelectorRegionComuna({ region, comuna, errorRegion, errorComuna, onChange }) {
  function cambiarRegion(e) {
    onChange("region", e.target.value);
  }

  const opcionesRegiones = [];
  regiones.forEach((r) => {
    opcionesRegiones.push(<option key={r.nombre} value={r.nombre}>{r.nombre}</option>);
  });
  const opcionesComunas = [];
  comunasDeRegion(region).forEach((c) => {
    opcionesComunas.push(<option key={c} value={c}>{c}</option>);
  });

  return (
    <div className="row">
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor="region" className="form-label">Región</label>
        <select id="region" className={"form-select" + (errorRegion ? " is-invalid" : "")} value={region} onChange={cambiarRegion}>
          <option value="">Selecciona una región</option>
          {opcionesRegiones}
        </select>
        {errorRegion && <div className="invalid-feedback">{errorRegion}</div>}
      </div>
      <div className="col-12 col-md-6 mb-3">
        <label htmlFor="comuna" className="form-label">Comuna</label>
        <select id="comuna" className={"form-select" + (errorComuna ? " is-invalid" : "")} value={comuna} onChange={(e) => onChange("comuna", e.target.value)}>
          <option value="">Selecciona una comuna</option>
          {opcionesComunas}
        </select>
        {errorComuna && <div className="invalid-feedback">{errorComuna}</div>}
      </div>
    </div>
  );
}
