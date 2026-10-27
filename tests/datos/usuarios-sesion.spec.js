import { obtenerUsuarios, obtenerUsuarioPorCorreo, crearUsuario, actualizarUsuario, eliminarUsuario } from "@/data/usuarios";
import { obtenerCategorias, crearCategoria, actualizarCategoria, eliminarCategoria, obtenerCategoriaPorId } from "@/data/categorias";
import { iniciarSesion, cerrarSesion, obtenerSesion, puedeEntrarAlPanel } from "@/data/sesion";
import { crearApiFalsa } from "../mocks/apiFalsa";

describe("data/usuarios.js, data/categorias.js y data/sesion.js", () => {
  beforeEach(() => {
    crearApiFalsa();
  });

  it("CRUD de usuarios: crea, busca por correo sin importar mayúsculas, actualiza y elimina", async () => {
    const nuevo = await crearUsuario({ run: "177777773", nombre: "Pedro", apellidos: "Soto", correo: "pedro@gmail.com", clave: "pedro1", tipo: "Cliente" });

    expect(nuevo.id).toBeTruthy();
    expect((await obtenerUsuarioPorCorreo(" PEDRO@gmail.com ")).nombre).toBe("Pedro");
    expect((await actualizarUsuario(nuevo.id, { nombre: "Pedro Pablo" })).nombre).toBe("Pedro Pablo");
    expect(await eliminarUsuario(nuevo.id)).toBeTrue();
    expect((await obtenerUsuarios()).length).toBe(4);
  });

  it("CRUD de categorías: crea, renombra y elimina", async () => {
    const nueva = await crearCategoria({ nombre: "Niños", descripcion: "Cortes para niños", imagen: "/img/servicios/corte.jpg" });

    expect((await obtenerCategorias()).length).toBe(4);
    expect((await actualizarCategoria(nueva.id, { nombre: "Niños y jóvenes" })).nombre).toBe("Niños y jóvenes");
    expect(await eliminarCategoria(nueva.id)).toBeTrue();
    expect(await obtenerCategoriaPorId(nueva.id)).toBeNull();
  });

  it("iniciarSesion guarda la sesión en la API solo con correo y clave correctos", async () => {
    expect(await iniciarSesion("admin@duoc.cl", "mala")).toBeNull();
    expect(await obtenerSesion()).toBeNull();

    const usuario = await iniciarSesion("admin@duoc.cl", "admin123");

    expect(usuario.tipo).toBe("Administrador");
    expect(await obtenerSesion()).toEqual({ id: "1", nombre: "Felipe", tipo: "Administrador" });
    await cerrarSesion();
    expect(await obtenerSesion()).toBeNull();
  });

  it("al panel solo entran Administrador y Vendedor", () => {
    expect(puedeEntrarAlPanel({ tipo: "Administrador" })).toBeTrue();
    expect(puedeEntrarAlPanel({ tipo: "Vendedor" })).toBeTrue();
    expect(puedeEntrarAlPanel({ tipo: "Cliente" })).toBeFalse();
    expect(puedeEntrarAlPanel(null)).toBeFalse();
  });
});
