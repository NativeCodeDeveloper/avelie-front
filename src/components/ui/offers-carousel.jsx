"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function OfferCard({ item, fallbackImage, imageErrors, setImageErrors, itemCtaHref, itemCtaText }) {
  return (
    <motion.article
      className="group w-[18rem] flex-shrink-0"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
    >
      <div className="overflow-hidden rounded-[24px] border border-[#ead8cc] bg-white text-[#5c3422] shadow-[0_16px_36px_-28px_rgba(92,52,34,0.38)]">
        <div className="relative overflow-hidden bg-[#f3e6dc]">
          <img
            src={imageErrors[item.id] ? fallbackImage : item.imageUrl}
            alt={item.title}
            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() =>
              setImageErrors((current) => ({
                ...current,
                [item.id]: true,
              }))
            }
          />
          {item.badge ? (
            <div className="absolute bottom-3 right-3 rounded-full bg-[#231815]/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_12px_20px_rgba(35,24,21,0.24)]">
              {item.badge}
            </div>
          ) : null}
        </div>

        <div className="px-4 pb-5 pt-4">
          {item.eyebrow ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a27763]">
              {item.eyebrow}
            </p>
          ) : null}

          <h3 className="mt-2 text-[1.08rem] font-semibold leading-[1.12] text-[#2f211b]">
            {item.title}
          </h3>

          {item.subtitle ? (
            <p className="mt-2 text-sm leading-[1.55] text-[#7d6b62]">
              {item.subtitle}
            </p>
          ) : null}

          {item.detail ? (
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a27763]">
              {item.detail}
            </p>
          ) : null}

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              href={itemCtaHref}
              className="inline-flex rounded-full border border-[#dcc5b8] bg-white px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d4b3d] transition hover:bg-[#fff7f2]"
            >
              {itemCtaText}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export const OffersCarousel = React.forwardRef(function OffersCarousel(
  {
    offerTitle,
    offerSubtitle,
    ctaText,
    ctaHref = "/agendaProfesionales",
    onCtaClick,
    items,
    className,
    fallbackImage = "/Pub2.png",
    itemCtaHref = "/agendaProfesionales",
    itemCtaText = "Reservar ahora",
  },
  ref
) {
  const carouselRef = React.useRef(null);
  const [imageErrors, setImageErrors] = React.useState({});
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  const checkScrollPosition = React.useCallback(() => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setIsAtStart(scrollLeft < 10);
    setIsAtEnd(scrollWidth - scrollLeft - clientWidth < 10);
  }, []);

  const scroll = React.useCallback((direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.82;
    const newScrollLeft =
      carouselRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);
    carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    const currentCarousel = carouselRef.current;
    if (!currentCarousel) return;

    currentCarousel.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      currentCarousel.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition, items]);

  return (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full max-w-[72rem] rounded-[30px] border border-[#ead8cc] bg-white p-4 shadow-[0_26px_60px_-48px_rgba(92,52,34,0.3)] md:p-6",
        className
      )}
    >
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-6">
        <div className="flex flex-col items-center justify-start pt-1 text-center lg:items-start lg:text-left">
          <p className="text-sm leading-none text-[#8d837d]">
            Promociones activas en Avelie
          </p>
          <h2 className="mt-4 text-[clamp(1.9rem,2.7vw,2.7rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#2f211b]">
            {offerTitle}
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-[1.68] text-[#7d6b62]">
            {offerSubtitle}
          </p>

          <Button
            variant="outline"
            className="mt-5 w-full max-w-xs rounded-[18px] border-[#ddd6d1] bg-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2f211b] hover:bg-[#faf7f5] lg:w-auto"
            onClick={onCtaClick}
            asChild={!onCtaClick}
          >
            {onCtaClick ? (
              <span>{ctaText}</span>
            ) : (
              <Link href={ctaHref}>{ctaText}</Link>
            )}
          </Button>
        </div>

        <div className="relative self-start">
          <div ref={carouselRef} className="hide-scrollbar overflow-x-auto">
            <div className="flex gap-4 px-1 py-1">
              {items.map((item) => (
                <OfferCard
                  key={item.id}
                  item={item}
                  fallbackImage={fallbackImage}
                  imageErrors={imageErrors}
                  setImageErrors={setImageErrors}
                  itemCtaHref={itemCtaHref}
                  itemCtaText={itemCtaText}
                />
              ))}
            </div>
          </div>

          {!isAtStart && (
            <button
              type="button"
              className="absolute left-0 top-1/2 z-10 hidden h-14 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[18px] bg-[#171210] text-white shadow-[0_16px_32px_rgba(23,18,16,0.18)] transition hover:bg-[#2a211d] lg:inline-flex"
              onClick={() => scroll("left")}
              aria-label="Desplazar promociones hacia la izquierda"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {!isAtEnd && (
            <button
              type="button"
              className="absolute right-0 top-1/2 z-10 hidden h-14 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[18px] bg-[#171210] text-white shadow-[0_16px_32px_rgba(23,18,16,0.18)] transition hover:bg-[#2a211d] lg:inline-flex"
              onClick={() => scroll("right")}
              aria-label="Desplazar promociones hacia la derecha"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default OffersCarousel;
