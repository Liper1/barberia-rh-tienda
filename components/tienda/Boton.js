export default function Boton({ etiqueta, onClick, variante = "primary", tipo = "button", deshabilitado = false, chico = false }) {
  const clases = "btn btn-" + variante + (chico ? " btn-sm" : "");
  return (
    <button type={tipo} className={clases} onClick={onClick} disabled={deshabilitado}>
      {etiqueta}
    </button>
  );
}
