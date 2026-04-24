"use client";

import { useState } from "react";

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
    q: "O projeto fica nos servidores de vocês?",
    a: "Sim. A solução roda nos nossos servidores — garantindo qualidade, segurança e evolução contínua. Você recebe documentação completa de tudo que foi construído. Essa escolha é deliberada: ela garante que alguém continua responsável pelo que funciona.",
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
    <section id="faq" className="w-full bg-[#F4EFE8] px-6 py-20 md:py-28 border-t border-[#8BA5BB]/20">
      <div className="mx-auto max-w-5xl">

        <div className="flex items-center gap-3 mb-10">
          <div className="w-5 h-px bg-[#5A7090]/50" />
          <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
            Perguntas frequentes
          </p>
        </div>

        <h2
          className="text-3xl md:text-4xl font-extrabold text-[#2C2620] leading-tight tracking-tight mb-16 max-w-lg"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          O que você provavelmente quer saber antes de entrar em contato.
        </h2>

        <div className="flex flex-col divide-y divide-[#8BA5BB]/20 max-w-2xl">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full text-left py-7 flex items-start justify-between gap-6 group cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span
                  className="text-base font-extrabold text-[#2C2620] tracking-tight leading-snug group-hover:text-[#5A7090] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {faq.q}
                </span>
                <span
                  className="text-[#C89A4F] shrink-0 mt-0.5 text-xl leading-none transition-transform duration-300 select-none"
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
                <p className="text-base text-[#8BA5BB] leading-[1.8] pb-7 pr-10">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
