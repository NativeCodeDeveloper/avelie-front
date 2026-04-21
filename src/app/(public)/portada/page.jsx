"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const fallbackSlides = [
  {
    id: "fallback-1",
    image: "/depilacion.webp",
    alt: "Avelie Centro Estetico",
  },
];


export default function Portada() {
  const [dataPortada, setDataPortada] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const API = process.env.NEXT_PUBLIC_API_URL || "https://bartelsmansalud.nativecode.cl";

  async function cargarPortada() {
    try {
      const res = await fetch(`${API}/carruselPortada/seleccionarCarruselPortada`, {
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
      });

      if (!res.ok) {
        setDataPortada([]);
        return;
      }

      const data = await res.json();
      setDataPortada(Array.isArray(data) ? data : []);
    } catch {
      setDataPortada([]);
      toast.error("No se ha podido cargar portada, contacte al administrador del sistema.");
    }
  }

  useEffect(() => {
    cargarPortada();
  }, []);

  const backendSlides = dataPortada
    .filter((item) => Number(item.estadoPublicacionPortada ?? 1) === 1)
    .map((item, index) => ({
      id: `portada-${item.id_publicacionesPortada ?? index}`,
      image: item.imagenPortada
        ? `https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${item.imagenPortada}/portada`
        : "/depilacion.webp",
      alt: item.tituloPortadaCarrusel || "Portada Avelie",
    }));

  const safeSlides = useMemo(
    () => (backendSlides.length > 0 ? backendSlides : fallbackSlides),
    [backendSlides]
  );

  useEffect(() => {
    if (safeSlides.length <= 1) return undefined;

    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % safeSlides.length);
    }, 5200);

    return () => clearInterval(intervalId);
  }, [safeSlides.length]);

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + safeSlides.length) % safeSlides.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % safeSlides.length);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current == null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    if (Math.abs(distance) > 45) {
      if (distance > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="inicio"
      className="relative -mt-20 scroll-mt-24 overflow-hidden md:-mt-24"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-[100svh]">

        {/* Imagen full-screen */}
        {safeSlides.map((slide, index) => (
          <img
            key={slide.id}
            src={imageErrors[slide.id] ? "/fondoverde.png" : slide.image}
            alt={slide.alt}
            className={[
              "absolute inset-0 h-full w-full object-cover object-[center_65%] transition-opacity duration-700 ease-out",
              index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0",
            ].join(" ")}
            onError={() =>
              setImageErrors((current) => ({ ...current, [slide.id]: true }))
            }
          />
        ))}

        {/* Gradiente crema: izquierda opaco → transparente derecha (desktop) / abajo opaco → transparente arriba (mobile) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#faf6f2]/95 via-[#faf6f2]/40 to-transparent md:bg-gradient-to-r md:from-[#faf6f2] md:via-[#faf6f2]/90 md:to-transparent" />

        {/* Contenido de texto */}
        <div className="relative flex h-full items-end pb-20 md:items-center md:pb-0">
          <div className="mx-auto w-full max-w-7xl px-8 md:px-14 lg:px-20">
            <div className="max-w-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-10 bg-[#c9a870]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#c9a870]">
                  Centro Estetico · Las Condes
                </span>
              </div>
              <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-[#5c3422] sm:text-6xl lg:text-7xl">
                Bienvenidos a Avelié
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#8b5e4a] sm:text-[17px]">
                Resultados reales, tecnologia avanzada y un enfoque personalizado para tu bienestar.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/agendaProfesionales"
                  aria-label="Reservar hora"
                  className="inline-flex w-full justify-center rounded-full bg-[#c08468] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:bg-[#a06848] sm:w-auto"
                >
                  Reservar hora
                </Link>
                <Link
                  href="/#servicios"
                  aria-label="Ver servicios"
                  className="inline-flex w-full justify-center rounded-full border border-[#c08468] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5c3422] transition duration-300 hover:bg-[#f5ede4] sm:w-auto"
                >
                  Ver servicios
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dots del carrusel */}
        {safeSlides.length > 1 && (
          <div className="absolute bottom-6 right-8 z-10 flex items-center gap-2 md:bottom-8">
            {safeSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Slide ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  activeIndex === index ? "w-6 bg-[#c08468]" : "w-2 bg-[#c08468]/40 hover:bg-[#c08468]/70",
                ].join(" ")}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
