"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

interface Service {
  id: string;
  title: string;
  tags: string[];
  videoUrl: string;
  modal: {
    description: string;
    example: string;
  };
}

const services: Service[] = [
  {
    id: "automacoes",
    title: "Automações",
    tags: ["Workflows", "Integrações", "Notificações"],
    // Substitua pelo vídeo desejado — pexels.com "workflow abstract"
    videoUrl: "https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_25fps.mp4",
    modal: {
      description:
        "Conectamos sistemas, eliminamos trabalho manual repetitivo e fazemos os dados fluírem onde precisam — sem intervenção humana. Cada automação é construída para o seu processo, não adaptada de um template.",
      example:
        "Ex: clínica que reduziu 80% do tempo de confirmação de consultas com agente de WhatsApp automatizado.",
    },
  },
  {
    id: "agentes",
    title: "Agentes de IA",
    tags: ["Agentes autônomos", "Atendimento", "Análise de dados"],
    // Substitua pelo vídeo desejado — pexels.com "particles neural"
    videoUrl: "https://videos.pexels.com/video-files/2498769/2498769-uhd_2560_1440_24fps.mp4",
    modal: {
      description:
        "Agentes que raciocinam, tomam decisões e agem de forma autônoma. Qualificam leads, respondem clientes, analisam documentos e executam tarefas complexas — 24 horas por dia.",
      example:
        "Ex: escritório de advocacia com agente que triagem contratos e identifica cláusulas de risco em segundos.",
    },
  },
  {
    id: "ia-preditiva",
    title: "IA Preditiva & Generativa",
    tags: ["Modelos preditivos", "Geração de conteúdo", "Análise de padrões"],
    // Substitua pelo vídeo desejado — pexels.com "data visualization"
    videoUrl: "https://videos.pexels.com/video-files/4489794/4489794-uhd_3840_2160_25fps.mp4",
    modal: {
      description:
        "Modelos treinados para prever comportamentos, gerar conteúdo e identificar padrões invisíveis ao olho humano. Da previsão de churn ao gerador de propostas comerciais — IA que aprende com seus dados.",
      example:
        "Ex: rede de clínicas que reduziu no-show em 40% com modelo preditivo de probabilidade de cancelamento.",
    },
  },
];

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
        <p className="text-sm text-[#87867F] leading-[1.8] mb-6">{service.modal.description}</p>
        <div className="border-l-2 border-[#2A3D52] pl-4">
          <p className="text-sm text-[#1E1D1B] leading-relaxed italic">{service.modal.example}</p>
        </div>
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
                {/* Video background */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0 scale-105 group-hover:scale-100 transition-transform duration-700"
                >
                  <source src={s.videoUrl} type="video/mp4" />
                </video>

                {/* Fallback dark bg se o vídeo não carregar */}
                <div className="absolute inset-0 z-0 bg-[#1C2B3A]" />

                {/* Overlay escuro */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0D1822]/95 via-[#0D1822]/50 to-[#0D1822]/20 group-hover:from-[#0D1822]/90 transition-all duration-500" />

                {/* Conteúdo */}
                <div className="absolute inset-0 z-[2] flex flex-col justify-end p-7">
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
