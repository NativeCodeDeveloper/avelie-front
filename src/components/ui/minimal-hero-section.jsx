"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

const STYLE_ID = "avelie-minimal-hero-section";

const defaultFeatures = [
  {

    title: "Atencion cercana",
    description: "Cada tratamiento se adapta a tu piel, tus tiempos y tus objetivos.",
  },
  {
    
    title: "Tecnologia segura",
    description: "Protocolos profesionales y equipamiento pensado para resultados confiables.",
  },
  {
    iconName: "sparkles",
    title: "Belleza natural",
    description: "Buscamos potenciar tu imagen con un acabado sutil, armonico y elegante.",
  },
];

const defaultFootnotes = [
  "Cuidado personalizado",
  "Tecnologia avanzada",
  "Resultados elegantes",
];

export default function MinimalHeroSection({
  id,
  className,
  eyebrow = "Nuestro enfoque",
  title = "En Avelie creemos en la belleza real.",
  description = "Lo que nos distingue es la conexion genuina con cada persona. La estetica aqui se vive como una experiencia de cuidado, confianza y sofisticacion.",
  primaryCta = { href: "/agendaProfesionales", label: "Reservar evaluacion" },
  secondaryCta = { href: "/#servicios", label: "Ver tratamientos" },
  features = defaultFeatures,
  imageSrc = "/depilacion4.webp",
  imageAlt = "Tratamiento estetico premium en Avelie",
  footnotes = defaultFootnotes,
}) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.innerHTML = `
      @keyframes avelie-minimal-reveal {
        0% {
          opacity: 0;
          transform: translate3d(0, 30px, 0) scale(0.98);
          filter: blur(10px);
        }
        65% {
          filter: blur(0);
        }
        100% {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          filter: blur(0);
        }
      }
      .avelie-minimal-shell {
        display: grid;
        gap: clamp(1.75rem, 5vw, 3rem);
        grid-template-columns: minmax(0, 1.04fr) minmax(320px, 0.96fr);
        align-items: center;
      }
      .avelie-minimal-copy {
        display: flex;
        flex-direction: column;
        gap: clamp(1.4rem, 3vw, 2rem);
        align-items: flex-start;
      }
      .avelie-minimal-lede {
        display: flex;
        flex-direction: column;
        gap: clamp(0.9rem, 2vw, 1.3rem);
      }
      .avelie-minimal-cta {
        display: flex;
        gap: 0.9rem;
        flex-wrap: wrap;
        align-items: center;
      }
      .avelie-minimal-image {
        position: relative;
        overflow: hidden;
        border-radius: clamp(1.6rem, 3vw, 2.5rem);
        min-height: clamp(21rem, 42vw, 34rem);
      }
      .avelie-minimal-image::after {
        content: "";
        position: absolute;
        inset: 0;
        background:
          linear-gradient(180deg, rgba(66, 42, 31, 0.02), rgba(66, 42, 31, 0.14)),
          linear-gradient(145deg, rgba(255, 255, 255, 0.35), transparent 48%);
      }
      .avelie-minimal-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .avelie-minimal-footnote {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
        font-size: 0.72rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
      }
      @media (max-width: 920px) {
        .avelie-minimal-shell {
          grid-template-columns: 1fr;
        }
        .avelie-minimal-copy {
          align-items: center;
          text-align: center;
        }
        .avelie-minimal-cta {
          justify-content: center;
        }
        .avelie-minimal-image {
          order: -1;
          width: min(100%, 34rem);
          justify-self: center;
          min-height: clamp(18rem, 68vw, 28rem);
        }
        .avelie-minimal-footnote {
          justify-content: center;
          text-align: center;
        }
      }
      @media (max-width: 640px) {
        .avelie-minimal-cta {
          width: 100%;
          flex-direction: column;
        }
        .avelie-minimal-cta > * {
          width: 100%;
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      if (style.parentNode) style.remove();
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      className={cn("relative overflow-hidden bg-[#f0e8df] py-20 sm:py-28", className)}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#e8d5c4] blur-[80px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#dcc5b0] blur-[80px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
        <div
          ref={sectionRef}
          className={cn(
            "rounded-[32px] border border-[#dcc5b0] bg-[#faf5f0]/80 p-6 shadow-[0_24px_80px_-56px_rgba(42,24,16,0.22)] backdrop-blur-sm sm:p-8 lg:p-10",
            visible ? "animate-[avelie-minimal-reveal_0.9s_cubic-bezier(.22,.68,0,1)_forwards]" : "opacity-0"
          )}
        >
          <div className="avelie-minimal-shell">
            <div className="avelie-minimal-copy">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#e9d8cc] bg-[#fffaf6] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#b18470] shadow-[0_10px_24px_rgba(92,52,34,0.06)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d5ae93]" />
                {eyebrow}
              </div>

              <div className="avelie-minimal-lede">
                <h2 className="max-w-xl !text-[clamp(2.2rem,4.4vw,4.2rem)] font-light !leading-[1.02] tracking-[-0.02em] text-[#5f3c2f]">
                  {title}
                </h2>
                <p className="max-w-xl !text-[clamp(0.98rem,1.35vw,1.12rem)] !leading-[1.78] text-[#8b6658]">
                  {description}
                </p>
              </div>

              <div className="avelie-minimal-cta">
                <Link
                  href={primaryCta.href}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#cb8e68] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_14px_30px_rgba(191,144,123,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#b07450] hover:shadow-[0_18px_36px_rgba(191,144,123,0.3)]"
                >
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href={secondaryCta.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#dcc5b8] bg-white/80 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6f4d40] shadow-[0_10px_24px_rgba(92,52,34,0.06)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#fffaf7]"
                >
                  {secondaryCta.label}
                </Link>
              </div>

              {features.length > 0 && (
                <div className="grid w-full gap-3 sm:grid-cols-3">
                  {features.map(({ title: featureTitle, description: featureDescription }) => (
                    <div
                      key={featureTitle}
                      className="rounded-[22px] border border-[#efe1d7] bg-[#fffaf7]/90 p-4 text-left shadow-[0_14px_40px_-34px_rgba(92,52,34,0.35)]"
                    >
                      <h3 className="text-sm font-semibold tracking-[0.04em] text-[#5f3c2f]">
                        {featureTitle}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#8b6658]">
                        {featureDescription}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <figure className="avelie-minimal-image border border-white/60 bg-[#f5e9df] shadow-[0_24px_60px_-40px_rgba(92,52,34,0.5)]">
              <img src={imageSrc} alt={imageAlt} loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="rounded-[24px] border border-white/40 bg-[#fffaf6]/74 px-5 py-4 backdrop-blur-md">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b18470]">
                    Experiencia Avelie
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#6f4d40]">
                    Un tratamiento bien guiado no solo transforma la piel: cambia como te sientes contigo misma.
                  </p>
                </div>
              </div>
            </figure>
          </div>
        </div>

        <div className="avelie-minimal-footnote mt-8 px-1 text-[#9c7a6b]">
          {footnotes.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
