export const blogs = [
  {
    id: 1,
    titulo: "Cómo elegir tu corte según la forma de tu cara",
    fecha: "2026-10-05",
    imagen: "/img/blog2.jpg",
    resumen: "Degradado, clásico o con volumen: te contamos qué corte le queda mejor a cada tipo de cara.",
    contenido: [
      "Si tienes la cara redonda, conviene un corte con volumen arriba y los lados cortos, como un degradado alto. Así la cara se ve más larga.",
      "Para la cara alargada funcionan mejor los cortes con los lados un poco más largos y sin tanto volumen arriba, como un corte clásico con tijera.",
      "Si no sabes cuál elegir, reserva un corte de cabello y conversa con tu barbero antes de empezar: en 5 minutos te recomienda el que mejor te queda.",
    ],
  },
  {
    id: 2,
    titulo: "Cuidado de la barba: rutina de 5 minutos",
    fecha: "2026-10-18",
    imagen: "/img/blog1.jpg",
    resumen: "Lavado, aceite y peinado. Una rutina simple para que la barba se vea ordenada todos los días.",
    contenido: [
      "Lava la barba dos o tres veces por semana con un shampoo especial. El shampoo del pelo reseca la piel de la cara.",
      "Después de la ducha aplica tres o cuatro gotas de aceite y masajea desde la raíz. Así evitas la picazón y la caspa.",
      "Termina con una peineta de carbono o un cepillo de cerdas naturales para dar forma. Una vez al mes, pasa por la barbería para perfilar.",
    ],
  },
];

export function obtenerBlogPorId(id) {
  let encontrado = null;
  blogs.forEach((blog) => {
    if (blog.id === Number(id)) {
      encontrado = blog;
    }
  });
  return encontrado;
}
