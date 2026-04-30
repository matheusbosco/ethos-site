"use client";

import { useRef, useEffect, useState } from "react";

const steps = [
  {
    number: "01",
    categoria: "Diagnóstico",
    title: "Diagnóstico",
    description:
      "Mapeamos o processo real, não o idealizado. Medimos o custo atual em tempo, foco e dinheiro, e identificamos exatamente onde a IA pode intervir.",
    badge: "Entregue em até 5 dias",
  },
  {
    number: "02",
    categoria: "Planejamento",
    title: "Planejamento",
    description:
      "Projetamos a solução sob medida: fluxos, agentes, integrações. Nada genérico. Você aprova cada etapa antes de começarmos a construir.",
    badge: "Prioridades definidas juntos",
  },
  {
    number: "03",
    categoria: "Implementação",
    title: "Implementação",
    description:
      "Construímos, testamos e documentamos. A solução roda na nossa infraestrutura. Qualidade e segurança ficam por nossa conta.",
    badge: "Live em até 3 semanas",
  },
  {
    number: "04",
    categoria: "Acompanhamento",
    title: "Acompanhamento",
    description:
      "A solução entra em operação e continuamos juntos. Ajustamos, evoluímos e respondemos pelo que entregamos. A gente não some quando tudo começa a rodar.",
    badge: "Revisão mensal contínua",
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="processo"
      className="w-full bg-[#2C2620] px-6 py-20 md:py-28 border-t border-white/8"
    >
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-5 h-px bg-[#C89A4F]/50" />
            <p className="text-[0.62rem] font-semibold text-[#C89A4F] tracking-[0.25em] uppercase">
              Como funciona
            </p>
          </div>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight mb-16 max-w-lg"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Como trabalhamos juntos.
          </h2>
        </div>

        {/* Steps — lista com divisores */}
        <div className="flex flex-col divide-y divide-white/8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col md:flex-row gap-6 py-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: visible ? `${200 + i * 100}ms` : "0ms" }}
            >
              {/* Número */}
              <span className="text-[0.7rem] font-bold text-[#C89A4F] tracking-widest w-8 shrink-0 pt-1">
                {step.number}
              </span>

              {/* Conteúdo */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 flex-1">
                <h3
                  className="text-xl font-extrabold text-white tracking-tight md:w-44 shrink-0"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {step.title}
                </h3>
                <div className="flex-1 flex flex-col gap-3">
                  <p className="text-base text-[#8BA5BB] leading-[1.8]">
                    {step.description}
                  </p>
                  {/* Badge da etapa */}
                  <span className="inline-flex items-center gap-1.5 w-fit text-[0.62rem] font-semibold text-[#C89A4F]/80 border border-[#C89A4F]/25 bg-[#C89A4F]/8 rounded-full px-3 py-1.5 tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89A4F]/60" />
                    {step.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
