"use client";

import { Button } from "@/components/ui/Button";
import { AnimatedWords } from "@/components/ui/AnimatedWords";
import { SplineScene } from "@/components/ui/SplineScene";
import { useContact } from "@/contexts/ContactContext";

const rotatingPhrases = [
  "Automatize o que trava.",
  "Escale sem contratar.",
  "Otimize o que custa.",
  "Transforme o que atrasa.",
];

export function Hero() {
  const { open } = useContact();

  return (
    <section className="w-full min-h-screen bg-[#2C2620] pt-16 flex items-center overflow-hidden">
      <div className="mx-auto max-w-5xl w-full px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Coluna esquerda — texto */}
        <div className="animate-fade-up">
          <p className="text-xs font-semibold text-[#C89A4F] tracking-[0.22em] uppercase mb-7">
            Agência de soluções com IA
          </p>

          <h1
            className="text-5xl md:text-[4.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Inteligência sob medida.
          </h1>

          <AnimatedWords
            phrases={rotatingPhrases}
            className="text-2xl md:text-3xl font-extrabold text-[#C89A4F] tracking-tight mb-8 h-[1.3em]"
          />

          <div className="w-10 h-[2px] bg-[#C89A4F] mb-8" />

          <p className="text-base md:text-lg text-[#8BA5BB] leading-[1.85] max-w-md mb-10">
            A IA de hoje resolve problemas que há dois anos exigiriam meses de engenharia.
            Nós mapeamos onde ela faz sentido no seu negócio — e construímos só o que tem retorno real.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" className="text-sm px-8 py-3.5" onClick={open}>
              Conversar com a Ethos
            </Button>
            <Button as="a" href="#servicos" variant="secondary" className="text-sm px-8 py-3.5">
              O que entregamos
            </Button>
          </div>
        </div>

        {/* Coluna direita — card do robô */}
        <div className="hidden lg:flex flex-col animate-fade-up" style={{ animationDelay: "150ms" }}>
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8">
              <span className="text-[0.65rem] font-semibold text-white/40 tracking-[0.18em] uppercase">
                Ethos · Interativo
              </span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[0.65rem] text-emerald-400/80 tracking-widest uppercase font-medium">
                  ao vivo
                </span>
              </div>
            </div>

            {/* Spline 3D */}
            <div className="relative w-full h-[460px] bg-[#1e1712]">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
                followGlobalMouse
              />
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/8">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C89A4F]" />
                <span className="text-[0.62rem] text-white/30 tracking-[0.15em] uppercase font-medium">
                  Render · 60fps
                </span>
              </div>
              <span className="text-[0.62rem] text-[#C89A4F]/60 tracking-[0.15em] uppercase font-semibold">
                Ethos · 3D
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
