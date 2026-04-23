import Link from "next/link";
import { Instagram, Globe, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Nosotros", href: "/#porque-elegirnos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Promociones", href: "/#casos-clinicos" },
  { label: "Precios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
];

const serviceList = [
  "Depilacion Laser Trilaser",
  "Lipo Laser 6 en 1",
  "Mesoterapia Corporal",
  "Tratamientos Combinados",
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/avelie.cl", Icon: Instagram },
  { label: "Sitio web", href: "https://www.avelie.cl", Icon: Globe },
  { label: "WhatsApp", href: "https://wa.me/56900000000", Icon: MessageCircle },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#cb8e68] text-white">

      {/* Cuerpo principal */}
      <div className="mx-auto w-full max-w-7xl px-5 pt-16 pb-12 md:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Columna 1 — Marca */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src="/avalielogo1.png"
              alt="Logo Avelie"
              className="h-[100px] w-[100px] rounded-full bg-[#f5ede4] object-contain p-1"
            />
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#c9a870]">
              Centro Estetico
            </p>
            <p className="mt-3 max-w-xs text-sm leading-[1.72] text-white/70">
              Depilacion laser y tratamientos corporales con tecnologia avanzada
              en Las Condes, Santiago.
            </p>
          </div>

          {/* Columna 2 — Navegación */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#c9a870]">
              Navegacion
            </p>
            <nav aria-label="Links del pie de pagina" className="mt-5">
              <ul className="space-y-3">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Columna 3 — Servicios */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#c9a870]">
              Servicios
            </p>
            <ul className="mt-5 space-y-3">
              {serviceList.map((item) => (
                <li key={item} className="text-sm text-white/70">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#c9a870]">
              Contacto
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="tel:+56900000000"
                  className="inline-flex items-center gap-2.5 text-sm text-white/70 transition hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-[#c9a870]" />
                  +56 9 0000 0000
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@avelie.cl"
                  className="inline-flex items-center gap-2.5 text-sm text-white/70 transition hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-[#c9a870]" />
                  contacto@avelie.cl
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/70">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#c9a870]" />
                Las Condes, Santiago
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                Horarios
              </p>
              <p className="mt-2 text-sm text-white/70">Lunes a Viernes: 09:00 – 20:00</p>
              <p className="text-sm text-white/70">Sabados: 09:00 – 14:00</p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition hover:border-[#c9a870] hover:text-[#c9a870]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-[11px] text-white/40 md:flex-row md:px-8 lg:px-10">
          <p>© {new Date().getFullYear()} Avelie Centro Estetico. Todos los derechos reservados.</p>
          <a
            href="https://nativecode.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white/70"
          >
            Desarrollado por nativecode.cl
          </a>
        </div>
      </div>

    </footer>
  );
}
