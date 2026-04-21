'use client'

import Link from "next/link";
import RevealOnScroll from "@/Componentes/RevealOnScroll";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Seccion2() {
  const API = process.env.NEXT_PUBLIC_API_URL || "https://bartelsmansalud.nativecode.cl";
  const [infoData, setInfoData] = useState([]);
  const [imageErrors, setImageErrors] = useState({});
  const [carouselApi, setCarouselApi] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const fallbackServices = [
    {
      id: "srv-1",
      name: "Depilacion Laser",
      description: "Resultados progresivos\nTecnologia segura",
      image: "/logo_transparent.png",
    },
    {
      id: "srv-2",
      name: "Lipolaser",
      description: "Reduccion grasa localizada\nNo invasivo",
      image: "/logo_transparent.png",
    },
    {
      id: "srv-3",
      name: "Evaluacion Personalizada",
      description: "Diagnostico profesional\nPlan adaptado a cada cliente",
      image: "/logo_transparent.png",
    },
  ];

  async function loadServices() {
    try {
      const mapTituloDetalle = (items) =>
        items.map((item, index) => ({
          id: `titulo-${item.id_publicacionesTituloDescripcion ?? index}`,
          name: (item.publicacionesTitulo || "").trim() || `Publicacion ${index + 1}`,
          description: (item.publicacionesDescripcion || "").trim() || "",
          image: item.publicacionesTituloDescripcionImagen
            ? `https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${item.publicacionesTituloDescripcionImagen}/card`
            : "/logo_transparent.png",
        }));

      const mapPublicaciones = (items) =>
        items.map((item, index) => ({
          id: `publicacion-${item.id_publicaciones ?? index}`,
          name: (item.descripcionPublicaciones || "").trim() || `Publicacion ${index + 1}`,
          description: "",
          image: item.imagenPublicaciones_primera
            ? `https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${item.imagenPublicaciones_primera}/full`
            : "/logo_transparent.png",
        }));

      const resTitulo = await fetch(`${API}/publicacionesTituloDetalle/seleccionarPublicacionesTituloDetalle`, {
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
      });

      if (resTitulo.ok) {
        const dataTitulo = await resTitulo.json();
        const activeTitulo = Array.isArray(dataTitulo)
          ? dataTitulo.filter((item) => Number(item.publicacionesTituloDescripcion_estado ?? 1) === 1)
          : [];

        if (activeTitulo.length > 0) {
          setInfoData(mapTituloDetalle(activeTitulo));
          return;
        }
      }

      const resPublicaciones = await fetch(`${API}/publicaciones/seleccionarPublicaciones`, {
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
      });

      if (!resPublicaciones.ok) {
        setInfoData([]);
        return toast.error(`No ha sido posible cargar las imagenes del sistema contacte a soporte de NativeCode`);
      }

      const dataPublicaciones = await resPublicaciones.json();
      const activePublicaciones = Array.isArray(dataPublicaciones)
        ? dataPublicaciones.filter((item) => Number(item.estadoPublicacion ?? 1) === 1)
        : [];
      setInfoData(mapPublicaciones(activePublicaciones));
    } catch {
      setInfoData([]);
      return toast.error(`No ha sido posible cargar las imagenes del sistema contacte a soporte de NativeCode`);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  const content = infoData.length > 0 ? infoData : fallbackServices;

  useEffect(() => {
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

  useEffect(() => {
    if (!carouselApi || content.length <= 1) return;

    const intervalId = setInterval(() => {
      carouselApi.scrollNext();
    }, 5200);

    return () => clearInterval(intervalId);
  }, [carouselApi, content.length]);

  return (
    <section id="servicios" className="scroll-mt-24 bg-[#faf6f2] py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">

        {/* Título centrado con divisores */}
        <RevealOnScroll>
          <div className="mb-12 flex items-center gap-5">
            <div className="h-px flex-1 bg-[#c9a870]/45" />
            <h2 className="text-2xl font-semibold tracking-wide text-[#5c3422] sm:text-3xl">
              Servicios
            </h2>
            <div className="h-px flex-1 bg-[#c9a870]/45" />
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="relative">
            <Carousel
              setApi={setCarouselApi}
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-5">
                {content.map((service) => {
                  const lines = service.description
                    ? service.description.split("\n").filter(Boolean)
                    : [];

                  return (
                    <CarouselItem
                      key={service.id ?? service.name}
                      className="pl-5 basis-[88%] sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8d5c4] bg-white shadow-sm">
                        {/* Imagen fija misma altura en todas */}
                        <div className="relative h-72 shrink-0 overflow-hidden bg-[#f5ede4] sm:h-80">
                          <img
                            src={imageErrors[service.id] ? "/logo_transparent.png" : service.image}
                            alt={service.name}
                            className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.04]"
                            onError={() =>
                              setImageErrors((current) => ({
                                ...current,
                                [service.id]: true,
                              }))
                            }
                          />
                        </div>

                        {/* Texto abajo, siempre visible */}
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-lg font-semibold leading-snug text-[#5c3422] sm:text-xl">
                            {service.name}
                          </h3>

                          {lines.length > 0 ? (
                            <ul className="mt-2 space-y-1">
                              {lines.map((line) => (
                                <li key={line} className="text-sm leading-relaxed text-[#8b5e4a]">
                                  {line}
                                </li>
                              ))}
                            </ul>
                          ) : service.description ? (
                            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#8b5e4a]">
                              {service.description}
                            </p>
                          ) : null}

                          <div className="mt-auto flex items-center gap-3 pt-5">
                            <Link
                              href="/agendaProfesionales"
                              className="inline-flex rounded-full bg-[#c08468] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#a06848]"
                            >
                              Reservar ahora
                            </Link>
                            <Link
                              href="/servicios"
                              className="inline-flex items-center gap-1 text-xs font-medium text-[#8b5e4a] transition hover:text-[#5c3422]"
                            >
                              Ver precios
                              <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              <CarouselPrevious className="left-2 top-1/2 z-20 -translate-y-1/2 border-[#e8d5c4] bg-white text-[#c08468] hover:bg-[#faf0e8] disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-35" />
              <CarouselNext className="right-2 top-1/2 z-20 -translate-y-1/2 border-[#e8d5c4] bg-white text-[#c08468] hover:bg-[#faf0e8] disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-35" />
            </Carousel>

            {content.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {content.map((item, index) => (
                  <button
                    key={item.id ?? item.name}
                    type="button"
                    aria-label={`Ir a publicacion ${index + 1}`}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={[
                      "h-2 rounded-full transition-all duration-300",
                      currentIndex === index ? "w-7 bg-[#c08468]" : "w-2 bg-[#e8d5c4] hover:bg-[#c08468]/60",
                    ].join(" ")}
                  />
                ))}
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
