import { Reveal } from "@/components/ui/Reveal";
import { HandwrittenCircle } from "@/components/ui/HandwrittenCircle";

export function Tagline() {
  return (
    <section className="w-full bg-[#F0E9D6] px-6 py-28 md:py-40 border-t border-[#DFD6C2]">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-6 h-px bg-[#2A3D52]/40" />
            <p className="font-[family-name:var(--font-mono)] text-[0.62rem] text-[#87867F] tracking-[0.25em] uppercase">
              O que fazemos
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-[family-name:var(--font-display)] text-[2.4rem] md:text-[3.6rem] lg:text-[4.4rem] font-extrabold text-[#1E1D1B] leading-[1.08] tracking-tight max-w-4xl">
            Soluções com inteligência artificial{" "}
            <span className="relative inline-block">
              personalizadas
              <HandwrittenCircle />
            </span>
            .
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#2A3D52]/70 tracking-[0.2em] uppercase mt-12">
            Construídas do zero — para o seu negócio, não para o mercado.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
