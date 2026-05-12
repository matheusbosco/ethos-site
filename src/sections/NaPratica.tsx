"use client";

import { useRef, useEffect, useState } from "react";
import { AmberUnderline } from "@/components/ui/AmberUnderline";

// ——————————————————————————————————————————————
// Terminal de diagnóstico
// ——————————————————————————————————————————————

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
    { text: "✓ Diagnóstico concluído em 2.3s", type: "done" },
  ],
  cobranca: [
    { text: "DIAGNÓSTICO ETHOS · CONTAS A RECEBER", type: "header" },
    { text: "─────────────────────────────────────", type: "divider" },
    { text: "Processo: Cobrança e conciliação de pagamentos", type: "info" },
    { text: "Fonte: ERP + extratos + planilhas de controle", type: "info" },
    { text: "", type: "blank" },
    { text: "Analisando 3 meses de operação...", type: "running" },
    { text: "", type: "blank" },
    { text: "RESULTADO", type: "header" },
    { text: "→ Inadimplência: 14% da carteira", type: "output" },
    { text: "→ Conciliação manual: 11h / semana", type: "output" },
    { text: "→ Gargalo: sem régua de cobrança automatizada", type: "output" },
    { text: "", type: "blank" },
    { text: "PROPOSTA", type: "header" },
    { text: "→ Régua de cobrança automática multicanal", type: "output" },
    { text: "→ Conciliação bancária integrada ao ERP", type: "output" },
    { text: "→ Recuperação estimada: 30% da inadimplência", type: "success" },
    { text: "", type: "blank" },
    { text: "─────────────────────────────────────", type: "divider" },
    { text: "✓ Diagnóstico concluído em 1.8s", type: "done" },
  ],
  relatorio: [
    { text: "RELATÓRIO SEMANAL · 22-28 ABR", type: "header" },
    { text: "─────────────────────────────────────", type: "divider" },
    { text: "Cliente: operação consolidada · 7 dias", type: "info" },
    { text: "Última atualização: hoje, 08:00", type: "info" },
    { text: "", type: "blank" },
    { text: "Compilando dados da semana...", type: "running" },
    { text: "", type: "blank" },
    { text: "OPERAÇÃO", type: "header" },
    { text: "→ Atendimentos resolvidos: 142 (+11%)", type: "output" },
    { text: "→ Tempo médio de resposta: 27s", type: "output" },
    { text: "→ Tarefas automatizadas: 1.380 no período", type: "output" },
    { text: "", type: "blank" },
    { text: "FINANCEIRO", type: "header" },
    { text: "→ Faturamento bruto: R$ 47.200", type: "output" },
    { text: "→ Ticket médio: R$ 332", type: "output" },
    { text: "→ Crescimento sustentado pelo 3º mês", type: "success" },
    { text: "", type: "blank" },
    { text: "─────────────────────────────────────", type: "divider" },
    { text: "✓ Relatório consolidado em 0.9s", type: "done" },
  ],
  analise: [
    { text: "ANÁLISE EMPRESARIAL · TEMPO REAL", type: "header" },
    { text: "─────────────────────────────────────", type: "divider" },
    { text: "Sistema: Ethos · 14 agentes ativos", type: "info" },
    { text: "Última varredura: há 2min", type: "info" },
    { text: "", type: "blank" },
    { text: "Monitorando processos da empresa...", type: "running" },
    { text: "", type: "blank" },
    { text: "OPERAÇÃO", type: "header" },
    { text: "→ Atendimento: rodando ✓ (47 conversas)", type: "output" },
    { text: "→ Estoque: 1 item em ponto de reposição", type: "output" },
    { text: "→ Equipe: 11/12 online · 1 alerta de horas extras", type: "output" },
    { text: "", type: "blank" },
    { text: "OPORTUNIDADES", type: "header" },
    { text: "→ Pipeline: 28 leads · R$ 184k em propostas", type: "output" },
    { text: "→ Estoque: reposição automática ativa", type: "output" },
    { text: "→ Triagem automática pode poupar ~9h/sem", type: "success" },
    { text: "", type: "blank" },
    { text: "─────────────────────────────────────", type: "divider" },
    { text: "✓ Análise atualizada em 1.2s", type: "done" },
  ],
};

type TabKey = "leads" | "cobranca" | "relatorio" | "analise";

const tabs: { key: TabKey; label: string }[] = [
  { key: "leads", label: "Qualificação de leads" },
  { key: "cobranca", label: "Cobrança e conciliação" },
  { key: "relatorio", label: "Relatório semanal" },
  { key: "analise", label: "Análise empresarial" },
];

const lineColor: Record<string, string> = {
  header: "text-white/50 tracking-[0.15em] uppercase text-[0.7rem]",
  divider: "text-white/15",
  info: "text-white/40",
  running: "text-[#8BA5BB]",
  output: "text-white/70",
  success: "text-[#C89A4F]",
  done: "text-white/90 font-medium",
  blank: "h-3",
};

function TerminalSection({ visible }: { visible: boolean }) {
  const [activeTab, setActiveTab] = useState<TabKey>("leads");
  const trace = traces[activeTab];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
      {/* Esquerda */}
      <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-5 h-px bg-[#5A7090]/50" />
          <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
            Diagnóstico
          </p>
        </div>
        <h2
          className="text-[2rem] md:text-[2.75rem] font-extrabold text-[#2C2620] leading-[1.1] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          O{" "}
          <span className="relative inline-block">
            diagnóstico
            <AmberUnderline />
          </span>{" "}
          vem antes de qualquer proposta.
        </h2>
        <p className="text-[#5A7090] leading-[1.85] text-base mb-10">
          Antes de escrever uma linha de código, mapeamos o processo real,
          não o idealizado. Medimos o custo atual, identificamos o gargalo e
          só então desenhamos a solução.
        </p>
        <div>
          <p className="text-[0.65rem] text-[#5A7090]/60 tracking-widest uppercase mb-3 font-medium">
            Ver diagnóstico para:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium border transition-[color,background-color,border-color] duration-200 ${
                  activeTab === tab.key
                    ? "bg-[#5A7090]/15 text-[#5A7090] border-[#5A7090]/30"
                    : "text-[#5A7090]/70 border-[#5A7090]/20 hover:text-[#5A7090] hover:bg-[#5A7090]/8 hover:border-[#5A7090]/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Direita — terminal */}
      <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        <div className="bg-[#1e1712] rounded-xl border border-white/8 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.22),inset_0_-0.5px_0_rgba(0,0,0,0.18)]" />
            <span className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.22),inset_0_-0.5px_0_rgba(0,0,0,0.18)]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840] shadow-[inset_0_0.5px_0_rgba(255,255,255,0.22),inset_0_-0.5px_0_rgba(0,0,0,0.18)]" />
            <span className="text-[0.65rem] text-white/20 ml-2 tracking-wide font-medium">
              ethos · diagnóstico
            </span>
          </div>
          <div className="px-5 py-5 space-y-0.5">
            {trace.map((line, i) => (
              <div
                key={`${activeTab}-${i}`}
                className={`font-mono text-[0.75rem] leading-[1.6] transition-all duration-500 ${lineColor[line.type]} ${
                  visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
                style={{ transitionDelay: visible ? `${300 + i * 50}ms` : "0ms" }}
              >
                {line.text || <>&nbsp;</>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NaPratica() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full bg-[#F4EFE8] px-6 py-20 md:py-28 border-t border-[#8BA5BB]/20"
    >
      <div className="mx-auto max-w-5xl">
        <TerminalSection visible={visible} />
      </div>
    </section>
  );
}
