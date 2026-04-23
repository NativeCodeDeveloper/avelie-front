"use client";

import React from "react";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function ServiceFeatureCard({
  feature,
  fallbackImage,
  imageErrors,
  setImageErrors,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}) {
  const lines = feature.description
    ? feature.description.split("\n").filter(Boolean)
    : [];

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-[28px] border-[#ead8cc] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,248,244,0.98)_100%)] shadow-[0_20px_44px_-34px_rgba(92,52,34,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-36px_rgba(92,52,34,0.48)]">
      <div className="relative overflow-hidden bg-[#f3e6dc]">
        <img
          src={imageErrors[feature.id] ? fallbackImage : feature.imageSrc}
          alt={feature.title}
          className="block h-auto w-full transition-transform duration-500 hover:scale-[1.03]"
          onError={() =>
            setImageErrors((current) => ({
              ...current,
              [feature.id]: true,
            }))
          }
        />
      </div>

      <CardHeader className="px-5 pb-3 pt-5">
        {feature.eyebrow ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#b18470]">
            {feature.eyebrow}
          </p>
        ) : null}
        <CardTitle className="mt-2 text-[1.24rem] leading-[1.12] text-[#5c3422]">
          {feature.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col px-5 pb-5 pt-0">
        {lines.length > 0 ? (
          <ul className="space-y-1.5">
            {lines.map((line) => (
              <li key={line} className="text-sm leading-[1.6] text-[#8b6658]">
                {line}
              </li>
            ))}
          </ul>
        ) : (
          <CardDescription className="text-sm leading-[1.65] text-[#8b6658]">
            {feature.description || "Descubre un tratamiento pensado para una experiencia de cuidado premium."}
          </CardDescription>
        )}
      </CardContent>

      <CardFooter className="mt-auto flex flex-wrap items-center gap-3 px-5 pb-5 pt-0">
        <Link
          href={primaryHref}
          className="inline-flex rounded-full bg-[#cb8e68] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_14px_28px_rgba(191,144,123,0.24)] transition hover:bg-[#b07450]"
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryHref}
          className="inline-flex rounded-full border border-[#dcc5b8] bg-white/80 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d4b3d] transition hover:bg-[#fff7f2]"
        >
          {secondaryLabel}
        </Link>
      </CardFooter>
    </Card>
  );
}

export default function FeatureGridEnterpriseGrade({
  features,
  sectionTitle,
  sectionSubtitle,
  className,
  fallbackImage = "/logo_transparent.png",
  primaryHref = "/agendaProfesionales",
  primaryLabel = "Reservar ahora",
  secondaryHref = "/servicios",
  secondaryLabel = "Ver precios",
}) {
  const [imageErrors, setImageErrors] = React.useState({});

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section
      className={cn("bg-transparent text-foreground", className)}
      role="region"
      aria-label={sectionTitle ? `Servicios: ${sectionTitle}` : "Servicios"}
    >
      <div className="mx-auto max-w-7xl">
        {(sectionTitle || sectionSubtitle) && (
          <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
            {sectionTitle ? (
              <h2 className="!text-[clamp(2rem,3vw,3rem)] font-semibold tracking-[-0.03em] text-[#5f3c2f]">
                {sectionTitle}
              </h2>
            ) : null}
            {sectionSubtitle ? (
              <p className="mt-4 !text-[clamp(0.98rem,1.2vw,1.08rem)] !leading-[1.75] text-[#8b6658]">
                {sectionSubtitle}
              </p>
            ) : null}
          </div>
        )}

        <div className="grid gap-6 sm:gap-7 md:grid-cols-2 xl:grid-cols-3" role="list">
          {features.map((feature) => (
            <div key={feature.id} role="listitem">
              <ServiceFeatureCard
                feature={feature}
                fallbackImage={fallbackImage}
                imageErrors={imageErrors}
                setImageErrors={setImageErrors}
                primaryHref={primaryHref}
                primaryLabel={primaryLabel}
                secondaryHref={secondaryHref}
                secondaryLabel={secondaryLabel}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
