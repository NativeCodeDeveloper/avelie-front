'use client'
import {Suspense} from "react";
import {useSearchParams} from "next/navigation";

function ReservaHoraContent() {
    const searchParams = useSearchParams();
    const fechaInicio = searchParams.get('fecha') || '';
    const horaInicio = searchParams.get('hora') || '';
    const emailPaciente = searchParams.get('email') || '';

  return (
    <section className="relative min-h-[70vh] w-full px-4 py-10 flex items-center justify-center bg-[#faf6f2]">
      {/* Fondos decorativos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#cb8e68]/20 via-[#e8d5c4]/30 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 right-[-80px] h-[380px] w-[380px] rounded-full bg-gradient-to-br from-[#c58364]/15 via-[#e8d5c4]/20 to-transparent blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="rounded-3xl border border-[#e8d5c4] bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(92,52,34,0.18)]">

          {/* Header */}
          <div className="flex items-start gap-4 p-7 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#faf0e8] border border-[#e8d5c4]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#cb8e68]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="flex-1">
              <span className="inline-flex items-center rounded-full bg-[#cb8e68] px-3 py-1 text-xs font-semibold text-white shadow">
                Reserva confirmada
              </span>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#5c3422]">
                ¡Tu hora está reservada!
              </h1>

              <p className="mt-2 text-[#8b5e4a]">
                Tu sesión con{" "}
                <span className="font-semibold text-[#5c3422]">
                  Avelie Centro Estético
                </span>{" "}
                ha sido reservada con éxito.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#e8d5c4] to-transparent" />

          {/* Body */}
          <div className="p-7 sm:p-8">
            <div className="rounded-2xl border border-[#e8d5c4] bg-white p-5 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#faf0e8] border border-[#e8d5c4]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#cb8e68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#5c3422]">Servicio</p>
                    <p className="text-sm text-[#8b5e4a]">Tratamiento estético Avelie</p>
                  </div>
                </div>

                <div className="h-px w-full bg-[#f0e4d8]" />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#faf0e8] border border-[#e8d5c4]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#cb8e68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M5 11h14M5 19h14M6 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#5c3422]">Fecha y hora</p>
                    <p className="text-sm text-[#8b5e4a]">{fechaInicio} - {horaInicio}</p>
                  </div>
                </div>

                <div className="h-px w-full bg-[#f0e4d8]" />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#faf0e8] border border-[#e8d5c4]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#cb8e68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#5c3422]">Duración</p>
                    <p className="text-sm text-[#8b5e4a]">60 Minutos</p>
                  </div>
                </div>

                <div className="h-px w-full bg-[#f0e4d8]" />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#faf0e8] border border-[#e8d5c4]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#cb8e68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.35 7-11a7 7 0 0 0-14 0c0 6.65 7 11 7 11z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#5c3422]">Ubicación</p>
                    <p className="text-sm text-[#8b5e4a]">Manuel Montt 252, Providencia · Oficina 203</p>
                  </div>
                </div>

                {emailPaciente ? (
                  <>
                    <div className="h-px w-full bg-[#f0e4d8]" />
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#faf0e8] border border-[#e8d5c4]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#cb8e68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#5c3422]">Confirmación enviada a</p>
                        <p className="text-sm text-[#8b5e4a] break-all">{emailPaciente}</p>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#e8d5c4] bg-[#faf0e8] p-5">
              <p className="text-sm font-semibold text-[#5c3422]">
                ¡Tu cita ha sido confirmada!
              </p>
              <p className="mt-3 text-sm text-[#8b5e4a] leading-relaxed">
                Recuerda asistir puntualmente. Si necesitas cancelar o reagendar, comunícate con nosotros con al menos 24 horas de anticipación al <span className="font-semibold">+56 9 4679 1144</span> o a <span className="font-semibold">Esteticaavelie@gmail.com</span>.
              </p>
            </div>

            <div className="mt-7 flex flex-col items-center gap-3">
              <a
                href="/agendaProfesionales"
                className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-[#cb8e68] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#b07450] focus:outline-none"
              >
                Agendar otra sesión
              </a>

              <a
                href="/"
                className="text-sm font-semibold text-[#8b5e4a] hover:text-[#5c3422]"
              >
                Volver al inicio
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default function ReservaHora() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center text-[#8b5e4a]">Cargando...</div>}>
      <ReservaHoraContent />
    </Suspense>
  );
}
