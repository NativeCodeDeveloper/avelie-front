"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RevealOnScroll from "@/Componentes/RevealOnScroll";

const FALLBACK_CASE_IMAGE = "/Pub2.png";

const fallbackPromos = [
  {
    id: "promo-1",
    title: "Depilacion Laser",
    subtitle: "6 sesiones, desde $99.990",
    image: FALLBACK_CASE_IMAGE,
  },
  {
    id: "promo-2",
    title: "Lipo Laser 6 en 1",
    subtitle: "Tratamiento reductivo no invasivo",
    image: FALLBACK_CASE_IMAGE,
  },
  {
    id: "promo-3",
    title: "Mesoterapia Corporal",
    subtitle: "Mejora de piel y reduccion de celulitis",
    image: FALLBACK_CASE_IMAGE,
  },
];

export default function Seccion3() {
  const scrollerRef = useRef(null);
  const [imageErrors, setImageErrors] = useState({});
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
    subtitle: "",
    image: `https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${pub.imagenPublicaciones_primera}/full`,
  }));

  const content = promos.length > 0 ? promos : fallbackPromos;

  const scrollByAmount = (direction) => {
    const container = scrollerRef.current;
    if (!container) return;

    const firstCardWidth = container.firstElementChild?.clientWidth ?? 0;
    const styles = window.getComputedStyle(container);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    const amount =
      firstCardWidth > 0 ? Math.round(firstCardWidth + gap) : Math.round(container.clientWidth * 0.82);
    const maxLeft = Math.max(0, container.scrollWidth - container.clientWidth);

    if (direction === "right") {
      const nearEnd = container.scrollLeft >= maxLeft - 8;
      if (nearEnd) container.scrollTo({ left: 0, behavior: "smooth" });
      else container.scrollBy({ left: amount, behavior: "smooth" });
      return;
    }

    const nearStart = container.scrollLeft <= 8;
    if (nearStart) container.scrollTo({ left: maxLeft, behavior: "smooth" });
    else container.scrollBy({ left: -amount, behavior: "smooth" });
  };

  return (
    <>
      {/* Sección Promociones */}
      <section id="casos-clinicos" className="scroll-mt-24 bg-[#faf6f2] py-20 sm:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">

          {/* Título centrado con divisores */}
          <RevealOnScroll>
            <div className="mb-8 flex items-center gap-5">
              <div className="h-px flex-1 bg-[#c9a870]/45" />
              <h2 className="text-2xl font-semibold tracking-wide text-[#5c3422] sm:text-3xl">
                Promociones
              </h2>
              <div className="h-px flex-1 bg-[#c9a870]/45" />
            </div>
          </RevealOnScroll>

          {/* Controles de navegación */}
          <div className="mb-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              aria-label="Desplazar hacia la izquierda"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8d5c4] bg-white text-[#c08468] transition duration-300 hover:bg-[#faf0e8]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              aria-label="Desplazar hacia la derecha"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8d5c4] bg-white text-[#c08468] transition duration-300 hover:bg-[#faf0e8]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Carrusel horizontal */}
          <div
            ref={scrollerRef}
            className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
          >
            {content.map((item, index) => (
              <RevealOnScroll
                key={item.id}
                className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[42%]"
                delayClass={index === 0 ? "delay-100" : "delay-150"}
              >
                <article className="flex h-52 overflow-hidden rounded-2xl border border-[#e8d5c4] bg-white shadow-sm sm:h-60">
                  {/* Texto izquierda */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-[#5c3422]">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="mt-2 text-sm text-[#8b5e4a]">{item.subtitle}</p>
                      )}
                    </div>
                    <Link
                      href="/agendaProfesionales"
                      className="inline-flex w-fit rounded-full bg-[#c08468] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#a06848]"
                    >
                      Reservar ahora
                    </Link>
                  </div>

                  {/* Imagen derecha */}
                  <div className="relative w-40 shrink-0 overflow-hidden bg-[#f0e0d0] sm:w-48">
                    <img
                      src={imageErrors[item.image] ? FALLBACK_CASE_IMAGE : item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                      onError={() =>
                        setImageErrors((current) => ({
                          ...current,
                          [item.image]: true,
                        }))
                      }
                    />
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Agenda */}
      <section id="agenda" className="scroll-mt-24 bg-[#faf6f2] py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
          <RevealOnScroll>
            <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#c08468_0%,#8b5e4a_100%)] px-8 py-14 text-center sm:px-12">
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
