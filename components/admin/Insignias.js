export function InsigniaEstado({ estado }) {
  let color = "secondary";
  if (estado === "Pagada") color = "success";
  if (estado === "Atendida") color = "primary";
  if (estado === "Rechazada") color = "danger";
  return <span className={"badge text-bg-" + color}>{estado}</span>;
}

export function InsigniaTipo({ tipo }) {
  let color = "secondary";
  if (tipo === "Administrador") color = "dark";
  if (tipo === "Vendedor") color = "warning";
  return <span className={"badge text-bg-" + color}>{tipo}</span>;
}
