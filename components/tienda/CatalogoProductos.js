"use client";
import { useEffect, useState } from "react";
import { obtenerProductos, filtrarProductos } from "@/data/productos";
import { agregarAlCarrito } from "@/data/carrito";
import BarraBusqueda from "./BarraBusqueda";
import ListaProductos from "./ListaProductos";

export default function CatalogoProductos({ busquedaInicial }) {
  const [productos, setProductos] = useState([]);
  const [textoFiltro, setTextoFiltro] = useState(busquedaInicial);
  const [soloEnStock, setSoloEnStock] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setProductos(await obtenerProductos());
    }
    cargarDatos();
  }, []);

  const visibles = filtrarProductos(productos, textoFiltro, soloEnStock);

  return (
    <>
      <BarraBusqueda
        textoFiltro={textoFiltro}
        onTextoFiltroChange={setTextoFiltro}
        soloEnStock={soloEnStock}
        onSoloEnStockChange={setSoloEnStock}
      />
      <p className="text-body-secondary small">Mostrando {visibles.length} de {productos.length}</p>
      <ListaProductos productos={visibles} onAgregar={agregarAlCarrito} />
    </>
  );
}
