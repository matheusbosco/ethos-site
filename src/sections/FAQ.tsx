"use client";

import { useState } from "react";
import { Parallax } from "@/components/ui/Parallax";

const faqs = [
  {
    q: "O que acontece depois que a solução entra em operação?",
    a: "O acompanhamento continua. Monitoramos a operação por inteiro, aplicamos ajustes, evoluímos o que precisa evoluir e respondemos pelo que foi construído. O trabalho não termina quando a operação começa.",
  },
  {
    q: "Onde a solução roda e quem é responsável por ela?",
    a: "Na nossa infraestrutura, monitorada e mantida pela Ethos. Você recebe documentação completa do que foi construído, mas a responsabilidade pela operação fica conosco. É uma escolha deliberada: alguém precisa permanecer responsável pelo que está em funcionamento.",
  },
  {
    q: "Como vocês tratam os dados do nosso negócio?",
    a: "Em conformidade com a LGPD. Cada operação tem ambiente próprio, com regras claras sobre o que é acessado, armazenado e processado. Os dados do cliente são utilizados apenas para a operação contratada.",
  },
  {
    q: "Qual é o SLA de resposta a incidentes?",
    a: "Monitoramento automatizado 24 horas por dia, com alertas em tempo real para a Ethos. Resposta humana priorizada para incidentes críticos. Os tempos exatos de resposta são acordados em contrato, conforme a criticidade da operação.",
  },
  {
    q: "De quem é a propriedade do código e dos agentes?",
    a: "O que é construído sob medida para a sua operação fica documentado e acessível. Os termos exatos de propriedade são definidos em contrato, conforme o tipo de solução.",
  },
  {
    q: "E se quisermos encerrar a parceria?",
    a: "Entregamos a documentação e os fluxos prontos para que você ou um terceiro continue a operação. Os prazos de transição são acordados em contrato, garantindo saída sem aprisionamento.",
  },
  {
    q: "Precisamos ter equipe técnica interna?",
    a: "Não. Atendemos empresas que não têm equipe de TI. O que precisamos é acesso ao processo, não ao código que o sustenta hoje.",
  },
  {
    q: "Como é o diagnóstico inicial?",
    a: "Uma conversa de 30 minutos em que mapeamos o processo, identificamos o gargalo e estimamos o impacto real da automação. Sem apresentação de vendas e sem compromisso.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full bg-[#2C2620] px-6 py-14 md:py-16">
      <div className="mx-auto max-w-5xl">

        <Parallax amount={16}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-[#C89A4F]/50" />
            <p className="text-[0.62rem] font-semibold text-[#C89A4F] tracking-[0.25em] uppercase">
              Perguntas frequentes
            </p>
          </div>

          <h2
            className="text-[2rem] md:text-[2.75rem] font-extrabold text-white leading-[1.1] tracking-tight mb-10 max-w-2xl"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            O que você provavelmente quer saber antes de entrar em contato.
          </h2>
        </Parallax>

        {/* 2 colunas independentes no desktop (3 perguntas cada). Cada coluna é
            seu próprio bloco — abrir uma pergunta empurra só os items abaixo
            dela na mesma coluna, sem mexer na outra. */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
          {(() => {
            const half = Math.ceil(faqs.length / 2);
            return [faqs.slice(0, half), faqs.slice(half)].map((column, colIdx) => (
              <div key={colIdx}>
                {column.map((faq, rowIdx) => {
                  const i = colIdx * half + rowIdx;
                  return (
                    <div key={i} className="border-b border-white/10">
                      <button
                        className="w-full text-left py-4 flex items-start justify-between gap-4 group cursor-pointer"
                        onClick={() => setOpen(open === i ? null : i)}
                        aria-expanded={open === i}
                      >
                        <span
                          className="text-sm font-extrabold text-white tracking-tight leading-snug group-hover:text-[#C89A4F] transition-colors duration-200"
                          style={{ fontFamily: "var(--font-jakarta)" }}
                        >
                          {faq.q}
                        </span>
                        <span
                          className="text-[#C89A4F] shrink-0 mt-0.5 text-lg leading-none transition-transform duration-300 select-none"
                          style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
                          aria-hidden
                        >
                          +
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: open === i ? "320px" : "0px" }}
                      >
                        <p className="text-[0.82rem] text-white/55 leading-[1.7] pb-4 pr-8">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ));
          })()}
        </div>

      </div>
    </section>
  );
}
