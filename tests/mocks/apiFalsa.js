import datosIniciales from "./datos-iniciales.json";

function respuesta(datos, ok) {
  return {
    ok: ok,
    json: async () => JSON.parse(JSON.stringify(datos)),
  };
}

export function crearApiFalsa() {
  const db = JSON.parse(JSON.stringify(datosIniciales));
  let contador = 0;

  spyOn(window, "fetch").and.callFake(async (url, opciones) => {
    const metodo = opciones && opciones.method ? opciones.method : "GET";
    const cuerpo = opciones && opciones.body ? JSON.parse(opciones.body) : undefined;
    const partes = url.replace("http://localhost:4000/", "").split("/");
    const coleccion = partes[0];
    const id = partes[1];
    const lista = db[coleccion];

    if (lista === undefined) {
      return respuesta(null, false);
    }

    if (!Array.isArray(lista)) {
      if (metodo !== "GET") {
        db[coleccion] = cuerpo;
      }
      return respuesta(db[coleccion], true);
    }

    if (id === undefined) {
      if (metodo === "POST") {
        contador = contador + 1;
        const nuevo = { id: "nuevo" + contador };
        for (const campo in cuerpo) {
          nuevo[campo] = cuerpo[campo];
        }
        lista.push(nuevo);
        return respuesta(nuevo, true);
      }
      return respuesta(lista, true);
    }

    let encontrado = null;
    lista.forEach((elemento) => {
      if (elemento.id === id) {
        encontrado = elemento;
      }
    });
    if (encontrado === null) {
      return respuesta({ error: "Not Found" }, false);
    }
    if (metodo === "PATCH" || metodo === "PUT") {
      for (const campo in cuerpo) {
        encontrado[campo] = cuerpo[campo];
      }
    }
    if (metodo === "DELETE") {
      const quedan = [];
      lista.forEach((elemento) => {
        if (elemento.id !== id) {
          quedan.push(elemento);
        }
      });
      db[coleccion] = quedan;
    }
    return respuesta(encontrado, true);
  });

  return db;
}
