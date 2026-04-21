"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Nosotros", href: "/#porque-elegirnos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Promociones", href: "/#casos-clinicos" },
  { label: "Precios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = null;

    const updateProgress = () => {
      const y = window.scrollY || 0;
      const next = Math.min(y / 240, 1);

      setScrollProgress((current) => {
        if (Math.abs(current - next) < 0.01) return current;
        return next;
      });
      rafId = null;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const topAlpha = 0.72 + scrollProgress * 0.28;
  const middleAlpha = 0.68 + scrollProgress * 0.32;
  const bottomAlpha = 0.62 + scrollProgress * 0.38;
  const borderAlpha = 0.08 + scrollProgress * 0.18;
  const shadowAlpha = 0.06 + scrollProgress * 0.14;
  const blurPx = 14 + scrollProgress * 8;
  const borderWidth = 1;
  const navTextColor = "#8b5e4a";
  const mobileButtonTextColor = "#8b5e4a";
  const mobileButtonBg = "#ffffff";
  const mobileButtonBorder = "#e8d5c4";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color,border-width,backdrop-filter] duration-300"
      style={{
        background: `linear-gradient(180deg, rgba(250,246,242,${topAlpha}) 0%, rgba(245,237,228,${middleAlpha}) 48%, rgba(238,225,212,${bottomAlpha}) 100%)`,
        borderBottomColor: `rgba(192,132,104,${borderAlpha})`,
        borderBottomStyle: "solid",
        borderBottomWidth: `${borderWidth}px`,
        boxShadow: `0 12px 30px -24px rgba(92,52,34,${shadowAlpha})`,
        backdropFilter: `blur(${blurPx}px) saturate(110%)`,
      }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 md:h-24 md:px-8 lg:px-6">
        <Link href="/#inicio" aria-label="Ir al inicio" className="group flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <Image
              src="/logoavelie.png"
              alt="Logo Avelie"
              width={84}
              height={84}
              priority
              className="h-[60px] w-[60px] object-contain sm:h-[72px] sm:w-[72px]"
            />
          </div>
        </Link>

        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-9">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-[12px] font-medium uppercase tracking-[0.18em] transition-colors duration-300"
                  style={{ color: navTextColor }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/agendaProfesionales"
            aria-label="Agendar hora"
            className="hidden rounded-full border border-[#c08468] bg-[#c08468] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 ease-out hover:bg-[#a06848] sm:inline-flex sm:px-5 sm:py-2.5 sm:text-xs"
          >
            Agendar hora
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition sm:h-10 sm:w-10 lg:hidden"
            style={{
              borderColor: mobileButtonBorder,
              backgroundColor: mobileButtonBg,
              color: mobileButtonTextColor,
            }}
          >
            {isOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>
        </div>
      </div>

      <div
        className={[
          "overflow-hidden border-t border-[#e8d5c4] bg-[#faf6f2] backdrop-blur-xl lg:hidden",
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
          "transition-all duration-300 ease-out",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-4 sm:gap-2 sm:px-5 sm:py-5 md:px-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg border border-transparent px-4 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#5c3422] transition duration-300 hover:border-[#e8d5c4] hover:bg-[#f5ede4] sm:text-xs"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/agendaProfesionales"
            onClick={() => setIsOpen(false)}
            aria-label="Agendar hora desde menu movil"
            className="mt-2 rounded-lg border border-[#c08468] bg-[#c08468] px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition duration-300 hover:bg-[#a06848] sm:text-xs"
          >
            Agendar hora
          </Link>
        </div>
      </div>
    </header>
  );
}
