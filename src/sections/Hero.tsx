"use client";

import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import { Button } from "@/components/ui/Button";
import { SplineScene } from "@/components/ui/SplineScene";
import { useContact } from "@/contexts/ContactContext";

export function Hero() {
  const { open } = useContact();

  return (
    <section className="relative w-full min-h-screen bg-[#2C2620] pt-16 flex items-center justify-center overflow-hidden">
      {/* Robô 3D — fundo, com zoom */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 origin-center translate-y-[17%] scale-[1.35] md:scale-[1.5]">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
            followGlobalMouse
          />
        </div>
      </div>

      {/* Escurecimento radial — legibilidade do texto sobre o robô */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(44,38,32,0.62) 0%, rgba(44,38,32,0.3) 45%, rgba(44,38,32,0) 75%)",
        }}
      />

      {/* Fades topo (nav) e base — blend com o fundo */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #2C2620 0%, rgba(44,38,32,0) 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(0deg, #2C2620 0%, rgba(44,38,32,0) 100%)" }}
      />

      {/* Glow âmbar sutil */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[800px] aspect-square pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(200,154,79,0.14) 0%, rgba(200,154,79,0.04) 40%, rgba(44,38,32,0) 70%)",
        }}
      />

      {/* Texto — por cima do robô, centralizado */}
      <div className="relative z-10 mx-auto max-w-5xl w-full px-6 text-center animate-fade-up">
        <p className="text-xs font-semibold text-[#C89A4F] tracking-[0.22em] uppercase mb-5">
          O seu BPO de tecnologia
        </p>

        <h1
          className="text-[clamp(1.85rem,6vw,4.75rem)] font-extrabold text-white leading-[1.05] tracking-tight mb-7 max-w-4xl mx-auto [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          A tecnologia que opera <br className="hidden md:block" />sua empresa.
        </h1>

        <p className="text-base md:text-lg text-[#cdd7e0] leading-[1.8] max-w-xl mx-auto [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
          Não entregamos software.
          <br />
          Operamos a camada de tecnologia que executa, monitora e evolui sua operação continuamente.
        </p>

        <div className="mt-6 text-base md:text-lg text-[#8BA5BB] [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
          Operada para{" "}
          <AnimatedTextCycle
            words={[
              "o seu atendimento",
              "o seu financeiro",
              "o seu comercial",
              "a sua operação",
              "o seu pós-venda",
            ]}
            interval={2800}
            className="text-[#C89A4F]"
          />
        </div>

        <div className="mt-7 flex justify-center">
          <Button variant="primary" className="text-sm px-8 py-3.5" onClick={open}>
            Conversar com a Ethos
          </Button>
        </div>
      </div>
    </section>
  );
}
