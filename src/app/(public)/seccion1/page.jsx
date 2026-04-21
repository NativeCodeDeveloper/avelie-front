import RevealOnScroll from "@/Componentes/RevealOnScroll";
import { Target, ShieldCheck, TrendingUp } from "lucide-react";

const features = [
  { icon: Target, label: "Atencion personalizada" },
  { icon: ShieldCheck, label: "Tecnologia profesional" },
  { icon: TrendingUp, label: "Resultados progresivos" },
];

export default function Seccion1() {
  return (
    <section id="porque-elegirnos" className="scroll-mt-24 overflow-hidden bg-[#faf6f2] py-20 sm:py-28">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">

        {/* Texto izquierda */}
        <RevealOnScroll>
          <div>
            <h2 className="text-balance text-4xl font-semibold leading-[1.1] text-[#5c3422] sm:text-5xl">
              En Avelié creemos en la belleza real...
            </h2>
            <p className="mt-5 text-base leading-7 text-[#8b5e4a]">
              Lo que nos distingue es la conexion genuina con cada persona que atendemos. En Avelie, la estetica
              va mas alla del tratamiento: es una experiencia de cuidado y confianza.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c9a870]/50 bg-[#f9f5e8] text-[#a68040]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-base font-medium text-[#5c3422]">{label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 border-l-2 border-[#c9a870] pl-4 text-sm italic leading-7 text-[#a68040]">
              "Amamos nuestra profesion y ese amor se refleja en cada persona que tratamos."
            </p>
          </div>
        </RevealOnScroll>

        {/* Imagen derecha */}
        <RevealOnScroll className="h-full">
          <div className="relative h-[420px] overflow-hidden rounded-3xl bg-[#f0e0d0] sm:h-[500px] lg:h-[580px]">
            <img
              src="/logoavelie.png"
              alt="Profesional Avelie realizando tratamiento"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </RevealOnScroll>

      </div>
    </section>
  );
}
