"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";
import OffersCarousel from "@/components/ui/offers-carousel";

const FALLBACK_CASE_IMAGE = "/Pub2.png";

const fallbackPromos = [
  {
    id: "promo-1",
    title: "Depilacion Laser",
    subtitle: "6 sesiones, desde $99.990",
    detail: "Disponibilidad limitada",
    eyebrow: "Promocion",
    badge: "Destacado",
    imageUrl: FALLBACK_CASE_IMAGE,
  },
  {
    id: "promo-2",
    title: "Lipo Laser 6 en 1",
    subtitle: "Tratamiento reductivo no invasivo",
    detail: "Tratamiento integral",
    eyebrow: "Promocion",
    badge: "Especial",
    imageUrl: FALLBACK_CASE_IMAGE,
  },
  {
    id: "promo-3",
    title: "Mesoterapia Corporal",
    subtitle: "Mejora de piel y reduccion de celulitis",
    detail: "Cupos acotados",
    eyebrow: "Promocion",
    badge: "Nuevo",
    imageUrl: FALLBACK_CASE_IMAGE,
  },
];

export default function Seccion3() {
  const [listaPublicaciones, setListaPublicaciones] = useState([]);
  const API = process.env.NEXT_PUBLIC_API_URL || "https://bartelsmansalud.nativecode.cl";

  async function listarPublicacionesSeccion3() {
    try {
      const res = await fetch(`${API}/publicaciones/seleccionarPublicaciones`, {
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
      });

      if (!res.ok) {
        setListaPublicaciones([]);
        return [];
      }

      const publicaciones = await res.json();
      const activePublicaciones = Array.isArray(publicaciones)
        ? publicaciones.filter((item) => Number(item.estadoPublicacion ?? 1) === 1)
        : [];
      setListaPublicaciones(activePublicaciones);
      return activePublicaciones;
    } catch (err) {
      console.error("Problema al consultar backend desde la vista frontend:" + err);
      setListaPublicaciones([]);
      return [];
    }
  }

  useEffect(() => {
    listarPublicacionesSeccion3();
  }, []);

  const promos = listaPublicaciones.map((pub, index) => ({
    id: pub.id_publicaciones ?? `promo-${index}`,
    title: pub.descripcionPublicaciones || `Promocion ${index + 1}`,
    subtitle: "Promocion vigente para potenciar tu experiencia de cuidado.",
    detail: "Disponibilidad limitada",
    eyebrow: "Promocion",
    badge: "Destacado",
    imageUrl: `https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${pub.imagenPublicaciones_primera}/full`,
  }));

  const content = promos.length > 0 ? promos : fallbackPromos;

  return (
    <>
      {/* Sección Promociones */}
      <section id="casos-clinicos" className="scroll-mt-24 bg-[#faf6f2] py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <RevealOnScroll>
            <OffersCarousel
              offerTitle="Promociones seleccionadas para ti"
              offerSubtitle="Beneficios especiales para descubrir tratamientos con una experiencia premium, cercana y profesional."
              ctaText="Ver todas las promociones"
              ctaHref="/agendaProfesionales"
              itemCtaHref="/agendaProfesionales"
              itemCtaText="Reservar promocion"
              items={content}
              fallbackImage={FALLBACK_CASE_IMAGE}
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA Agenda */}
      <section id="agenda" className="scroll-mt-24 bg-[#faf6f2] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <RevealOnScroll>
            <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#cb8e68_0%,#8b5e4a_100%)] px-8 py-14 text-center sm:px-12">
              <p className="text-xs uppercase tracking-[0.24em] text-white/80">Avelie Centro Estetico</p>
              <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] text-white sm:text-4xl">
                Agenda tu primera sesion y comienza a ver resultados reales.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/80">
                Te orientamos con un plan personalizado segun tus objetivos, en un entorno sofisticado y cercano ubicado en Las Condes.
              </p>
              <Link
                href="/agendaProfesionales"
                aria-label="Reservar hora"
                className="mt-8 inline-flex rounded-full border border-white/30 bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#5c3422] transition duration-300 hover:bg-white/90"
              >
                Reservar hora
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
