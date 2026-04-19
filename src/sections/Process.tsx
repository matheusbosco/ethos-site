import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    number: "1",
    title: "Diagnóstico",
    description:
      "[Placeholder — Entendemos onde estão os gargalos, o que pode ser automatizado e qual o impacto real esperado.]",
  },
  {
    number: "2",
    title: "Desenho",
    description:
      "[Placeholder — Projetamos a solução sob medida: fluxos, agentes, integrações. Nada genérico.]",
  },
  {
    number: "3",
    title: "Implementação",
    description:
      "[Placeholder — Construímos e entregamos. Código limpo, testado, documentado.]",
  },
  {
    number: "4",
    title: "Acompanhamento",
    description:
      "[Placeholder — A solução entra em operação e a gente continua junto para ajustar e evoluir.]",
  },
];

export function Process() {
  return (
    <Section id="processo" surface>
      <Reveal>
        <p className="text-xs font-medium text-[#7C5C3E] tracking-[0.2em] uppercase mb-10">
          Como funciona
        </p>
        <h2 className="font-[family-name:var(--font-heading)] italic text-3xl md:text-4xl font-normal text-[#141413] leading-tight mb-16 max-w-lg">
          [Placeholder — headline do método]
        </h2>
      </Reveal>

      <div className="flex flex-col divide-y divide-[#E8E6DC]">
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 80}>
            <div className="flex flex-col md:flex-row gap-6 py-10">
              <span className="text-xs font-medium text-[#7C5C3E] tracking-widest w-6 shrink-0 pt-1">
                {step.number}
              </span>
              <div className="flex flex-col md:flex-row gap-4 md:gap-16 flex-1">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#141413] md:w-44 shrink-0">
                  {step.title}
                </h3>
                <p className="text-base text-[#87867F] leading-[1.75] flex-1">
                  {step.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
