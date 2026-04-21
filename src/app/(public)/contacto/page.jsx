"use client";

import Link from "next/link";
import { Clock3, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";

const contactCards = [
  {
    title: "Ubicacion",
    value: "Las Condes, Santiago",
    href: null,
    icon: MapPin,
  },
  {
    title: "WhatsApp",
    value: "+56 9 0000 0000",
    href: "https://wa.me/56900000000",
    icon: MessageCircle,
  },
  {
    title: "Email",
    value: "contacto@avelie.cl",
    href: "mailto:contacto@avelie.cl",
    icon: Mail,
  },
  {
    title: "Instagram",
    value: "@avelie.cl",
    href: "https://www.instagram.com/avelie.cl",
    icon: Instagram,
  },
];

export default function ContactoPage() {
  return (
    <main className="bg-[#faf6f2] text-[#5c3422]">
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(192,132,104,0.12),transparent_34%),radial-gradient(circle_at_88%_2%,rgba(192,132,104,0.08),transparent_42%)]" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-2 lg:gap-10 xl:px-10">

          {/* Panel izquierdo — información */}
          <aside className="rounded-3xl bg-[#5c3422] p-7 shadow-[0_20px_54px_-34px_rgba(92,52,34,0.3)] md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              Contacto
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl">
              Avelié Centro Estetico, Las Condes.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base">
              Especialistas en depilacion laser Trilaser, tratamientos reductivos y mesoterapia corporal.
              Tecnologia avanzada con atencion personalizada.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contactCards.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                      {item.title}
                    </p>
                    <p
                      className={[
                        "mt-2 min-w-0 text-sm font-medium leading-relaxed text-white",
                        item.title === "Email" ? "break-all" : "break-words",
                      ].join(" ")}
                    >
                      {item.value}
                    </p>
                  </>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="rounded-2xl border border-white/20 bg-white/10 p-5 transition hover:-translate-y-0.5 hover:bg-white/15"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-white/20 bg-white/10 p-5"
                  >
                    {content}
                  </article>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                Horario de atencion
              </p>
              <div className="mt-3 flex items-start gap-3 text-sm text-white/88">
                <Clock3 className="mt-0.5 h-4 w-4 text-white/70 shrink-0" />
                <div className="space-y-1.5">
                  <p>Lunes a Viernes: 09:00 a 20:00</p>
                  <p>Sabado: 09:00 a 14:00</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Panel derecho — canales de contacto */}
          <div className="rounded-3xl border border-[#e8d5c4] bg-white p-7 shadow-sm md:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c08468]">
              Canales de contacto
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#5c3422] sm:text-4xl">
              Escribenos directamente.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#8b5e4a]">
              Para coordinar una sesion, resolver dudas o consultar sobre nuestros servicios,
              contactanos por cualquiera de estos canales.
            </p>

            <div className="mt-8 grid gap-3">
              <a
                href="https://wa.me/56900000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#c08468] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a06848]"
              >
                Escribir por WhatsApp
              </a>
              <a
                href="mailto:contacto@avelie.cl"
                className="inline-flex items-center justify-center rounded-full border border-[#c08468] px-7 py-3.5 text-sm font-semibold text-[#5c3422] transition hover:bg-[#faf0e8]"
              >
                Enviar correo
              </a>
              <a
                href="https://www.instagram.com/avelie.cl"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#e8d5c4] px-7 py-3.5 text-sm font-semibold text-[#5c3422] transition hover:bg-[#faf0e8]"
              >
                Ir a Instagram
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-[#e8d5c4] bg-[#faf0e8] p-5 text-sm text-[#8b5e4a]">
              <p className="font-semibold uppercase tracking-[0.12em] text-[#5c3422]">
                Previa coordinacion
              </p>
              <p className="mt-2">
                Agendamos tu sesion segun disponibilidad. Puedes revisar disponibilidad y reservar directamente en nuestra agenda online.
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/agendaProfesionales"
                className="inline-flex rounded-full bg-[#5c3422] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#3d2014]"
              >
                Agendar hora online
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
