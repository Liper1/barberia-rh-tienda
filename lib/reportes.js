export function ordenesVendidas(ordenes) {
  const vendidas = [];
  ordenes.forEach((orden) => {
    if (orden.estado === "Pagada" || orden.estado === "Atendida") {
      vendidas.push(orden);
    }
  });
  return vendidas;
}

export function totalVendido(ordenes) {
  let total = 0;
  ordenesVendidas(ordenes).forEach((orden) => {
    total = total + orden.total;
  });
  return total;
}

export function contarPorEstado(ordenes) {
  const cuentas = { Pagada: 0, Atendida: 0, Rechazada: 0 };
  ordenes.forEach((orden) => {
    cuentas[orden.estado] = cuentas[orden.estado] + 1;
  });
  return cuentas;
}

export function productosMasVendidos(ordenes, limite) {
  const ventas = [];
  ordenesVendidas(ordenes).forEach((orden) => {
    orden.items.forEach((item) => {
      let existente = null;
      ventas.forEach((venta) => {
        if (venta.id === item.productoId) {
          existente = venta;
        }
      });
      if (existente !== null) {
        existente.unidades = existente.unidades + item.cantidad;
      } else {
        ventas.push({ id: item.productoId, nombre: item.nombre, unidades: item.cantidad });
      }
    });
  });

  ventas.sort((a, b) => b.unidades - a.unidades);
  const primeros = [];
  ventas.forEach((venta) => {
    if (primeros.length < limite) {
      primeros.push(venta);
    }
  });
  return primeros;
}

export function ventasPorRegion(ordenes) {
  const regiones = [];
  ordenesVendidas(ordenes).forEach((orden) => {
    let existente = null;
    regiones.forEach((r) => {
      if (r.region === orden.cliente.region) {
        existente = r;
      }
    });
    if (existente !== null) {
      existente.ordenes = existente.ordenes + 1;
      existente.total = existente.total + orden.total;
    } else {
      regiones.push({ region: orden.cliente.region, ordenes: 1, total: orden.total });
    }
  });
  regiones.sort((a, b) => b.total - a.total);
  return regiones;
}

export function resumenPorCategoria(productos, categorias) {
  const resumen = [];
  categorias.forEach((categoria) => {
    let cantidad = 0;
    let unidades = 0;
    let valor = 0;
    productos.forEach((producto) => {
      if (producto.categoria === categoria.nombre) {
        cantidad = cantidad + 1;
        unidades = unidades + producto.stock;
        valor = valor + producto.precio * producto.stock;
      }
    });
    resumen.push({ categoria: categoria.nombre, cantidad: cantidad, unidades: unidades, valor: valor });
  });
  return resumen;
}

export function porcentaje(valor, maximo) {
  if (maximo <= 0) {
    return 0;
  }
  return Math.round((valor / maximo) * 100);
}
