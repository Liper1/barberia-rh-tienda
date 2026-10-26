import { Oswald, Source_Sans_3 } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const oswald = Oswald({
  variable: "--fuente-titulos",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--fuente-texto",
  subsets: ["latin"],
});

export const metadata = {
  title: "Barbería R&H | Tienda",
  description: "Cortes, barba y tratamientos de la Barbería R&H, con pago en línea.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${oswald.variable} ${sourceSans.variable}`} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
