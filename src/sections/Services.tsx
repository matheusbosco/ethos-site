"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

interface Service {
  id: string;
  title: string;
  tags: string[];
  background: "image" | "chat";
  imageUrl?: string;
  modal: {
    description: string;
  };
}

const services: Service[] = [
  {
    id: "automacoes",
    title: "Automações",
    tags: ["Workflows", "Integrações", "Notificações"],
    background: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2090&auto=format&fit=crop",
    modal: {
      description:
        "Conectamos sistemas, eliminamos trabalho manual repetitivo e fazemos os dados fluírem onde precisam — sem intervenção humana. Cada automação é construída para o seu processo, não adaptada de um template.",
    },
  },
  {
    id: "agentes",
    title: "Agentes de IA",
    tags: ["Agentes autônomos", "Atendimento", "Análise de dados"],
    background: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
    modal: {
      description:
        "Agentes que raciocinam, tomam decisões e agem de forma autônoma. Qualificam leads, respondem clientes, analisam documentos e executam tarefas complexas — 24 horas por dia.",
    },
  },
  {
    id: "ia-preditiva",
    title: "IA Preditiva & Generativa",
    tags: ["Modelos preditivos", "Geração de conteúdo", "Análise de padrões"],
    background: "chat",
    modal: {
      description:
        "Modelos treinados para prever comportamentos, gerar conteúdo e identificar padrões invisíveis ao olho humano. Da previsão de churn ao gerador de propostas comerciais — IA que aprende com seus dados.",
    },
  },
];

function EthosChatPreview() {
  return (
    <div className="absolute inset-0 bg-[#0D1117] flex flex-col select-none">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/8 shrink-0">
        <div className="w-7 h-7 rounded-full bg-[#2A3D52] flex items-center justify-center shrink-0">
          <span className="font-[family-name:var(--font-display)] text-white text-[0.6rem] font-extrabold">
            E
          </span>
        </div>
        <span className="text-white/80 text-sm font-medium">Ethos</span>
        <span className="ml-auto flex items-center gap-1.5 text-[0.6rem] text-emerald-400/80">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 inline-block" />
          Online
        </span>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col gap-3">
        <div className="flex justify-end">
          <div className="bg-[#2A3D52] text-white/90 text-xs rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[72%] leading-relaxed">
            Qual o nosso custo por lead esse mês?
          </div>
        </div>

        <div className="flex gap-2.5 items-start">
          <div className="w-5 h-5 rounded-full bg-[#2A3D52]/40 shrink-0 mt-0.5" />
          <div className="bg-white/6 text-white/65 text-xs rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[82%] leading-relaxed">
            R$ 47,30 por lead qualificado — 18% abaixo do mês anterior. LinkedIn orgânico foi o canal de melhor performance.
          </div>
        </div>

        <div className="flex justify-end">
          <div className="bg-[#2A3D52] text-white/90 text-xs rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[72%] leading-relaxed">
            Gere um resumo para o board.
          </div>
        </div>

        <div className="flex gap-2.5 items-end">
          <div className="w-5 h-5 rounded-full bg-[#2A3D52]/40 shrink-0" />
          <div className="bg-white/6 text-white/40 text-xs rounded-2xl rounded-tl-sm px-3.5 py-2.5">
            <span className="inline-flex gap-1 items-center">
              <span className="w-1 h-1 bg-white/35 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1 h-1 bg-white/35 rounded-full animate-bounce" style={{ animationDelay: "160ms" }} />
              <span className="w-1 h-1 bg-white/35 rounded-full animate-bounce" style={{ animationDelay: "320ms" }} />
            </span>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-white/8 px-4 py-3 shrink-0">
        <div className="bg-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white/20">
          Pergunte ao Ethos...
        </div>
      </div>
    </div>
  );
}

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

function ServiceModal({ service, onClose }: ServiceModalProps) {
  if (!service) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#F0E9D6] rounded-2xl shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#87867F] hover:text-[#1E1D1B] transition-colors rounded-lg hover:bg-[#DFD6C2]"
          aria-label="Fechar"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <p className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[#2A3D52] tracking-[0.2em] uppercase mb-4">
          {service.title}
        </p>
        <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[#1E1D1B] tracking-tight mb-4 leading-snug">
          O que fazemos nesta área
        </h3>
        <p className="text-sm text-[#87867F] leading-[1.8]">{service.modal.description}</p>
      </div>
    </div>
  );
}

export function Services() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <>
      <Section id="servicos">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-xs text-[#2A3D52] tracking-[0.2em] uppercase mb-10">
            O que entregamos
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-[#1E1D1B] leading-tight tracking-tight mb-4 max-w-lg">
            Onde aplicamos inteligência artificial.
          </h2>
          <p className="text-base text-[#87867F] mb-16 max-w-md leading-relaxed">
            Cada solução é construída para o seu processo. Nada aqui é genérico.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-xl overflow-hidden border border-[#1C2B3A]">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <div
                className="relative h-80 md:h-[420px] overflow-hidden group cursor-pointer border-b md:border-b-0 md:border-r border-[#1C2B3A] last:border-0"
                onClick={() => setActiveService(s)}
              >
                {/* Fundo escuro fallback */}
                <div className="absolute inset-0 z-0 bg-[#1C2B3A]" />

                {/* Imagem ou chat UI */}
                {s.background === "image" && s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover z-[1] scale-105 group-hover:scale-100 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 z-[1] overflow-hidden">
                    <div className="absolute inset-0 blur-[3px] scale-110">
                      <EthosChatPreview />
                    </div>
                  </div>
                )}

                {/* Overlay escuro */}
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0D1822]/98 via-[#0D1822]/65 to-[#0D1822]/10 group-hover:from-[#0D1822]/95 transition-all duration-500" />

                {/* Conteúdo */}
                <div className="absolute inset-0 z-[3] flex flex-col justify-end p-7">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                    {s.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-[family-name:var(--font-mono)] text-[0.62rem] text-white/70 bg-white/10 border border-white/15 rounded-full px-3 py-1 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white transition-colors group/btn w-fit"
                    onClick={(e) => { e.stopPropagation(); setActiveService(s); }}
                  >
                    <span>Saiba mais</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  );
}
