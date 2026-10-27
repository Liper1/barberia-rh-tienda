"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerCategorias } from "@/data/categorias";
import { obtenerCarrito, calcularTotal, contarUnidades } from "@/data/carrito";
import { obtenerSesion, cerrarSesion, puedeEntrarAlPanel } from "@/data/sesion";
import { formatearPrecio } from "@/lib/validaciones";
import { apiDisponible } from "@/data/api";

export default function BarraNavegacion() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [sesion, setSesion] = useState(null);
  const [sinApi, setSinApi] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setSinApi(!(await apiDisponible()));
      setCategorias(await obtenerCategorias());
      setCarrito(await obtenerCarrito());
      setSesion(await obtenerSesion());
    }
    cargarDatos();

    async function leerCarrito() {
      setCarrito(await obtenerCarrito());
    }
    async function leerSesion() {
      setSesion(await obtenerSesion());
    }
    window.addEventListener("cambio-carrito", leerCarrito);
    window.addEventListener("cambio-sesion", leerSesion);

    return () => {
      window.removeEventListener("cambio-carrito", leerCarrito);
      window.removeEventListener("cambio-sesion", leerSesion);
    };
  }, []);

  function cerrarMenus() {
    setMenuAbierto(false);
    setCategoriasAbiertas(false);
  }

  async function salir() {
    await cerrarSesion();
    window.location.href = "/";
  }

  const itemsCategorias = [];
  categorias.forEach((categoria) => {
    itemsCategorias.push(
      <li key={categoria.id}>
        <Link href={"/categorias/" + categoria.id} className="dropdown-item" onClick={cerrarMenus}>
          {categoria.nombre}
        </Link>
      </li>
    );
  });

  return (
    <>
      {sinApi && (
        <div className="alert alert-danger rounded-0 mb-0 text-center" role="alert">
          No se pudo conectar con la API. Revisa que esté corriendo <strong>npm run api</strong>.
        </div>
      )}
      <nav className="navbar navbar-expand-xl barra-tienda sticky-top" data-bs-theme="dark">
        <div className="container-fluid px-3 px-xl-4">
          <Link href="/" className="navbar-brand logo-marca" onClick={cerrarMenus}>
            Barbería <span>R&amp;H</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={"collapse navbar-collapse" + (menuAbierto ? " show" : "")}>
            <ul className="navbar-nav me-auto mb-2 mb-xl-0">
              <li className="nav-item">
                <Link href="/" className="nav-link" onClick={cerrarMenus}>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link href="/productos" className="nav-link" onClick={cerrarMenus}>Servicios</Link>
              </li>
              <li className="nav-item dropdown">
                <button
                  type="button"
                  className="nav-link dropdown-toggle btn btn-link"
                  aria-expanded={categoriasAbiertas}
                  onClick={() => setCategoriasAbiertas(!categoriasAbiertas)}
                >
                  Categorías
                </button>
                <ul className={"dropdown-menu" + (categoriasAbiertas ? " show" : "")}>
                  <li>
                    <Link href="/categorias" className="dropdown-item" onClick={cerrarMenus}>
                      Todas las categorías
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  {itemsCategorias}
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/ofertas" className="nav-link" onClick={cerrarMenus}>Ofertas</Link>
              </li>
              <li className="nav-item">
                <Link href="/nosotros" className="nav-link" onClick={cerrarMenus}>Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link href="/blogs" className="nav-link" onClick={cerrarMenus}>Blog</Link>
              </li>
              <li className="nav-item">
                <Link href="/contacto" className="nav-link" onClick={cerrarMenus}>Contacto</Link>
              </li>
            </ul>
            <form className="d-flex mb-2 mb-xl-0 me-xl-3" role="search" action="/productos">
              <input className="form-control form-control-sm me-2" type="search" name="buscar" placeholder="Buscar" aria-label="Buscar" />
              <button className="btn btn-sm btn-outline-light" type="submit">
                Buscar
              </button>
            </form>
            <div className="d-flex flex-wrap flex-xl-nowrap gap-2 align-items-center">
              <Link href="/carrito" className="btn btn-sm btn-dorado" onClick={cerrarMenus}>
                Carrito ({contarUnidades(carrito)}) {formatearPrecio(calcularTotal(carrito))}
              </Link>
              {sesion === null ? (
                <>
                  <Link href="/login" className="btn btn-sm btn-outline-light" onClick={cerrarMenus}>
                    Iniciar sesión
                  </Link>
                  <Link href="/registro" className="btn btn-sm btn-primary" onClick={cerrarMenus}>
                    Crear cuenta
                  </Link>
                </>
              ) : (
                <>
                  {puedeEntrarAlPanel(sesion) && (
                    <Link href="/admin" className="btn btn-sm btn-outline-light">
                      Panel
                    </Link>
                  )}
                  <span className="text-light small">Hola, {sesion.nombre}</span>
                  <button type="button" className="btn btn-sm btn-outline-light" onClick={salir}>
                    Salir
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
