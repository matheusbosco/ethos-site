"use client";

import { useContact } from "@/contexts/ContactContext";

export function CtaFinal() {
  const { open } = useContact();

  return (
    <section className="relative w-full bg-[#F4EFE8] px-6 py-28 md:py-40 overflow-hidden border-t border-[#8BA5BB]/20">
      {/* Watermark */}
      <div
        className="absolute right-0 inset-y-0 flex items-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-extrabold text-[#2C2620]/[0.03] leading-none translate-x-8"
          style={{ fontSize: "clamp(8rem, 18vw, 20rem)", fontFamily: "var(--font-jakarta)" }}
        >
          ETHOS
        </span>
      </div>

      {/* Linha decorativa topo */}
      <div className="absolute top-0 left-6 right-6 h-px bg-[#8BA5BB]/20" />

      <div className="mx-auto max-w-5xl relative z-10">

        {/* Label */}
        <div className="flex items-center gap-3 mb-14">
          <div className="w-5 h-px bg-[#5A7090]/50" />
          <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
            Próximo passo
          </p>
        </div>

        {/* Headline */}
        <h2
          className="text-[2.8rem] md:text-[4rem] lg:text-[5rem] font-extrabold text-[#2C2620] leading-[1.06] tracking-tight mb-10 max-w-2xl"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          O primeiro passo é uma{" "}
          <span className="text-[#C89A4F]">conversa.</span>
        </h2>

        {/* CTA */}
        <button
          onClick={open}
          className="inline-flex items-center gap-3 bg-[#C89A4F] text-[#2C2620] hover:bg-[#b88c47] text-sm font-bold tracking-wide rounded-full px-8 py-3.5 transition-colors duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89A4F]"
        >
          Conversar com a Ethos
          <span aria-hidden="true">→</span>
        </button>

      </div>
    </section>
  );
}
