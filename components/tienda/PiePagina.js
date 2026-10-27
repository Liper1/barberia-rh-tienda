import Link from "next/link";

export default function PiePagina() {
  return (
    <footer className="pie-pagina py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-5">
            <p className="logo-marca text-white mb-2">
              Barbería <span style={{ color: "var(--dorado)" }}>R&amp;H</span>
            </p>
            <p className="mb-0">Cortes, barba y tratamientos con pago en línea. Agenda tu hora con tu número de orden.</p>
          </div>
          <div className="col-6 col-md-3">
            <p className="fw-bold text-white mb-2">Tienda</p>
            <ul className="list-unstyled mb-0">
              <li><Link href="/productos">Servicios</Link></li>
              <li><Link href="/categorias">Categorías</Link></li>
              <li><Link href="/ofertas">Ofertas</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <p className="fw-bold text-white mb-2">Barbería</p>
            <ul className="list-unstyled mb-0">
              <li><Link href="/nosotros">Nosotros</Link></li>
              <li><Link href="/blogs">Blog</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>
        </div>
        <p className="small mt-4 mb-0">© 2026 Barbería R&amp;H · Proyecto DSY1104 Desarrollo Fullstack II</p>
      </div>
    </footer>
  );
}
