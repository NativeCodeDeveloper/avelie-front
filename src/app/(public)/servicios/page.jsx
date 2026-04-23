"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

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

function parsePrice(str) {
  return parseInt(str.replace(/[$.\s]/g, ""), 10) || 0;
}

// --- Tarjeta Promo (Card slot style) ---
function PromoCard({ promo, index }) {
  const normal = parsePrice(promo.normal);
  const precio = parsePrice(promo.precio);
  const discount = Math.round(((normal - precio) / normal) * 100);

  return (
    <motion.div
      className="flex flex-col rounded-xl border border-[#e8d5c4] bg-white overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -3, boxShadow: "0 16px 36px -20px rgba(92,52,34,0.22)" }}
    >
      {/* CardHeader con action */}
      <div className="grid grid-cols-[1fr_auto] items-start gap-2 px-4 py-3 border-b border-[#e8d5c4]">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9a870]">
            6 sesiones
          </p>
          <h3 className="mt-1 text-base font-semibold leading-snug text-[#5c3422]">
            {promo.zonas}
          </h3>
        </div>
        {/* CardAction: precio en esquina */}
        <div className="col-start-2 row-span-2 row-start-1 self-start">
          <span className="inline-flex rounded-full bg-[#f9f5e8] border border-[#c9a870]/40 px-3 py-1.5 text-sm font-bold text-[#5c3422] whitespace-nowrap">
            {promo.precio}
          </span>
        </div>
      </div>

      {/* CardContent */}
      <div className="flex-1 flex flex-col gap-3 p-4">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#c9a870]/40 bg-[#f9f5e8] px-3 py-1">
          <span className="text-xs text-[#c9a870]">Regalo:</span>
          <span className="text-xs font-medium text-[#5c3422]">{promo.regalo}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#a07060] line-through">Normal: {promo.normal}</span>
          <span className="text-xs font-semibold text-emerald-700">{discount}% off</span>
        </div>
      </div>

      {/* CardFooter */}
      <div className="flex items-center p-4 border-t border-[#e8d5c4]">
        <Link
          href="/agendaProfesionales"
          className="w-full inline-flex justify-center rounded-full bg-[#cb8e68] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#b07450]"
        >
          Reservar ahora
        </Link>
      </div>
    </motion.div>
  );
}

// --- Tarjeta Zona (ProductCard style) ---
function ZonaCard({ row, index }) {
  const normal = parsePrice(row.normal);
  const oferta = parsePrice(row.oferta);
  const discount = Math.round(((normal - oferta) / normal) * 100);

  return (
    <motion.div
      className="border border-[#e8d5c4] rounded-xl overflow-hidden bg-white w-full p-4 md:p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      whileHover={{ boxShadow: "0px 12px 32px -8px rgba(92,52,34,0.14)", y: -4 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1.5fr] gap-6 items-start">

        {/* Columna 1: Logo + talla */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-[180px] mx-auto aspect-square flex items-center justify-center rounded-xl bg-[#faf0e8] p-6">
            <Image
              src="/logoavelie.png"
              alt="Avelie"
              width={150}
              height={150}
              className="object-contain w-full h-full"
            />
          </div>
          <span className="inline-flex items-center justify-center rounded-full bg-[#c9a870] px-5 py-1.5 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-sm">
            Talla {row.size}
          </span>
        </div>

        {/* Columna 2: Zonas */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-[#5c3422]">Zonas incluidas</h2>
          <ul className="space-y-2 text-sm list-disc list-inside text-[#8b6658]">
            {row.zonas.map((zona) => (
              <li key={zona}>{zona}</li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Precios */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-bold text-[#5c3422]">{row.oferta}</h3>
            <ShieldCheck className="h-6 w-6 text-[#cb8e68]" strokeWidth={1.5} />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-[#a07060] line-through">{row.normal}</span>
            <span className="font-semibold text-emerald-700">{discount}% off</span>
          </div>
          <p className="mt-2 text-sm font-medium text-[#8b6658]">7 Sesiones incluidas</p>
          <p className="text-sm font-medium text-[#cb8e68]">Tecnologia Trilaser</p>
          <Link
            href="/agendaProfesionales"
            className="mt-4 inline-flex justify-center rounded-full bg-[#cb8e68] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#b07450]"
          >
            Reservar ahora
          </Link>
        </div>

      </div>
    </motion.div>
  );
}

// --- PAGE ---
export default function PreciosPage() {
  return (
    <main className="bg-[#faf6f2] text-[#5c3422]">

      {/* Header */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-12 pt-16 md:px-8 md:pt-20 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#cb8e68]">
          Depilacion Laser Trilaser
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-[#5c3422] sm:text-5xl">
          Tarifas y Promociones
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#8b5e4a]">
          Tecnologia Trilaser que combina Diodo, Alexandrita y ND YAG. La mejor opcion para todo
          tipo de piel, con resultados visibles desde las primeras sesiones.
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
        <p className="mb-8 text-center text-sm text-[#8b5e4a]">
          Solo 10 cupos disponibles por pack
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {promosInauguracion.map((promo, index) => (
            <PromoCard key={promo.id} promo={promo} index={index} />
          ))}
        </div>
      </section>

      {/* Precios por Zona */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 lg:px-10">
        <div className="mb-8 flex items-center gap-5">
          <div className="h-px flex-1 bg-[#c9a870]/45" />
          <h2 className="text-xl font-semibold tracking-wide text-[#5c3422] sm:text-2xl">
            Precios por Zona — 7 Sesiones
          </h2>
          <div className="h-px flex-1 bg-[#c9a870]/45" />
        </div>

        <div className="flex flex-col gap-4">
          {zonasPrecio.map((row, index) => (
            <ZonaCard key={row.size} row={row} index={index} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[#a07060]">
          * Precios por sesion por zona. Tecnologia Trilaser: Diodo, Alexandrita y ND YAG.
        </p>
      </section>

      {/* CTA final */}
      <section className="border-t border-[#e8d5c4] bg-[#faf6f2]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-5 py-14 md:flex-row md:items-center md:px-8 md:py-20 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#cb8e68]">
              Siguiente paso
            </p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#5c3422]">
              Agenda tu hora y comienza hoy.
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/agendaProfesionales"
              className="rounded-full bg-[#cb8e68] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#b07450]"
            >
              Reservar hora
            </Link>
            <a
              href="https://wa.me/56900000000"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#cb8e68] px-7 py-3 text-sm font-medium text-[#5c3422] transition hover:bg-[#faf0e8]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
