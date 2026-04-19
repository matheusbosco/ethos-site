import { Section } from "@/components/layout/Section";

const paragraphs = [
  "[Placeholder — Por que a Ethos existe. O problema que vocês viram no mercado e decidiram resolver.]",
  "[Placeholder — O que vocês recusam fazer. O que não é a Ethos. O que diferencia de outras agências de IA.]",
  "[Placeholder — O que vocês acreditam. A visão de como IA deve ser aplicada nos negócios.]",
];

export function Manifesto() {
  return (
    <Section id="manifesto" surface>
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-[#7C5C3E] tracking-widest uppercase mb-10">
          Manifesto
        </p>

        <div className="space-y-8">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-lg md:text-xl text-[#141413] leading-[1.8]"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}
