"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useContact } from "@/contexts/ContactContext";

export function CtaFinal() {
  const { open } = useContact();

  return (
    <section className="relative w-full bg-[#1C2B3A] px-6 py-28 md:py-40 overflow-hidden">
      {/* Watermark tipográfico */}
      <div
        className="absolute right-0 inset-y-0 flex items-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-[family-name:var(--font-heading)] italic font-bold text-white/[0.028] leading-none translate-x-8"
          style={{ fontSize: "clamp(8rem, 18vw, 20rem)" }}>
          Ethos
        </span>
      </div>

      {/* Linha decorativa topo */}
      <div className="absolute top-0 left-6 right-6 h-px bg-white/8" />

      <div className="mx-auto max-w-5xl relative z-10">
        <Reveal>
          {/* Label */}
          <div className="flex items-center gap-3 mb-14">
            <div className="w-6 h-px bg-white/20" />
            <p className="font-[family-name:var(--font-mono)] text-[0.62rem] text-white/25 tracking-[0.25em] uppercase">
              Próximo passo
            </p>
          </div>

          {/* Headline principal — Libre Baskerville italic, autoridade máxima */}
          <h2 className="font-[family-name:var(--font-heading)] italic text-[2.8rem] md:text-[4rem] lg:text-[5rem] font-normal text-[#F0E9D6] leading-[1.08] tracking-tight mb-8 max-w-2xl">
            Inteligência sob medida começa aqui.
          </h2>

          {/* CTA */}
          <button
            onClick={open}
            className="inline-flex items-center gap-3 bg-[#F0E9D6] text-[#1C2B3A] hover:bg-[#DFD6C2] text-sm font-medium tracking-wide rounded-full px-8 py-3.5 transition-colors duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F0E9D6]"
          >
            Falar com a Ethos
            <span aria-hidden="true">→</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
