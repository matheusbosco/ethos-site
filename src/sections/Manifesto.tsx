import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const pullQuote =
  "[Placeholder — A frase mais importante do manifesto. A convicção central da Ethos, em uma ou duas sentenças que ninguém mais diria.]";

const paragraphs = [
  "[Placeholder — O que vocês recusam fazer. O que não é a Ethos. O que diferencia de outras agências de IA que vendem template como se fosse solução.]",
  "[Placeholder — O que vocês acreditam. A visão de como IA deve ser aplicada nos negócios — com honestidade, sem atalho, com responsabilidade.]",
];

export function Manifesto() {
  return (
    <Section id="manifesto" surface>
      <Reveal>
        <p className="font-[family-name:var(--font-mono)] text-xs text-[#2A3D52] tracking-[0.2em] uppercase mb-16">
          Manifesto
        </p>
      </Reveal>

      {/* Pull quote — a convicção central */}
      <Reveal delay={80}>
        <div className="flex gap-8 mb-16 max-w-3xl">
          <div className="w-0.5 bg-[#2A3D52] shrink-0 mt-1" />
          <blockquote className="font-[family-name:var(--font-heading)] italic text-2xl md:text-[2rem] text-[#1E1D1B] leading-[1.55]">
            {pullQuote}
          </blockquote>
        </div>
      </Reveal>

      <div className="w-12 h-px bg-[#DFD6C2] mb-16" />

      {/* Dois parágrafos em grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={(i + 2) * 100}>
            <p className="text-[1.05rem] text-[#1E1D1B] leading-[1.85]">{p}</p>
          </Reveal>
        ))}
      </div>

      {/* Assinatura */}
      <Reveal delay={400}>
        <p className="font-[family-name:var(--font-mono)] text-xs text-[#87867F] mt-16 tracking-widest">
          — ETHOS, {new Date().getFullYear()}
        </p>
      </Reveal>
    </Section>
  );
}
