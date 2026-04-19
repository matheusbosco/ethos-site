import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const services = [
  {
    number: "01",
    problem: "[Placeholder — Seu time perde horas em processos que deveriam acontecer sozinhos.]",
    solution: "[Placeholder — nome do serviço]",
    description: "[Placeholder — descrição curta do que a Ethos entrega nesta área.]",
  },
  {
    number: "02",
    problem: "[Placeholder — Você tem dados mas não sabe o que fazer com eles.]",
    solution: "[Placeholder — nome do serviço]",
    description: "[Placeholder — descrição curta.]",
  },
  {
    number: "03",
    problem: "[Placeholder — Sua operação escala mas a equipe não consegue acompanhar.]",
    solution: "[Placeholder — nome do serviço]",
    description: "[Placeholder — descrição curta.]",
  },
];

export function Services() {
  return (
    <Section id="servicos">
      <Reveal>
        <p className="font-[family-name:var(--font-mono)] text-xs text-[#2A3D52] tracking-[0.2em] uppercase mb-10">
          O que entregamos
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-[#1E1D1B] leading-tight tracking-tight mb-16 max-w-lg">
          [Placeholder — headline da seção de serviços]
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <Reveal key={s.number} delay={i * 100}>
            <div className="border border-[#DFD6C2] bg-[#F0E9D6] rounded-xl p-8 flex flex-col gap-6 hover:border-[#1C2B3A] hover:shadow-sm transition-all duration-300 h-full">
              <span className="text-xs font-medium text-[#87867F] tracking-widest">
                {s.number}
              </span>
              <p className="text-sm text-[#87867F] italic leading-relaxed flex-1">
                {s.problem}
              </p>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold text-[#1E1D1B] tracking-tight mb-2">
                  {s.solution}
                </h3>
                <p className="text-sm text-[#87867F] leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
