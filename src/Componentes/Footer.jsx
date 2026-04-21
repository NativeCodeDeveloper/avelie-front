import Link from "next/link";
import { ArrowRight, Globe, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const footerLinks = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Nosotros", href: "/#porque-elegirnos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Promociones", href: "/#casos-clinicos" },
  { label: "Precios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
];

const serviceHighlights = [
  "Depilacion Laser Trilaser",
  "Lipo Laser 6 en 1",
  "Mesoterapia Corporal",
  "Tratamientos Combinados",
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/avelie.cl",
    icon: Instagram,
  },
  {
    label: "Sitio web",
    href: "https://www.avelie.cl",
    icon: Globe,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/56900000000",
    icon: MessageCircle,
  },
];

export default function FooterPremiumMedico() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-[#5d3725] text-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 bg-[radial-gradient(circle_at_12%_10%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_86%_12%,rgba(255,255,255,0.05),transparent_36%)]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-14 pb-14 md:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-[#c9a870]/30 pb-10 lg:grid-cols-12 lg:gap-8">
          <section className="lg:col-span-5">
            <img
              src="/logoavelie.png"
              alt="Logo Avelie"
              width={186}
              height={186}
              className="mx-auto h-[146px] w-[146px] object-contain object-center sm:h-[162px] sm:w-[162px] lg:h-[174px] lg:w-[174px]"
            />

            <h3 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              Estetica avanzada, resultados visibles, atencion personalizada.
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/90">
              Centro estetico especializado en Las Condes. Combinamos tecnologia de alto nivel con una experiencia
              sofisticada y cercana para que puedas invertir en tu bienestar con confianza.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/agendaProfesionales"
                className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#5c3422] transition hover:bg-white/90"
              >
                Agendar hora
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 rounded-full border border-white/55 bg-transparent px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white/16"
              >
                Contacto
              </Link>
            </div>
          </section>

          <section className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">Navegacion</p>
            <nav aria-label="Links del pie de pagina" className="mt-4">
              <ul className="space-y-2.5">
                {footerLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-flex text-sm tracking-[0.05em] text-white/90 transition hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <section className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">Servicios</p>
            <ul className="mt-4 space-y-2">
              {serviceHighlights.map((item) => (
                <li key={item} className="text-sm text-white/90">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">Contacto</p>

            <div className="mt-4 space-y-3 text-sm text-white/90">
              <a href="tel:+56900000000" className="inline-flex items-center gap-2 transition hover:text-white">
                <Phone className="h-4 w-4" />
                +56 9 0000 0000
              </a>
              <a href="mailto:contacto@avelie.cl" className="flex items-center gap-2 transition hover:text-white">
                <Mail className="h-4 w-4" />
                contacto@avelie.cl
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Las Condes, Santiago
              </div>
            </div>

            <div className="mt-6 text-sm text-white/90">
              <p className="font-semibold uppercase tracking-[0.12em] text-white/76">Horario de atencion</p>
              <p className="mt-2">Lunes a Viernes: 09:00 a 20:00</p>
              <p>Sabados: 09:00 a 14:00</p>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition hover:bg-white/16 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </section>
        </div>

        <div className="mt-6 flex flex-col gap-3 text-[11px] text-white/76 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Avelie Centro Estetico. Todos los derechos reservados.</p>
          <a
            href="https://nativecode.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="font-regular tracking-[0.16em] text-white underline decoration-white/60 underline-offset-2 transition hover:text-white/90"
          >
            Desarrollado por nativecode.cl
          </a>
        </div>
      </div>
    </footer>
  );
}
