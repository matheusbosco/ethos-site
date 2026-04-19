import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const paragraphs = [
  "[Placeholder — Por que a Ethos existe. O problema que vocês viram no mercado e decidiram resolver.]",
  "[Placeholder — O que vocês recusam fazer. O que não é a Ethos. O que diferencia de outras agências de IA.]",
  "[Placeholder — O que vocês acreditam. A visão de como IA deve ser aplicada nos negócios.]",
];

export function Manifesto() {
  return (
    <Section id="manifesto" surface>
      <div className="max-w-2xl">
        <Reveal>
          <p className="text-xs font-medium text-[#2A3D52] tracking-[0.2em] uppercase mb-12">
            Manifesto
          </p>
        </Reveal>

        <div className="space-y-10">
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <p className="text-xl md:text-2xl text-[#1E1D1B] leading-[1.75] font-[family-name:var(--font-heading)]">
                {p}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
