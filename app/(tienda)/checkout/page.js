"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerUsuarioPorId } from "@/data/usuarios";
import { revisarStock, crearOrden } from "@/data/ordenes";
import { obtenerCarrito, vaciarCarrito, calcularTotal } from "@/data/carrito";
import { obtenerSesion } from "@/data/sesion";
import { pagoAprobado, formatearPrecio } from "@/lib/validaciones";
import FormularioCheckout from "@/components/tienda/FormularioCheckout";
import MensajeError from "@/components/tienda/MensajeError";

export default function Checkout() {
  const [carrito, setCarrito] = useState([]);
  const [sesion, setSesion] = useState(null);
  const [datosIniciales, setDatosIniciales] = useState(null);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      setCarrito(await obtenerCarrito());
      const sesionActual = await obtenerSesion();
      setSesion(sesionActual);
      if (sesionActual !== null) {
        const usuario = await obtenerUsuarioPorId(sesionActual.id);
        if (usuario !== null) {
          setDatosIniciales({
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            correo: usuario.correo,
            region: usuario.region,
            comuna: usuario.comuna,
            calle: usuario.direccion,
          });
          return;
        }
      }
      setDatosIniciales({});
    }
    cargarDatos();
  }, []);

  async function confirmar(datos) {
    setProcesando(true);
    const clienteSinTarjeta = {
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      correo: datos.correo,
      region: datos.region,
      comuna: datos.comuna,
      calle: datos.calle,
      departamento: datos.departamento,
      indicaciones: datos.indicaciones,
    };
    const faltantes = await revisarStock(carrito);
    let motivo = "";
    if (faltantes.length > 0) {
      let nombres = "";
      faltantes.forEach((nombre) => {
        nombres = nombres === "" ? nombre : nombres + ", " + nombre;
      });
      motivo = "No quedan cupos suficientes de: " + nombres + ".";
    } else if (!pagoAprobado(datos.tarjeta)) {
      motivo = "El banco rechazó la tarjeta.";
    }
    const aprobado = motivo === "";
    const orden = await crearOrden(clienteSinTarjeta, carrito, sesion !== null ? sesion.id : null, aprobado, motivo);
    if (orden === null) {
      setProcesando(false);
      setError("No se pudo registrar la compra. Revisa que la API esté funcionando e intenta de nuevo.");
      return;
    }
    if (aprobado) {
      await vaciarCarrito();
      window.location.href = "/compra/exitosa/" + orden.id;
    } else {
      window.location.href = "/compra/error/" + orden.id;
    }
  }

  if (procesando) {
    return <div className="container py-5"><p>Procesando el pago...</p></div>;
  }

  if (datosIniciales === null) {
    return <div className="container py-5"><p>Cargando...</p></div>;
  }

  if (carrito.length === 0) {
    return (
      <div className="container py-5">
        <h1>Checkout</h1>
        <p>Tu carrito está vacío. <Link href="/productos">Ver servicios</Link></p>
      </div>
    );
  }

  const lineas = [];
  carrito.forEach((item) => {
    lineas.push(
      <li className="list-group-item d-flex justify-content-between" key={item.id}>
        <span>{item.nombre} x {item.cantidad}</span>
        <span>{formatearPrecio(item.precio * item.cantidad)}</span>
      </li>
    );
  });

  return (
    <div className="container py-5">
      <h1 className="mb-4">Checkout</h1>
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <MensajeError mensaje={error} />
          <FormularioCheckout datosIniciales={datosIniciales} onConfirmar={confirmar} />
        </div>
        <div className="col-12 col-lg-5">
          <h2 className="h5">Resumen del carrito</h2>
          <ul className="list-group mb-3">
            {lineas}
            <li className="list-group-item d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>{formatearPrecio(calcularTotal(carrito))}</span>
            </li>
          </ul>
          <Link href="/carrito">Modificar carrito</Link>
        </div>
      </div>
    </div>
  );
}
