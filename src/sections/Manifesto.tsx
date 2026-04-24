"use client";

import { useRef, useEffect, useState } from "react";

const pullQuote = "Diagnóstico honesto. Solução sob medida. Parceria de verdade.";

const paragraphs = [
  "A revolução da IA não é hype — é a maior mudança na forma de trabalhar desde a internet. Empresas que não se adaptarem agora vão competir em desvantagem por anos. Nosso trabalho é garantir que isso não aconteça com você.",
  "Encontramos onde seu negócio perde tempo, foco e dinheiro. Depois construímos a solução exata para aquele ponto — não um template adaptado, não uma ferramenta genérica comprada pronta.",
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="manifesto"
      className="w-full bg-[#2C2620] px-6 py-20 md:py-28 border-t border-white/8"
    >
      <div className="mx-auto max-w-5xl">

        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-[0.62rem] font-semibold text-[#C89A4F] tracking-[0.25em] uppercase mb-14">
            Manifesto
          </p>
        </div>

        {/* Pull quote */}
        <div
          className={`flex gap-6 mb-14 max-w-3xl transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="w-[2px] bg-[#C89A4F] shrink-0 mt-1 rounded-full" />
          <blockquote
            className="text-2xl md:text-[2rem] font-extrabold text-white leading-[1.4] tracking-tight"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            {pullQuote}
          </blockquote>
        </div>

        <div
          className={`w-10 h-[2px] bg-[#C89A4F]/30 mb-14 transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}
        />

        {/* Dois parágrafos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl">
          {paragraphs.map((p, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: visible ? `${300 + i * 100}ms` : "0ms" }}
            >
              <p className="text-base text-[#8BA5BB] leading-[1.9]">{p}</p>
            </div>
          ))}
        </div>

        {/* Assinatura */}
        <div
          className={`transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <p className="text-[0.65rem] text-white/20 mt-14 tracking-widest font-medium">
            — ETHOS, {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </section>
  );
}
