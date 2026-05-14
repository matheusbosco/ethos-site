import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const pillars: Pillar[] = [
  {
    id: "lgpd",
    title: "Conformidade LGPD",
    description:
      "Cada operação tem ambiente próprio, com regras claras sobre acesso, armazenamento e processamento dos dados.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "monitoramento",
    title: "Monitoramento contínuo",
    description:
      "Alertas automáticos 24 horas por dia e resposta humana priorizada para incidentes críticos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      </svg>
    ),
  },
  {
    id: "responsabilidade",
    title: "Responsabilidade operacional",
    description:
      "A solução roda na infraestrutura da Ethos, com manutenção e evolução sob nossa governança.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    id: "continuidade",
    title: "Continuidade do negócio",
    description:
      "Backup, redundância e plano de recuperação para que a operação não pare quando algo falhar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </svg>
    ),
  },
];

export function Seguranca() {
  return (
    <section className="w-full bg-[#F4EFE8] px-6 py-20 md:py-28 border-t border-[#8BA5BB]/20">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-[#5A7090]/50" />
            <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
              Operação responsável
            </p>
          </div>
          <h2
            className="text-[2rem] md:text-[2.75rem] font-extrabold text-[#2C2620] leading-[1.1] tracking-tight max-w-3xl mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            A operação é nossa. A responsabilidade também.
          </h2>
          <p className="text-base md:text-lg text-[#5A7090] leading-[1.7] max-w-2xl mb-12">
            Operar processos de outras empresas exige governança, segurança e continuidade.
            Quatro compromissos sustentam a forma como a Ethos roda sua operação.
          </p>
        </Reveal>

        {/* Grid de pilares */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {pillars.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <article className="h-full rounded-2xl border border-[#8BA5BB]/20 bg-white p-6 md:p-7 flex flex-col gap-4 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(44,38,32,0.25)]">
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#C89A4F]/10 text-[#C89A4F] shrink-0"
                  aria-hidden
                >
                  <span className="w-5 h-5">{p.icon}</span>
                </span>
                <h3
                  className="text-base font-extrabold text-[#2C2620] tracking-tight leading-snug"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {p.title}
                </h3>
                <p className="text-[0.82rem] text-[#5A7090]/85 leading-[1.65]">
                  {p.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
