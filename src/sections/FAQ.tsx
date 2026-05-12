"use client";

import { useState } from "react";
import { AmberUnderline } from "@/components/ui/AmberUnderline";

const faqs = [
  {
    q: "Quanto tempo leva um projeto típico?",
    a: "Da descoberta à primeira entrega em produção, de 4 a 6 semanas. Projetos mais complexos são divididos em fases, de forma que há resultado concreto antes do comprometimento de todo o orçamento.",
  },
  {
    q: "Como vocês cobram?",
    a: "Trabalhamos por projeto, não por hora. Após o diagnóstico, apresentamos uma proposta com escopo e valor fixos, sem cobranças variáveis ao fim do mês.",
  },
  {
    q: "O que acontece depois que o projeto é entregue?",
    a: "A solução entra em operação e o acompanhamento continua, com ajustes e evoluções. Esse acompanhamento pós-lançamento já está incluído. O trabalho não termina quando a operação começa.",
  },
  {
    q: "O projeto fica nos servidores de vocês?",
    a: "Sim. A solução opera na nossa infraestrutura, monitorada e mantida por nós, e você recebe a documentação completa do que foi construído. É uma escolha deliberada: alguém precisa permanecer responsável pelo que está em funcionamento.",
  },
  {
    q: "Precisamos ter equipe técnica interna?",
    a: "Não. Atendemos empresas que não têm equipe de TI. O que precisamos é de acesso ao processo, não ao código que o sustenta hoje.",
  },
  {
    q: "Como é o diagnóstico gratuito?",
    a: "Uma conversa de 30 minutos em que mapeamos o processo, identificamos o gargalo e estimamos o impacto real da automação. Sem apresentação de vendas e sem compromisso.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="w-full bg-[#2C2620] px-6 py-14 md:py-16">
      <div className="mx-auto max-w-5xl">

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
          O que você provavelmente quer{" "}
          <span className="relative inline-block">
            saber
            <AmberUnderline />
          </span>{" "}
          antes de entrar em contato.
        </h2>

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
                        style={{ maxHeight: open === i ? "240px" : "0px" }}
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
