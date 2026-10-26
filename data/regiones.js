export const regiones = [
  { nombre: "Región Metropolitana", comunas: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "La Florida", "Puente Alto"] },
  { nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"] },
  { nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel"] },
  { nombre: "Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"] },
  { nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro", "Puerto Varas"] },
];

export function comunasDeRegion(nombreRegion) {
  let comunas = [];
  regiones.forEach((region) => {
    if (region.nombre === nombreRegion) {
      comunas = region.comunas;
    }
  });
  return comunas;
}
