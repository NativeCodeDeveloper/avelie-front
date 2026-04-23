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
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_left_center,rgba(255,255,255,0.34),transparent_48%)]" />

        {/* Contenido de texto */}
        <div className="relative flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-8 pt-20 md:px-14 md:pt-0 lg:px-20">
            <div className="max-w-3xl">

                
              <div className="flex flex-col items-center text-center">
                <h1
                  className="mb-3 max-w-2xl font-semibold tracking-[-0.04em] drop-shadow-[0_10px_24px_rgba(250,246,242,0.34)]"
                  style={{ fontSize: "clamp(3.6rem,10vw,5.6rem)", lineHeight: 0.9, color: "#c89078", fontFamily: "var(--font-pinyon)" }}
                >
                  Bienvenidos a
                </h1>
                <div className="mt-3 h-36 w-36 overflow-hidden rounded-full border border-[#e8d5c4] bg-[#faf6f2] shadow-md sm:h-56 sm:w-56">
                  <img
                    src="/avalielogo1.png"
                    alt="Logo Avelie"
                    width={224}
                    height={224}
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <p className="mt-6 max-w-xl !text-[clamp(0.98rem,1.5vw,1.14rem)] font-normal !leading-[1.72] text-[#8f6a5b]">
                  Un espacio pensado para realzar tu belleza con resultados visibles, tecnologia avanzada y una
                  experiencia de cuidado cercana, elegante y personalizada.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                  <Link
                    href="/agendaProfesionales"
                    aria-label="Reservar hora"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#c0907c] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_28px_rgba(192,144,124,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ae7a63] hover:shadow-[0_16px_34px_rgba(192,144,124,0.28)] sm:w-auto"
                  >
                    Reservar hora
                  </Link>
                  <Link
                    href="/#servicios"
                    aria-label="Ver servicios"
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#dcc1b3] bg-white/72 px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6f4d40] shadow-[0_10px_24px_rgba(92,52,34,0.07)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/92 hover:shadow-[0_14px_30px_rgba(92,52,34,0.1)] sm:w-auto"
                  >
                    Ver servicios
                  </Link>
                </div>
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
