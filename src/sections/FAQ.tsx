"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

const faqs = [
  {
    q: "Quanto tempo leva um projeto típico?",
    a: "Da descoberta à primeira entrega em produção: 4 a 6 semanas. Projetos mais complexos são divididos em fases — você vê resultado real antes de comprometer o orçamento total.",
  },
  {
    q: "Como funciona o modelo de precificação?",
    a: "Trabalhamos por projeto, não por hora. Após o diagnóstico, apresentamos uma proposta com escopo e valor fixos. Sem surpresas no final do mês.",
  },
  {
    q: "O que acontece depois que o projeto é entregue?",
    a: "A solução entra em operação e permanecemos disponíveis para ajustes e evoluções. Não desaparecemos na entrega — acompanhamento pós-lançamento está incluído.",
  },
  {
    q: "E se quisermos trazer o projeto para dentro da nossa equipe?",
    a: "Tudo que construímos é documentado e entregue. Código, fluxos, integrações — você tem acesso total. Não criamos dependência de ferramentas proprietárias nossas.",
  },
  {
    q: "Precisamos ter equipe técnica interna?",
    a: "Não. Trabalhamos com empresas sem time de TI. O que precisamos é de acesso ao processo — não ao código que ele usa hoje.",
  },
  {
    q: "Como é o diagnóstico gratuito?",
    a: "Uma conversa de 30 minutos onde mapeamos o processo, identificamos o gargalo e estimamos o impacto real de automatizar. Sem apresentação de vendas, sem compromisso.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section id="faq">
      <Reveal>
        <p className="font-[family-name:var(--font-mono)] text-xs text-[#2A3D52] tracking-[0.2em] uppercase mb-10">
          Perguntas frequentes
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-[#1E1D1B] leading-tight tracking-tight mb-16 max-w-lg">
          O que você provavelmente quer saber antes de entrar em contato.
        </h2>
      </Reveal>

      <div className="flex flex-col divide-y divide-[#DFD6C2] max-w-2xl">
        {faqs.map((faq, i) => (
          <Reveal key={i} delay={i * 50}>
            <div>
              <button
                className="w-full text-left py-7 flex items-start justify-between gap-6 group cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-[family-name:var(--font-display)] text-base font-extrabold text-[#1E1D1B] tracking-tight leading-snug group-hover:text-[#2A3D52] transition-colors duration-200">
                  {faq.q}
                </span>
                <span
                  className="text-[#2A3D52] shrink-0 mt-0.5 text-xl leading-none transition-transform duration-300 select-none"
                  style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "200px" : "0px" }}
              >
                <p className="text-base text-[#87867F] leading-[1.8] pb-7 pr-10">
                  {faq.a}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
