"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function SparksCarousel({
  title,
  subtitle,
  items,
  fallbackImage = "/logo_transparent.png",
  primaryHref = "/agendaProfesionales",
  primaryLabel = "Reservar ahora",
  secondaryHref = "/servicios",
  secondaryLabel = "Ver detalles",
  className,
}) {
  const [imageErrors, setImageErrors] = React.useState({});
  const [carouselApi, setCarouselApi] = React.useState();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  React.useEffect(() => {
    if (!carouselApi || items.length <= 1) return;

    const intervalId = setInterval(() => {
      carouselApi.scrollNext();
    }, 5200);

    return () => clearInterval(intervalId);
  }, [carouselApi, items.length]);

  return (
    <section
      className={cn("mx-auto w-full max-w-[71rem]", className)}
      aria-labelledby="sparks-carousel-title"
    >
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b68a76]">
            <span className="h-px w-8 bg-[#d9b9a8]" />
            Curaduria Avelie
          </div>
          <h2
            id="sparks-carousel-title"
            className="mt-4 !text-[clamp(2rem,3vw,3rem)] font-semibold !leading-[1.05] tracking-[-0.03em] text-[#5f3c2f]"
          >
            {title}
          </h2>
          <p className="mt-3 max-w-xl !text-[clamp(0.98rem,1.2vw,1.08rem)] !leading-[1.75] text-[#8b6658]">
            {subtitle}
          </p>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => carouselApi?.scrollPrev()}
            aria-label="Desplazar servicios hacia la izquierda"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#ead8cc] bg-white/80 text-[#cb8e68] shadow-[0_12px_24px_rgba(92,52,34,0.08)] transition hover:bg-[#fffaf7]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => carouselApi?.scrollNext()}
            aria-label="Desplazar servicios hacia la derecha"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#ead8cc] bg-white/80 text-[#cb8e68] shadow-[0_12px_24px_rgba(92,52,34,0.08)] transition hover:bg-[#fffaf7]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Carousel
        setApi={setCarouselApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-5">
          {items.map((item, index) => {
            const lines = item.description
              ? item.description.split("\n").filter(Boolean)
              : [];

            return (
              <CarouselItem
                key={item.id ?? item.title}
                className="pl-5 basis-[82%] sm:basis-[50%] lg:basis-[37%] xl:basis-[33%]"
              >
                <motion.article
                  className="group flex h-full min-h-[33rem] flex-col overflow-hidden rounded-[30px] border border-[#ead8cc] bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(255,248,244,0.98)_100%)] shadow-[0_28px_70px_-52px_rgba(92,52,34,0.5)] sm:min-h-[35.5rem]"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <div className="relative shrink-0 overflow-hidden bg-[#f5ede4]">
                    <img
                      src={imageErrors[item.id] ? fallbackImage : item.imageSrc}
                      alt={item.title}
                      className="block h-auto w-full transition duration-700 group-hover:scale-[1.02]"
                      onError={() =>
                        setImageErrors((current) => ({
                          ...current,
                          [item.id]: true,
                        }))
                      }
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(92,52,34,0.04)_0%,rgba(92,52,34,0)_40%,rgba(92,52,34,0.18)_100%)]" />
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-4 pt-3.5 sm:px-6">
                    <div className="inline-flex w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#b18470]">
                      <span className="h-px w-6 bg-[#d9b9a8]" />
                      Tratamiento
                    </div>

                    <h3 className="mt-2.5 text-[1.24rem] font-semibold leading-[1.16] text-[#5c3422] sm:text-[1.36rem]">
                      {item.title}
                    </h3>

                    {lines.length > 0 ? (
                      <ul className="mt-2.5 space-y-0.5">
                        {lines.map((line) => (
                          <li key={line} className="text-sm leading-[1.55] text-[#8b6658]">
                            {line}
                          </li>
                        ))}
                      </ul>
                    ) : item.description ? (
                      <p className="mt-2.5 text-sm leading-[1.55] text-[#8b6658]">
                        {item.description}
                      </p>
                    ) : (
                      <p className="mt-2.5 text-sm leading-[1.55] text-[#8b6658]">
                        Conoce una experiencia de cuidado estetico profesional, delicada y personalizada.
                      </p>
                    )}

                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                      <Link
                        href={primaryHref}
                        className="inline-flex rounded-full bg-[#cb8e68] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_14px_28px_rgba(191,144,123,0.24)] transition hover:bg-[#b07450]"
                      >
                        {primaryLabel}
                      </Link>
                      <Link
                        href={secondaryHref}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b6658] transition hover:text-[#5c3422]"
                      >
                        {secondaryLabel}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <div className="mt-5 flex items-center justify-between gap-4 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => carouselApi?.scrollPrev()}
              aria-label="Desplazar servicios hacia la izquierda"
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#ead8cc] bg-white/80 text-[#cb8e68] shadow-[0_12px_24px_rgba(92,52,34,0.08)] transition hover:bg-[#fffaf7]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => carouselApi?.scrollNext()}
              aria-label="Desplazar servicios hacia la derecha"
              className="inline-flex size-10 items-center justify-center rounded-full border border-[#ead8cc] bg-white/80 text-[#cb8e68] shadow-[0_12px_24px_rgba(92,52,34,0.08)] transition hover:bg-[#fffaf7]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {items.length > 1 && (
            <div className="flex items-center gap-2">
              {items.map((item, index) => (
                <button
                  key={item.id ?? item.title}
                  type="button"
                  aria-label={`Ir a tarjeta ${index + 1}`}
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    currentIndex === index
                      ? "w-8 bg-[#cb8e68]"
                      : "w-2 bg-[#e8d5c4] hover:bg-[#cb8e68]/60"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 1 && (
          <div className="mt-5 hidden items-center justify-center gap-2 lg:flex">
            {items.map((item, index) => (
              <button
                key={item.id ?? item.title}
                type="button"
                aria-label={`Ir a tarjeta ${index + 1}`}
                onClick={() => carouselApi?.scrollTo(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "w-8 bg-[#cb8e68]"
                    : "w-2 bg-[#e8d5c4] hover:bg-[#cb8e68]/60"
                )}
              />
            ))}
          </div>
        )}
      </Carousel>
    </section>
  );
}

export default SparksCarousel;
