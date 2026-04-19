"use client";

import { useRef, useEffect, useState } from "react";

type TraceLine = { text: string; type: string };

const traces: Record<string, TraceLine[]> = {
  leads: [
    { text: "DIAGNÓSTICO ETHOS", type: "header" },
    { text: "─────────────────────────────────────", type: "divider" },
    { text: "Processo: Qualificação de leads", type: "info" },
    { text: "Fonte: CRM + e-mail + planilhas internas", type: "info" },
    { text: "", type: "blank" },
    { text: "Processando 1.247 registros...", type: "running" },
    { text: "", type: "blank" },
    { text: "RESULTADO", type: "header" },
    { text: "→ Custo atual: 18h / semana de trabalho manual", type: "output" },
    { text: "→ Taxa de erro: 12% por entradas duplicadas", type: "output" },
    { text: "→ Gargalo: validação manual sem critério padrão", type: "output" },
    { text: "", type: "blank" },
    { text: "PROPOSTA", type: "header" },
    { text: "→ Agente de qualificação automática", type: "output" },
    { text: "→ Integração CRM + enriquecimento de dados", type: "output" },
    { text: "→ Economia estimada: 16h / semana", type: "success" },
    { text: "", type: "blank" },
    { text: "─────────────────────────────────────", type: "divider" },
    { text: "✓ Diagnóstico concluído — 2.3s", type: "done" },
  ],
  saude: [
    { text: "DIAGNÓSTICO ETHOS — SAÚDE PRIVADA", type: "header" },
    { text: "─────────────────────────────────────", type: "divider" },
    { text: "Processo: Agendamento e confirmação de consultas", type: "info" },
    { text: "Fonte: WhatsApp + agenda manual + ligações", type: "info" },
    { text: "", type: "blank" },
    { text: "Analisando 3 meses de operação...", type: "running" },
    { text: "", type: "blank" },
    { text: "RESULTADO", type: "header" },
    { text: "→ Taxa de no-show: 31% das consultas", type: "output" },
    { text: "→ Custo por no-show: ~R$ 180 (sala + profissional)", type: "output" },
    { text: "→ Perda estimada: R$ 8.200 / mês", type: "output" },
    { text: "→ Gargalo: sem confirmação automatizada", type: "output" },
    { text: "", type: "blank" },
    { text: "PROPOSTA", type: "header" },
    { text: "→ Agente de confirmação por WhatsApp", type: "output" },
    { text: "→ Reagendamento automático com 48h de antecedência", type: "output" },
    { text: "→ Recuperação estimada: R$ 6.500 / mês", type: "success" },
    { text: "", type: "blank" },
    { text: "─────────────────────────────────────", type: "divider" },
    { text: "✓ Diagnóstico concluído — 1.8s", type: "done" },
  ],
};

const tabs = [
  { key: "leads", label: "Qualificação de leads" },
  { key: "saude", label: "Consultório de saúde" },
];

const lineColor: Record<string, string> = {
  header: "text-white/50 tracking-[0.15em] uppercase text-[0.7rem]",
  divider: "text-white/15",
  info: "text-white/40",
  running: "text-[#7FA8C9]",
  output: "text-white/70",
  success: "text-[#7AAF8A]",
  done: "text-white/90 font-medium",
  blank: "h-3",
};

export function TechProof() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"leads" | "saude">("leads");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const trace = traces[activeTab];

  return (
    <section
      ref={ref}
      className="w-full bg-[#1C2B3A] px-6 py-20 md:py-28 overflow-hidden"
    >
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">

        {/* Esquerda */}
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="font-[family-name:var(--font-mono)] text-xs text-white/30 tracking-[0.2em] uppercase mb-8">
            Na prática
          </p>
          <h2 className="font-[family-name:var(--font-heading)] italic text-3xl md:text-4xl font-normal text-white/90 leading-tight mb-8">
            O diagnóstico vem antes de qualquer proposta.
          </h2>
          <p className="text-white/45 leading-[1.85] text-base mb-10">
            Antes de escrever uma linha de código, mapeamos o processo real —
            não o idealizado. Medimos o custo atual, identificamos o gargalo e
            só então desenhamos a solução.
          </p>

          {/* Tab switcher */}
          <div className="flex flex-col gap-2">
            <p className="font-[family-name:var(--font-mono)] text-[0.65rem] text-white/25 tracking-widest uppercase mb-2">
              Ver diagnóstico para:
            </p>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "leads" | "saude")}
                className={`text-left px-4 py-3 rounded-lg font-[family-name:var(--font-mono)] text-sm transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-white/10 text-white border border-white/15"
                    : "text-white/35 hover:text-white/60 hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Direita — terminal */}
        <div
          className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="bg-[#141F2B] rounded-xl border border-white/8 overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="font-[family-name:var(--font-mono)] text-[0.65rem] text-white/20 ml-2 tracking-wide">
                ethos — diagnóstico
              </span>
            </div>

            {/* Linhas */}
            <div className="px-5 py-5 space-y-0.5">
              {trace.map((line, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  className={`font-[family-name:var(--font-mono)] text-[0.75rem] leading-[1.6] transition-all duration-500 ${
                    lineColor[line.type]
                  } ${
                    visible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }`}
                  style={{
                    transitionDelay: visible ? `${300 + i * 50}ms` : "0ms",
                  }}
                >
                  {line.text || <>&nbsp;</>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
