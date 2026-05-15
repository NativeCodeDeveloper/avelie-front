"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";

const contactCards = [
  {
    title: "Ubicacion",
    value: "Manuel Montt 252, Providencia · Oficina 203",
    href: null,
    icon: MapPin,
  },
  {
    title: "WhatsApp",
    value: "+56 9 7728 3979",
    href: "https://wa.me/56977283979",
    icon: MessageCircle,
  },
  {
    title: "Email",
    value: "Esteticaavelie@gmail.com",
    href: "mailto:Esteticaavelie@gmail.com",
    icon: Mail,
  },
  {
    title: "Instagram",
    value: "@Avelieclinic",
    href: "https://www.instagram.com/Avelieclinic",
    icon: Instagram,
  },
];

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    description: "Respuesta rapida · Coordinacion de sesiones",
    href: "https://wa.me/56977283979",
    cta: "Escribir ahora",
    primary: true,
  },
  {
    icon: Mail,
    label: "Correo electronico",
    description: "Esteticaavelie@gmail.com",
    href: "mailto:Esteticaavelie@gmail.com",
    cta: "Enviar correo",
    primary: false,
  },
  {
    icon: Instagram,
    label: "Instagram",
    description: "@Avelieclinic",
    href: "https://www.instagram.com/Avelieclinic",
    cta: "Ver perfil",
    primary: false,
  },
];

const schedule = [
  { day: "Lunes",     hours: "10:00 – 15:00" },
  { day: "Martes",    hours: "14:00 – 18:00" },
  { day: "Miercoles", hours: "10:00 – 15:00" },
  { day: "Jueves",    hours: "14:00 – 18:00" },
  { day: "Viernes",   hours: "10:00 – 15:00" },
  { day: "Sabado",    hours: "10:00 – 15:00" },
  { day: "Domingo",   hours: "Cerrado",       closed: true },
];

export default function ContactoPage() {
  return (
    <main className="w-full overflow-x-hidden bg-[#faf6f2] text-[#5c3422]">
      <section className="relative w-full overflow-hidden py-12 md:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(192,132,104,0.12),transparent_34%),radial-gradient(circle_at_88%_2%,rgba(192,132,104,0.08),transparent_42%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-5 px-4 sm:px-6 md:gap-8 md:px-8 lg:grid-cols-2 lg:gap-10 xl:px-10">

          {/* Panel izquierdo */}
          <aside className="flex min-w-0 flex-col rounded-2xl bg-[#c58364] p-5 shadow-[0_20px_54px_-34px_rgba(92,52,34,0.3)] sm:rounded-3xl sm:p-7 md:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Contacto
            </p>
            <h1 className="mt-3 text-xl font-semibold leading-[1.15] text-white sm:text-3xl md:text-4xl">
              Avelié Centro Estetico, Providencia.
            </h1>
            <p className="mt-3 text-sm leading-7 text-white/80">
              Especialistas en depilacion laser Trilaser, tratamientos reductivos y mesoterapia corporal
              con tecnologia avanzada y atencion personalizada.
            </p>

            {/* Cards de contacto — fila en mobile, grid 2 col en sm+ */}
            <div className="mt-5 grid grid-cols-1 gap-2 sm:mt-7 sm:grid-cols-2 sm:gap-3">
              {contactCards.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-center gap-3 sm:block">
                    <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 sm:mb-3">
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                        {item.title}
                      </p>
                      <p className={["mt-0.5 text-sm font-medium leading-snug text-white sm:mt-1.5", item.title === "Email" ? "break-all" : "break-words"].join(" ")}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="rounded-xl border border-white/20 bg-white/10 p-3 transition duration-200 hover:bg-white/18 sm:rounded-2xl sm:p-4"
                  >
                    {content}
                  </a>
                ) : (
                  <article key={item.title} className="rounded-xl border border-white/20 bg-white/10 p-3 sm:rounded-2xl sm:p-4">
                    {content}
                  </article>
                );
              })}
            </div>

            {/* Horarios — grid de 2 columnas para compactar */}
            <div className="mt-3 flex-1 rounded-xl border border-white/20 bg-white/10 p-4 sm:mt-4 sm:rounded-2xl sm:p-5">
              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 shrink-0 text-white/55" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                  Horario de atencion
                </p>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                {schedule.slice(0, -1).map(({ day, hours }) => (
                  <div key={day} className="flex items-center justify-between gap-2 text-sm">
                    <span className="text-white/55">{day}</span>
                    <span className="text-white/90">{hours}</span>
                  </div>
                ))}
                <div className="col-span-2 mt-1 flex items-center justify-between border-t border-white/15 pt-2 text-sm">
                  <span className="text-white/55">Domingo</span>
                  <span className="text-white/35">Cerrado</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Panel derecho */}
          <div className="flex min-w-0 flex-col rounded-2xl border border-[#e8d5c4] bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 md:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#cb8e68]">
              Canales de contacto
            </p>
            <h2 className="mt-3 text-xl font-semibold leading-tight text-[#5c3422] sm:text-3xl md:text-4xl">
              Escribenos directamente.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#8b5e4a]">
              Para coordinar una sesion, resolver dudas o consultar sobre nuestros servicios,
              contactanos por cualquiera de estos canales.
            </p>

            {/* Canales */}
            <div className="mt-5 flex flex-col gap-2 sm:mt-7 sm:gap-3">
              {channels.map(({ icon: Icon, label, description, href, cta, primary }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className={[
                    "group flex items-center gap-3 rounded-xl border p-3 transition duration-200 sm:gap-4 sm:rounded-2xl sm:p-4",
                    primary
                      ? "border-[#cb8e68] bg-[#cb8e68] hover:bg-[#b07450]"
                      : "border-[#e8d5c4] bg-[#faf6f2] hover:border-[#cb8e68] hover:bg-[#faf0e8]",
                  ].join(" ")}
                >
                  <div className={["flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11", primary ? "bg-white/20" : "bg-[#ecddd3]"].join(" ")}>
                    <Icon className={["h-5 w-5", primary ? "text-white" : "text-[#cb8e68]"].join(" ")} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={["text-sm font-semibold", primary ? "text-white" : "text-[#5c3422]"].join(" ")}>
                      {label}
                    </p>
                    <p className={["mt-0.5 truncate text-xs", primary ? "text-white/75" : "text-[#8b5e4a]"].join(" ")}>
                      {description}
                    </p>
                  </div>
                  {/* CTA oculto en móvil, visible desde sm */}
                  <span className={["hidden items-center gap-1 whitespace-nowrap text-xs font-semibold sm:flex", primary ? "text-white" : "text-[#cb8e68]"].join(" ")}>
                    {cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  {/* Solo flecha en móvil */}
                  <ArrowRight className={["h-4 w-4 shrink-0 sm:hidden", primary ? "text-white" : "text-[#cb8e68]"].join(" ")} />
                </a>
              ))}
            </div>

            {/* Bloque de agenda */}
            <div className="mt-3 flex-1 rounded-xl border border-[#e8d5c4] bg-[#faf0e8] p-4 sm:mt-5 sm:rounded-2xl sm:p-6">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#cb8e68]" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#5c3422]">
                  Reserva tu sesion
                </p>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#8b5e4a]">
                Revisa disponibilidad y agenda directamente en nuestra agenda online, sin necesidad de llamar.
              </p>
              <Link
                href="/agendaProfesionales"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#5c3422] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3d2014] sm:mt-5 sm:w-auto"
              >
                Agendar hora online
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
