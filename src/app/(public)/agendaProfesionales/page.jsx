"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AgendaProfesionales() {
  const API = process.env.NEXT_PUBLIC_API_URL || "https://bartelsmansalud.nativecode.cl";
  const router = useRouter();
  const [listaProfesionales, setListaProfesionales] = useState([]);

  function irAgendaProfesional(id_profesional) {
    router.push(`/agendaEspecificaProfersional/${id_profesional}`);
  }

  async function seleccionarProfesionales() {
    try {
      const res = await fetch(`${API}/profesionales/seleccionarTodosProfesionales`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      const dataProfesionales = await res.json();
      setListaProfesionales(dataProfesionales);
    } catch {
      return toast.error("No ha sido posible listar profesionales, contacte a soporte IT");
    }
  }

  useEffect(() => {
    seleccionarProfesionales();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#faf6f2] px-4 py-16 text-[#5c3422] sm:px-6 sm:py-24 lg:px-8">

      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#c08468]">
            Avelie Centro Estetico
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#5c3422] sm:text-5xl">
            Agenda tu sesion
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#8b5e4a]">
            Selecciona un profesional para revisar disponibilidad y reservar tu hora.
          </p>
          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e8d5c4]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#c9a870]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e8d5c4]" />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {listaProfesionales.map((profesional, index) => (
            <button
              key={profesional.id_profesional}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => irAgendaProfesional(profesional.id_profesional)}
              className="group relative flex min-h-[248px] w-full flex-col overflow-hidden rounded-3xl border border-[#e8d5c4] bg-white p-7 text-left shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c08468] hover:shadow-[0_20px_40px_-24px_rgba(92,52,34,0.2)] sm:p-8"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#c08468]/0 blur-3xl transition-all duration-500 group-hover:bg-[#c08468]/12" />
              <div className="absolute left-0 top-0 h-[3px] w-0 bg-gradient-to-r from-[#c08468] to-[#e8b090] transition-all duration-500 group-hover:w-full" />

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#e8d5c4] bg-[#faf0e8] text-base font-bold text-[#c08468] transition-all duration-300 group-hover:border-[#c08468]/40 group-hover:bg-[#f5e0d0]">
                {profesional.nombreProfesional?.charAt(0)}
              </div>

              <h2 className="mt-5 text-lg font-semibold tracking-[0.01em] text-[#5c3422]">
                {profesional.nombreProfesional}
              </h2>
              <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-[#8b5e4a]">
                {profesional.descripcionProfesional}
              </p>

              <div className="mt-6 flex w-full items-center justify-between border-t border-[#f0e4da] pt-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c08468] transition-colors duration-300 group-hover:text-[#a06848]">
                  Ver agenda
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e8d5c4] bg-[#faf0e8] transition-all duration-300 group-hover:border-[#c08468]/40 group-hover:bg-[#f5e0d0]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#c08468] transition-all duration-300 group-hover:translate-x-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
