"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Services3DCarousel({
  sectionTitle,
  sectionSubtitle,
  items = [],
  fallbackImage = "/logo_transparent.png",
  className,
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imageErrors, setImageErrors] = React.useState({});

  const handleNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  React.useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(handleNext, 4000);
    return () => clearInterval(timer);
  }, [handleNext, items.length]);

  // Safeguard: si el índice queda fuera de rango al recargar items
  React.useEffect(() => {
    if (items.length > 0 && currentIndex >= items.length) {
      setCurrentIndex(0);
    }
  }, [items.length, currentIndex]);

  const currentItem = items[currentIndex] ?? null;
  const descriptionLines = currentItem?.description
    ? currentItem.description.split("\n").filter(Boolean)
    : [];

  if (!items.length) return null;

  return (
    <section
      className={cn("relative w-full overflow-x-hidden bg-[#faf6f2] py-20 sm:py-28", className)}
      aria-label={sectionTitle ?? "Servicios"}
    >
      {/* Gradientes de fondo */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute left-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(192,132,104,0.18),transparent)]" />
        <div className="absolute bottom-[-10%] right-[-15%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(139,94,74,0.14),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">

        {/* Encabezado de sección */}
        {(sectionTitle || sectionSubtitle) && (
          <div className="mx-auto mb-14 max-w-3xl text-center">
            {sectionTitle && (
              <h2 className="text-[clamp(2rem,3vw,3rem)] font-semibold tracking-[-0.03em] text-[#5f3c2f]">
                {sectionTitle}
              </h2>
            )}
            {sectionSubtitle && (
              <p className="mt-4 text-[clamp(0.98rem,1.2vw,1.08rem)] leading-[1.75] text-[#8b6658]">
                {sectionSubtitle}
              </p>
            )}
          </div>
        )}

        {/* Carrusel 3D */}
        <div className="relative h-[360px] w-full md:h-[460px] flex items-center justify-center [perspective:1000px]">
          {items.map((item, index) => {
            const total = items.length;
            let pos = ((index - currentIndex) + total) % total;
            if (pos > Math.floor(total / 2)) pos -= total;

            const isCenter = pos === 0;
            const isAdjacent = Math.abs(pos) === 1;

            return (
              <div
                key={item.id}
                className="absolute w-48 h-80 md:w-64 md:h-[420px] transition-all duration-500 ease-in-out"
                style={{
                  transform: `translateX(${pos * 45}%) scale(${isCenter ? 1 : isAdjacent ? 0.85 : 0.7}) rotateY(${pos * -10}deg)`,
                  zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                  opacity: isCenter ? 1 : isAdjacent ? 0.4 : 0,
                  filter: isCenter ? "blur(0px)" : "blur(4px)",
                  visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                }}
              >
                <img
                  src={imageErrors[item.id] ? fallbackImage : item.imageSrc}
                  alt={item.title}
                  className="h-full w-full rounded-3xl border-2 border-[#ead8cc] object-cover shadow-2xl"
                  onError={() =>
                    setImageErrors((prev) => ({ ...prev, [item.id]: true }))
                  }
                />
              </div>
            );
          })}

          {/* Botón anterior */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Servicio anterior"
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ead8cc] bg-white/70 text-[#5c3422] shadow-md backdrop-blur-sm transition hover:bg-white sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Botón siguiente */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Servicio siguiente"
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ead8cc] bg-white/70 text-[#5c3422] shadow-md backdrop-blur-sm transition hover:bg-white sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Título y descripción del item activo */}
        {currentItem && (
          <div
            key={currentIndex}
            className="mx-auto mt-10 max-w-xl text-center animate-in fade-in duration-300"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#cb8e68]">
              Tratamiento
            </p>
            <h3 className="mt-2 text-2xl font-semibold leading-snug text-[#5c3422] sm:text-3xl">
              {currentItem.title}
            </h3>
            {descriptionLines.length > 0 ? (
              <ul className="mt-3 space-y-1">
                {descriptionLines.map((line) => (
                  <li key={line} className="text-sm leading-[1.6] text-[#8b6658]">
                    {line}
                  </li>
                ))}
              </ul>
            ) : currentItem.description ? (
              <p className="mt-3 text-sm leading-[1.6] text-[#8b6658]">
                {currentItem.description}
              </p>
            ) : null}
          </div>
        )}

        {/* Dots de navegación */}
        {items.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Ir a ${item.title}`}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "w-8 bg-[#cb8e68]"
                    : "w-2 bg-[#ead8cc] hover:bg-[#cb8e68]/60"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Services3DCarousel;
