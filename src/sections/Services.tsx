"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

interface Service {
  id: string;
  title: string;
  tags: string[];
  background: "video" | "chat";
  videoUrl?: string;
  posterUrl?: string;
  modal: { description: string };
}

const services: Service[] = [
  {
    id: "automacoes",
    title: "Automações",
    tags: ["Workflows", "Integrações", "Notificações"],
    background: "video",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-flowing-data-network-27506-large.mp4",
    posterUrl:
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
    background: "video",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-with-blue-luminescent-neon-9099-large.mp4",
    posterUrl:
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

const AI_RESPONSE_WORDS =
  "Com base nos padrões identificados, sua maior concentração de churn está em clientes com menos de 60 dias de contrato. Recomendo uma campanha de onboarding focada na semana 3 para este segmento.".split(
    " "
  );

function AIPredictiveAnimation() {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);
  const [visibleWords, setVisibleWords] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    setPhase(0);
    setVisibleWords(0);
    const t1 = setTimeout(() => setPhase(1), 1600);
    const t2 = setTimeout(() => setPhase(2), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [loopKey]);

  useEffect(() => {
    if (phase !== 2) return;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleWords(count);
      if (count >= AI_RESPONSE_WORDS.length) {
        clearInterval(interval);
        setTimeout(() => setLoopKey((k) => k + 1), 2800);
      }
    }, 90);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="absolute inset-0 bg-[#0D1117] flex items-center justify-center select-none overflow-hidden">
      <div className="w-full max-w-xl px-10 py-8">
        {/* Prompt do usuário */}
        <div
          className={`mb-8 transition-[opacity,transform] duration-700 ${
            phase >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/25 tracking-[0.2em] uppercase mb-3">
            Consulta
          </p>
          <div className="inline-block bg-[#2A3D52] text-white/85 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] leading-relaxed">
            Analise o churn dos últimos 90 dias e projete os próximos 30.
          </div>
        </div>

        {/* Métricas */}
        <div
          className={`mb-8 grid grid-cols-2 gap-3 transition-[opacity,transform] duration-700 delay-100 ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-white/5 rounded-xl p-4 border border-white/8">
            <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/30 tracking-widest uppercase mb-2">
              Churn rate
            </p>
            <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
              23,4%
            </p>
            <p className="text-[0.62rem] text-red-400/65 mt-1.5">↑ 4,1% vs mês anterior</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/8">
            <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/30 tracking-widest uppercase mb-2">
              Em risco
            </p>
            <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
              R$ 48k
            </p>
            <p className="text-[0.62rem] text-white/25 mt-1.5">próximos 30 dias</p>
          </div>
        </div>

        {/* Texto gerado */}
        <div
          className={`transition-opacity duration-500 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}
        >
          <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/25 tracking-[0.2em] uppercase mb-3">
            Análise gerada
          </p>
          <p className="text-sm text-white/55 leading-[1.75]">
            {AI_RESPONSE_WORDS.slice(0, visibleWords).join(" ")}
            {phase >= 2 && visibleWords < AI_RESPONSE_WORDS.length && (
              <span className="inline-block w-0.5 h-3.5 bg-white/40 ml-0.5 animate-pulse align-middle" />
            )}
          </p>
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
  const index = service ? services.findIndex((s) => s.id === service.id) : -1;

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md bg-[#F0E9D6] rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 70, damping: 16 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra de acento */}
            <div className="h-1 bg-[#2A3D52] w-full" />

            {/* Número decorativo */}
            {index >= 0 && (
              <div className="absolute top-2 right-6 font-[family-name:var(--font-display)] text-8xl font-extrabold text-[#1E1D1B]/5 select-none pointer-events-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </div>
            )}

            <div className="p-8">
              <button
                onClick={onClose}
                className="absolute top-5 right-4 w-8 h-8 flex items-center justify-center text-[#87867F] hover:text-[#1E1D1B] transition-colors rounded-lg hover:bg-[#DFD6C2]"
                aria-label="Fechar"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <p className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[#2A3D52] tracking-[0.2em] uppercase mb-4">
                {service.title}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-[#1E1D1B] tracking-tight mb-4 leading-snug">
                O que fazemos nesta área
              </h3>
              <p className="text-sm text-[#87867F] leading-[1.8]">
                {service.modal.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Services() {
  const [activeService, setActiveService] = useState<Service | null>(null);

  return (
    <>
      {/* Header — max-width contido */}
      <section id="servicos" className="w-full bg-[#F0E9D6] px-6 pt-20 md:pt-28 pb-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[#2A3D52] tracking-[0.2em] uppercase mb-10">
              O que entregamos
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-[#1E1D1B] leading-tight tracking-tight mb-4 max-w-lg">
              Onde aplicamos inteligência artificial.
            </h2>
            <p className="text-base text-[#87867F] max-w-md leading-relaxed">
              Cada solução é construída para o seu processo. Nada aqui é genérico.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cards full-width empilhados */}
      <div className="w-full bg-[#F0E9D6] pb-20 md:pb-28">
        <div className="flex flex-col">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <div
                className={`relative w-full h-[580px] md:h-[680px] overflow-hidden group cursor-pointer ${
                  i > 0 ? "border-t border-[#1C2B3A]/15" : ""
                }`}
                onClick={() => setActiveService(s)}
              >
                {/* Fallback escuro */}
                <div className="absolute inset-0 z-0 bg-[#1C2B3A]" />

                {/* Background */}
                {s.background === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={s.posterUrl}
                    className="absolute inset-0 w-full h-full object-cover z-[1] scale-105 group-hover:scale-100 transition-transform duration-700"
                  >
                    <source src={s.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div className="absolute inset-0 z-[1]">
                    <AIPredictiveAnimation />
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0D1822]/95 via-[#0D1822]/50 to-[#0D1822]/5 group-hover:from-[#0D1822]/90 transition-[background] duration-500" />

                {/* Conteúdo */}
                <div className="absolute inset-0 z-[3] flex flex-col justify-end p-10 md:p-16">
                  <div className="max-w-3xl">
                    <span className="font-[family-name:var(--font-mono)] text-[0.65rem] text-white/25 tracking-[0.2em] uppercase mb-4 block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
                      {s.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-6">
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
                      className="inline-flex items-center gap-2 text-sm font-medium text-white/75 hover:text-white transition-colors group/btn w-fit"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveService(s);
                      }}
                    >
                      <span>Saiba mais</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
    </>
  );
}
