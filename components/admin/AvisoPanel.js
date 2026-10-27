const AVISOS = {
  "producto-creado": "Servicio creado correctamente.",
  "producto-editado": "Servicio actualizado correctamente.",
  "categoria-creada": "Categoría creada correctamente.",
  "categoria-editada": "Categoría actualizada correctamente.",
  "usuario-creado": "Usuario creado correctamente.",
  "usuario-editado": "Usuario actualizado correctamente.",
};

export default function AvisoPanel({ aviso }) {
  if (!aviso || !AVISOS[aviso]) {
    return null;
  }
  return (
    <div className="alert alert-success" role="alert">
      {AVISOS[aviso]}
    </div>
  );
}
