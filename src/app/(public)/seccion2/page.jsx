'use client'

import RevealOnScroll from "@/Componentes/RevealOnScroll";
import Services3DCarousel from "@/components/ui/services-3d-carousel";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Seccion2() {
  const API = process.env.NEXT_PUBLIC_API_URL || "https://bartelsmansalud.nativecode.cl";
  const [infoData, setInfoData] = useState([]);

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
  const items = content.map((service) => ({
    id: service.id,
    title: service.name,
    description: service.description,
    imageSrc: service.image,
  }));

  return (
    <div id="servicios" className="scroll-mt-24">
      <RevealOnScroll>
        <Services3DCarousel
          sectionTitle="Nuestros Servicios"
          sectionSubtitle="Tratamientos seleccionados para una experiencia femenina, delicada y profesional."
          items={items}
          fallbackImage="/logo_transparent.png"
        />
      </RevealOnScroll>
    </div>
  );
}
