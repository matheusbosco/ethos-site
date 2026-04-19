import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const pullQuote =
  "Ethos, do grego: caráter, credibilidade, palavra. Não vendemos solução. Construímos junto. E ficamos para responder pelo que entregamos.";

const paragraphs = [
  "A revolução da IA não é hype — é a maior mudança na forma de trabalhar desde a internet. Empresas que não se adaptarem agora vão competir em desvantagem por anos. Nosso trabalho é garantir que isso não aconteça com você.",
  "Encontramos onde seu negócio perde tempo, foco e dinheiro. Depois construímos a solução exata para aquele ponto — não um template adaptado, não uma ferramenta genérica comprada pronta.",
];

export function Manifesto() {
  return (
    <Section id="manifesto" surface>
      <Reveal>
        <p className="font-[family-name:var(--font-mono)] text-xs text-[#2A3D52] tracking-[0.2em] uppercase mb-16">
          Manifesto
        </p>
      </Reveal>

      {/* Pull quote — convicção central, fonte display */}
      <Reveal delay={80}>
        <div className="flex gap-8 mb-16 max-w-3xl">
          <div className="w-0.5 bg-[#2A3D52] shrink-0 mt-1" />
          <blockquote className="font-[family-name:var(--font-display)] text-2xl md:text-[2rem] font-extrabold text-[#1E1D1B] leading-[1.4] tracking-tight">
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
