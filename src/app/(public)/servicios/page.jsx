import Link from "next/link";

const promosInauguracion = [
  {
    id: "p1",
    zonas: "Axila + Rebaje Completo",
    regalo: "Intergluteo de regalo",
    precio: "$99.990",
    normal: "$189.990",
  },
  {
    id: "p2",
    zonas: "Axila + Pierna Completa",
    regalo: "Bozo de regalo",
    precio: "$109.990",
    normal: "$209.990",
  },
  {
    id: "p3",
    zonas: "Axila + Rebaje Completo + Pierna Completa",
    regalo: "Intergluteo de regalo",
    precio: "$129.990",
    normal: "$289.960",
  },
  {
    id: "p4",
    zonas: "Axila + Rebaje Completo + Pierna Completa + Cara",
    regalo: "Intergluteo de regalo",
    precio: "$149.990",
    normal: "$349.960",
  },
  {
    id: "p5",
    zonas: "Axila + Rebaje Completo + Pierna Completa + Medio Brazo + Espalda Baja",
    regalo: "Intergluteo de regalo",
    precio: "$179.990",
    normal: "$439.990",
  },
  {
    id: "p6",
    zonas: "Axila + Rebaje Completo + Pierna Completa + Brazos Completos",
    regalo: "Intergluteo de regalo",
    precio: "$189.990",
    normal: "$449.990",
  },
];

const zonasPrecio = [
  {
    size: "XS",
    zonas: ["Bozo", "Menton", "Patillas", "Frente", "Dedos Pies"],
    oferta: "$39.990",
    normal: "$59.990",
  },
  {
    size: "S",
    zonas: ["Axila", "Rebaje Simple", "Intergluteo", "Linea Alba", "Areolas", "Cuello"],
    oferta: "$59.990",
    normal: "$79.990",
  },
  {
    size: "M",
    zonas: ["Rebaje Completo", "Abdomen", "Medio Brazo", "Gluteos", "Espalda Baja", "Cara Completa", "Hombros"],
    oferta: "$89.990",
    normal: "$129.990",
  },
  {
    size: "L",
    zonas: ["Piernas Completas", "Brazos Completos"],
    oferta: "$109.990",
    normal: "$149.990",
  },
  {
    size: "XL",
    zonas: ["Espalda Completa", "Pecho + Abdomen"],
    oferta: "$129.990",
    normal: "$169.990",
  },
];

export default function PreciosPage() {
  return (
    <main className="bg-[#faf6f2] text-[#5c3422]">

      {/* Header */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 pt-16 md:px-8 md:pt-20 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#c08468]">
          Depilacion Laser Trilaser
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#5c3422] sm:text-5xl">
          Tarifas y Promociones
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#8b5e4a]">
          Tecnologia Trilaser que combina Diodo, Alexandrita y ND YAG. La mejor opcion para todo tipo de piel,
          con resultados visibles desde las primeras sesiones.
        </p>
      </section>

      {/* Promos Inauguracion */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 lg:px-10">
        <div className="mb-8 flex items-center gap-5">
          <div className="h-px flex-1 bg-[#c9a870]/45" />
          <h2 className="text-xl font-semibold tracking-wide text-[#5c3422] sm:text-2xl">
            Promo Inauguracion — 6 Sesiones
          </h2>
          <div className="h-px flex-1 bg-[#c9a870]/45" />
        </div>
        <p className="mb-8 text-center text-sm text-[#8b5e4a]">Solo 10 cupos disponibles por pack</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {promosInauguracion.map((promo) => (
            <article
              key={promo.id}
              className="flex flex-col justify-between rounded-2xl border border-[#e8d5c4] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c9a870]">
                  6 sesiones
                </p>
                <h3 className="mt-3 text-base font-semibold leading-snug text-[#5c3422]">
                  {promo.zonas}
                </h3>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#c9a870]/40 bg-[#f9f5e8] px-3 py-1">
                  <span className="text-xs text-[#c9a870]">Regalo:</span>
                  <span className="text-xs font-medium text-[#5c3422]">{promo.regalo}</span>
                </div>
              </div>

              <div className="mt-5 border-t border-[#f0e4da] pt-4">
                <p className="text-xs text-[#a07060] line-through">Normal: {promo.normal}</p>
                <p className="mt-1 text-3xl font-bold text-[#5c3422]">{promo.precio}</p>
                <Link
                  href="/agendaProfesionales"
                  className="mt-4 inline-flex w-full justify-center rounded-full bg-[#c08468] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#a06848]"
                >
                  Reservar ahora
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Precios por zonas */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 lg:px-10">
        <div className="mb-8 flex items-center gap-5">
          <div className="h-px flex-1 bg-[#c9a870]/45" />
          <h2 className="text-xl font-semibold tracking-wide text-[#5c3422] sm:text-2xl">
            Precios por Zona — 7 Sesiones
          </h2>
          <div className="h-px flex-1 bg-[#c9a870]/45" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e8d5c4] bg-white">
          {/* Header tabla */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-[#e8d5c4] bg-[#faf0e8] px-6 py-3">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5c3422]">Zonas</span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c08468]">Precio Oferta</span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a07060]">Precio Normal</span>
          </div>

          {zonasPrecio.map((row, idx) => (
            <div
              key={row.size}
              className={[
                "grid grid-cols-[1fr_auto_auto] items-start gap-4 px-6 py-5",
                idx < zonasPrecio.length - 1 ? "border-b border-[#f0e4da]" : "",
              ].join(" ")}
            >
              <div>
                <span className="inline-block rounded-full bg-[#c9a870] px-3 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                  {row.size}
                </span>
                <ul className="mt-2 space-y-0.5">
                  {row.zonas.map((zona) => (
                    <li key={zona} className="text-sm text-[#8b5e4a]">
                      {zona}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-1 text-right">
                <p className="text-xl font-bold text-[#5c3422]">{row.oferta}</p>
              </div>
              <div className="pt-1 text-right">
                <p className="text-sm text-[#a07060] line-through">{row.normal}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-[#a07060]">
          * Precios por sesion por zona. Tecnologia Trilaser: Diodo, Alexandrita y ND YAG.
        </p>
      </section>

      {/* CTA */}
      <section className="border-t border-[#e8d5c4] bg-[#faf6f2]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-5 py-14 md:flex-row md:items-center md:px-8 md:py-20 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c08468]">
              Siguiente paso
            </p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#5c3422]">
              Agenda tu hora y comienza hoy.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/agendaProfesionales"
              className="rounded-full bg-[#c08468] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#a06848]"
            >
              Reservar hora
            </Link>
            <a
              href="https://wa.me/56900000000"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#c08468] px-7 py-3 text-sm font-medium text-[#5c3422] transition hover:bg-[#faf0e8]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
