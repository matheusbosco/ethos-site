"use client";

import { useRef, useEffect, useState } from "react";

// ——————————————————————————————————————————————
// BLOCO A — WhatsApp animado
// ——————————————————————————————————————————————

type MsgType = "bot" | "patient" | "slots" | "badge";

interface ChatMsg {
  type: MsgType;
  text?: string;
  time?: string;
  ticks?: boolean;
  slots?: string[];
  selectedSlot?: string;
}

const chatMessages: ChatMsg[] = [
  { type: "bot", text: "Olá, Marina! 🌺 Aqui é a Ethos, assistente da Clínica Meridian.", time: "09:10" },
  { type: "bot", text: "Confirmando sua consulta com Dra. Helena — amanhã, 14h30. Posso confirmar?", time: "09:12" },
  { type: "patient", text: "Consegue trocar pra sexta? Surgiu um imprevisto", time: "09:14", ticks: true },
  { type: "bot", text: "Claro. Tenho estes horários na sexta:", time: "09:16" },
  { type: "slots", slots: ["Sex 09:00", "Sex 10:00", "Sex 11:30", "Sex 14:00"], selectedSlot: "Sex 10:00" },
  { type: "patient", text: "Sexta 10h perfeito", time: "09:20", ticks: true },
  { type: "bot", text: "Reagendado ✓ Dra. Helena · sexta 10h00. Te lembro no dia anterior.", time: "09:22" },
  { type: "badge", text: "ATUALIZADO NO SISTEMA · 0 INTERVENÇÕES HUMANAS" },
];

const backofficeLog = [
  { time: "09:10", action: "Intenção detectada", result: "Reagendamento" },
  { time: "09:11", action: "Sistema consultado", result: "4 slots livres" },
  { time: "09:13", action: "Paciente escolheu", result: "Sex 10:00" },
  { time: "09:13", action: "Gravado no ERP", result: "✓ Meridian" },
];

function BotIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#C89A4F] flex items-center justify-center shrink-0">
      <div className="flex flex-col gap-[3px]">
        {[0,1,2].map(i => <div key={i} className="h-[1.5px] w-3.5 rounded-full bg-[#2C2620]" />)}
      </div>
    </div>
  );
}

function WhatsAppSection({ visible }: { visible: boolean }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (step >= chatMessages.length) return;
    const delay = step === 0 ? 400 : 900;
    const id = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(id);
  }, [visible, step]);

  const shownMessages = chatMessages.slice(0, step);
  const shownLogItems = backofficeLog.slice(0, Math.max(0, step - 2));

  return (
    <div>
      {/* Label + título */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-5 h-px bg-[#5A7090]/50" />
        <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
          04 · Na Prática
        </p>
      </div>
      <h2
        className="text-[2rem] md:text-[2.8rem] font-extrabold text-[#2C2620] leading-[1.1] tracking-tight mb-3"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        Um dia no WhatsApp da sua clínica.
      </h2>
      <p className="text-base text-[#8BA5BB] mb-12 leading-relaxed">
        A simulação abaixo é real — os mesmos fluxos que rodam em produção.
      </p>

      {/* Dois painéis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Painel esquerdo — WhatsApp mock */}
        <div className="rounded-2xl overflow-hidden bg-[#111B21] flex flex-col min-h-[500px]">
          {/* Header do chat */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-[#202C33] border-b border-white/5">
            <BotIcon />
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Clínica Meridian</p>
              <p className="text-[0.62rem] text-emerald-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1" />
                online · via Ethos
              </p>
            </div>
            <div className="flex items-center gap-3 text-white/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .98h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
              </svg>
            </div>
          </div>

          {/* Mensagens */}
          <div className="flex-1 px-3 py-4 flex flex-col gap-2.5 overflow-hidden">
            {shownMessages.map((msg, i) => {
              if (msg.type === "bot") return (
                <div key={i} className="flex gap-2 items-end max-w-[85%] animate-fade-in">
                  <div className="bg-[#202C33] rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                    <p className="text-[0.82rem] text-white/90 leading-[1.5]">{msg.text}</p>
                    <p className="text-[0.6rem] text-white/30 mt-1 text-right">{msg.time}</p>
                  </div>
                </div>
              );
              if (msg.type === "patient") return (
                <div key={i} className="flex justify-end animate-fade-in">
                  <div className="bg-[#005C4B] rounded-2xl rounded-br-sm px-3.5 py-2.5 max-w-[80%]">
                    <p className="text-[0.82rem] text-white/90 leading-[1.5]">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <p className="text-[0.6rem] text-white/40">{msg.time}</p>
                      {msg.ticks && <span className="text-[0.62rem] text-[#34B7F1]">✓✓</span>}
                    </div>
                  </div>
                </div>
              );
              if (msg.type === "slots") return (
                <div key={i} className="flex gap-2 items-end max-w-[85%] animate-fade-in">
                  <div className="bg-[#202C33] rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      {msg.slots?.map((slot) => (
                        <button
                          key={slot}
                          className={`text-[0.78rem] font-medium rounded-lg px-3 py-2 border transition-colors ${
                            slot === msg.selectedSlot
                              ? "bg-[#C89A4F] border-[#C89A4F] text-[#2C2620]"
                              : "border-white/20 text-white/70"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
              if (msg.type === "badge") return (
                <div key={i} className="flex justify-center animate-fade-in mt-1">
                  <span className="text-[0.6rem] font-bold text-white/40 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 tracking-[0.12em] uppercase">
                    {msg.text}
                  </span>
                </div>
              );
              return null;
            })}
          </div>
        </div>

        {/* Painel direito — back-office log */}
        <div className="rounded-2xl bg-white border border-[#8BA5BB]/20 p-7 md:p-8 flex flex-col gap-6 min-h-[500px]">
          <div>
            <p className="text-[0.6rem] font-bold text-[#8BA5BB] tracking-[0.2em] uppercase mb-3">
              No Back-Office
            </p>
            <h3
              className="text-xl md:text-2xl font-extrabold text-[#2C2620] leading-snug"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              A paciente reagendou sozinha.
            </h3>
          </div>

          <div className="flex-1 flex flex-col gap-0 divide-y divide-[#F4EFE8]">
            {backofficeLog.map((log, i) => (
              <div
                key={i}
                className={`flex items-center justify-between py-4 transition-all duration-500 ${
                  i < shownLogItems.length ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[0.6rem] font-medium text-[#8BA5BB] tracking-wide w-10 shrink-0">{log.time}</span>
                  <span className="text-sm text-[#5A7090] font-medium">{log.action}</span>
                </div>
                <span className="text-sm font-bold text-[#2C2620]">{log.result}</span>
              </div>
            ))}
          </div>

          {/* Chip de custo */}
          <div className="border border-[#8BA5BB]/20 rounded-xl px-5 py-3.5 flex items-center gap-3">
            <div className="flex flex-col gap-[3px] shrink-0">
              {[0,1,2].map(i => <div key={i} className="h-[2px] w-4 rounded-full bg-[#C89A4F]" />)}
            </div>
            <p className="text-[0.75rem] font-semibold text-[#5A7090]">
              0 min de equipe humana · R$ 0,18 por atendimento
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ——————————————————————————————————————————————
// BLOCO B — Terminal diagnóstico (ex-TechProof)
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
  running: "text-[#8BA5BB]",
  output: "text-white/70",
  success: "text-[#C89A4F]",
  done: "text-white/90 font-medium",
  blank: "h-3",
};

function TerminalSection({ visible }: { visible: boolean }) {
  const [activeTab, setActiveTab] = useState<"leads" | "saude">("leads");
  const trace = traces[activeTab];

  return (
    <div className="mt-20 md:mt-28 pt-16 border-t border-[#8BA5BB]/20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        {/* Esquerda */}
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase mb-8">
            Diagnóstico
          </p>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-[#2C2620] leading-tight tracking-tight mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            O diagnóstico vem antes de qualquer proposta.
          </h2>
          <p className="text-[#8BA5BB] leading-[1.85] text-base mb-10">
            Antes de escrever uma linha de código, mapeamos o processo real —
            não o idealizado. Medimos o custo atual, identificamos o gargalo e
            só então desenhamos a solução.
          </p>
          <div className="flex flex-col gap-2">
            <p className="text-[0.65rem] text-[#8BA5BB]/50 tracking-widest uppercase mb-2 font-medium">
              Ver diagnóstico para:
            </p>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "leads" | "saude")}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-[#5A7090]/15 text-[#5A7090] border border-[#5A7090]/30"
                    : "text-[#8BA5BB]/50 hover:text-[#8BA5BB] hover:bg-[#5A7090]/8 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Direita — terminal */}
        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="bg-[#1e1712] rounded-xl border border-white/8 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="text-[0.65rem] text-white/20 ml-2 tracking-wide font-medium">
                ethos — diagnóstico
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
    </div>
  );
}

// ——————————————————————————————————————————————
// Componente principal
// ——————————————————————————————————————————————

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
        <WhatsAppSection visible={visible} />
        <TerminalSection visible={visible} />
      </div>
    </section>
  );
}
