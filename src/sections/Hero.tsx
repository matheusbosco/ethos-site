"use client";

import { Button } from "@/components/ui/Button";
import { VideoBackground } from "@/components/ui/VideoBackground";
import { HandwrittenCircle } from "@/components/ui/HandwrittenCircle";
import { AnimatedWords } from "@/components/ui/AnimatedWords";
import { useContact } from "@/contexts/ContactContext";

const rotatingWords = ["automatiza.", "escala.", "otimiza.", "transforma."];

export function Hero() {
  const { open } = useContact();

  return (
    <section className="w-full min-h-screen flex items-center px-6 pt-16 relative overflow-hidden">
      <VideoBackground />

      {/* Linha decorativa vertical */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-px h-32 bg-[#DFD6C2]/60 hidden lg:block z-10" />

      <div className="mx-auto max-w-5xl py-28 md:py-36 animate-fade-up relative z-10">
        <p className="font-[family-name:var(--font-mono)] text-xs text-[#2A3D52] tracking-[0.2em] uppercase mb-8">
          Agência de soluções com IA
        </p>

        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-[5.5rem] font-extrabold text-[#1E1D1B] leading-[1.05] tracking-tight mb-4 max-w-3xl">
          <span className="relative inline-block">
            Inteligência
            <HandwrittenCircle />
          </span>{" "}
          sob medida.
        </h1>

        <AnimatedWords
          prefix="A IA que"
          words={rotatingWords}
          className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-[#1E1D1B] tracking-tight mb-10"
        />

        <div className="w-12 h-px bg-[#2A3D52] mb-10" />

        <p className="text-lg md:text-xl text-[#87867F] leading-[1.8] max-w-md mb-14">
          Enquanto você lê isso, seus concorrentes já estão automatizando. A IA de hoje faz o que era inimaginável há dois anos — e nós colocamos esse poder a serviço do seu negócio.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="primary"
            className="text-sm px-8 py-3.5"
            onClick={open}
          >
            Diagnóstico gratuito
          </Button>
          <Button as="a" href="#servicos" variant="secondary" className="text-sm px-8 py-3.5">
            O que entregamos
          </Button>
        </div>
      </div>
    </section>
  );
}
