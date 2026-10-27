# Tienda online Barbería R&H

Proyecto de la Evaluación Parcial 2 de **DSY1104 Desarrollo Fullstack II** (Duoc UC).
Alumno: Felipe Riquelme Montt.
Repositorio: https://github.com/Liper1/barberia-rh-tienda

Tienda online de la Barbería R&H hecha con **Next.js 16 (React 19)** y **Bootstrap 5.3**,
con un panel de administración y pruebas unitarias con **Jasmine + Karma**.

## Cómo ejecutarlo

Necesita **Node.js 20 o superior** (https://nodejs.org, versión LTS). No necesita XAMPP:
Next.js y json-server corren con Node.

### Desde Visual Studio Code

1. *File → Open Folder* y abrir la carpeta `barberia-rh-tienda`.
2. Abrir una terminal: *Terminal → New Terminal* (o `Ctrl + ñ`).
3. Solo la primera vez: `npm install` (necesita internet).
4. Levantar la API: `npm run api` (queda corriendo en http://localhost:4000).
5. Abrir una **segunda terminal** con el botón `+` del panel de terminales y levantar la tienda: `npm run dev`.
6. Abrir http://localhost:3000 en el navegador.

Para apagar cualquiera de los dos: `Ctrl + C` en su terminal.

`npm run api` es lo mismo que `npx json-server --watch -p 4000 datos_prueba.json` (como en clase).
Los cambios que se hacen en la tienda quedan guardados en `datos_prueba.json`.
Para volver a los datos iniciales: `npm run reiniciar-datos` (con la API apagada).

## Pruebas unitarias

```bash
npm test
```

Karma abre Chrome sin ventana (no necesita la API: las pruebas usan una API falsa), corre las 76 pruebas de `tests/` y deja el reporte de
cobertura en `coverage/html/index.html`. Necesita Google Chrome instalado.

## Cuentas de prueba

| Correo | Contraseña | Tipo |
|---|---|---|
| admin@duoc.cl | admin123 | Administrador (panel completo) |
| vendedor@duoc.cl | vende123 | Vendedor (dashboard, órdenes y servicios sin editar) |
| cliente@gmail.com | cliente1 | Cliente (solo tienda) |

Para probar un pago rechazado se usa la tarjeta `4000 0000 0000 0002`. Cualquier otra
tarjeta de 16 números se aprueba.

## Estructura

```
app/(tienda)/      páginas públicas: home, productos, categorías, ofertas, carrito,
                   checkout, compra exitosa / con error, login, registro, nosotros, blog, contacto
app/admin/         panel: dashboard, órdenes, productos, categorías, usuarios, reportes, perfil
components/tienda/ componentes reutilizables de la tienda
components/admin/  componentes del panel
data/              funciones CRUD que llaman a la API con fetch (GET, POST, PATCH, DELETE)
lib/               validaciones (RUN, correo, clave, tarjeta) y cálculos de reportes
tests/             pruebas de Jasmine (componentes, datos y mocks)
karma.conf.js      configuración de Karma, webpack, Babel y cobertura
```

## Notas

- Los datos (servicios, productos, categorías, usuarios, órdenes, carrito y sesión) están en
  `datos_prueba.json` y se leen y modifican con `fetch` a la API. No se usa localStorage.
- El login es simulado: sirve para mostrar los permisos por tipo de usuario, no es seguro.
