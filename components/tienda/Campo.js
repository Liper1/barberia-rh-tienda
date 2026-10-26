export default function Campo({ etiqueta, nombre, valor, onChange, error, tipo = "text", placeholder = "" }) {
  return (
    <div className="mb-3">
      <label htmlFor={nombre} className="form-label">
        {etiqueta}
      </label>
      <input
        id={nombre}
        name={nombre}
        type={tipo}
        className={"form-control" + (error ? " is-invalid" : "")}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onChange(nombre, e.target.value)}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
