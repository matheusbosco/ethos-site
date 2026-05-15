"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

const dores = [
  "Mensagens de clientes acumulando enquanto a equipe resolve urgências.",
  "Profissionais qualificados dedicando horas a cobranças, cadastros e relatórios.",
  "Decisões críticas tomadas sem visibilidade. Os dados existem, mas estão dispersos.",
];

export function Dores() {
  return (
    <section id="dores" className="w-full bg-[#2C2620] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <Reveal>
            <Parallax amount={14}>
              <div className="flex items-center gap-3 mb-10 md:mb-12">
                <div className="w-5 h-px bg-[#C89A4F]/60" />
                <p className="text-[0.62rem] font-semibold text-[#C89A4F] tracking-[0.25em] uppercase">
                  Cenários recorrentes
                </p>
              </div>
            </Parallax>
          </Reveal>

          <ul className="space-y-6 md:space-y-8">
            {dores.map((dor, i) => (
              <Reveal key={i} delay={i * 90}>
                <li className="flex gap-4 md:gap-5">
                  <span
                    aria-hidden
                    className="select-none text-xl md:text-2xl leading-[1.35] text-[#C89A4F]/70 shrink-0"
                  >
                    →
                  </span>
                  <span
                    className="text-xl md:text-[1.7rem] font-semibold text-[#F4EFE8] leading-[1.35] tracking-tight"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {dor}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={dores.length * 90}>
            <p className="mt-10 md:mt-12 text-base md:text-lg text-[#8BA5BB] leading-[1.75] italic">
              E a percepção de que nada avança sem alguém empurrando.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
