"use client";

import MinimalHeroSection from "@/components/ui/minimal-hero-section";

const features = [
  {
    title: "Atencion cercana",
    description: "Escuchamos lo que buscas para construir una experiencia hecha a tu medida.",
  },
  {
    title: "Tecnologia profesional",
    description: "Combinamos evaluacion experta y protocolos seguros para cuidar cada detalle.",
  },
  {
    title: "Resultados armoniosos",
    description: "Priorizamos cambios sutiles, elegantes y coherentes con tu belleza natural.",
  },
];

export default function Seccion1() {
  return (
    <MinimalHeroSection
      id="porque-elegirnos"
      title="En Avelie la estetica se vive como una experiencia de confianza."
      description="Creamos un espacio femenino, delicado y profesional donde cada tratamiento busca potenciar tu belleza con naturalidad, tecnologia y una atencion genuinamente personalizada."
      primaryCta={{ href: "/agendaProfesionales", label: "Reservar evaluacion" }}
      secondaryCta={{ href: "/#servicios", label: "Explorar servicios" }}
      features={features}
      imageSrc="/depilacion4.webp"
      imageAlt="La mejor experiencia de cuidado estetico en Avelie"
      footnotes={[
        "Atencion personalizada",
        "La mejor tecnología",
        "Resultados sutiles",
      ]}
    />
  );
}
