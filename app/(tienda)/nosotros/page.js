export const metadata = { title: "Nosotros | Barbería R&H" };

const equipo = [
  { imagen: "/img/equipo1.jpg", nombre: "Equipo de corte", detalle: "Cortes clásicos y degradados" },
  { imagen: "/img/equipo2.jpg", nombre: "Equipo de barba", detalle: "Perfilado y afeitado con navaja" },
  { imagen: "/img/equipo3.jpg", nombre: "Equipo de tratamientos", detalle: "Toalla caliente y limpieza facial" },
];

export const instant = false;

export default function Nosotros() {
  const personas = [];
  equipo.forEach((persona) => {
    personas.push(
      <div className="col" key={persona.imagen}>
        <img src={persona.imagen} alt={persona.nombre} className="img-fluid w-100 mb-2" />
        <h3 className="h6 mb-0">{persona.nombre}</h3>
        <p className="small text-body-secondary">{persona.detalle}</p>
      </div>
    );
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4">Nosotros</h1>
      <div className="row align-items-center g-4 mb-5">
        <div className="col-12 col-md-6">
          <p>
            Barbería R&amp;H nació como un local de barrio donde se atiende con hora y sin apuro. Ahora los cortes, el arreglo
            de barba y los tratamientos se pueden pagar en línea y agendar con el número de orden.
          </p>
          <p>
            Esta tienda online continúa el sistema de agenda de la barbería del semestre anterior y suma el catálogo de
            servicios, el carrito de compras y el panel de administración.
          </p>
          <p className="mb-0">
            Cada servicio tiene cupos semanales, así que siempre sabes si alcanzas a atenderte esta semana.
          </p>
        </div>
        <div className="col-12 col-md-6">
          <img src="/img/nosotros.jpg" alt="Interior de la Barbería R&H" className="img-fluid w-100" />
        </div>
      </div>
      <h2 className="mb-4">Nuestro equipo</h2>
      <div className="row row-cols-1 row-cols-sm-3 g-4 mb-5">
        {personas}
      </div>
      <h2 className="mb-3">Visítanos</h2>
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <p className="fw-bold mb-1">Dirección</p>
          <p>Av. Libertador Bernardo O&apos;Higgins 1234, Santiago</p>
        </div>
        <div className="col-12 col-md-6">
          <p className="fw-bold mb-1">Horario</p>
          <p className="mb-0">Lunes a viernes: 10:00 a 20:00</p>
          <p className="mb-0">Sábado: 10:00 a 18:00</p>
          <p>Domingo: cerrado</p>
        </div>
      </div>
    </div>
  );
}
