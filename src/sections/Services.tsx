"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { HandwrittenCircle } from "@/components/ui/HandwrittenCircle";

interface Service {
  id: string;
  title: string;
  tags: string[];
  background: "video" | "neural" | "choreography";
  videoUrl?: string;
  posterUrl?: string;
  modal: { description: string };
}

const services: Service[] = [
  {
    id: "automacoes",
    title: "Automações",
    tags: ["Workflows", "Integrações", "WhatsApp"],
    background: "choreography",
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
    background: "neural",
    modal: {
      description:
        "Modelos treinados para prever comportamentos, gerar conteúdo e identificar padrões invisíveis ao olho humano. Da previsão de churn ao gerador de propostas comerciais — IA que aprende com seus dados.",
    },
  },
];

// ——————————————————————————————————————————————
// IA Generativa & Preditiva — "The Personalized Brain"
// Rede neural abstrata: dados do cliente entram, viram insights.
// Ethos como marca da inteligência que aprende com você.
// ——————————————————————————————————————————————

const BRAIN_INPUT_NODES = [
  { x: 70, y: 90 },
  { x: 70, y: 160 },
  { x: 70, y: 230 },
];
const BRAIN_HIDDEN_1 = [
  { x: 180, y: 70 },
  { x: 180, y: 130 },
  { x: 180, y: 190 },
  { x: 180, y: 250 },
];
const BRAIN_HIDDEN_2 = [
  { x: 290, y: 70 },
  { x: 290, y: 130 },
  { x: 290, y: 190 },
  { x: 290, y: 250 },
];
const BRAIN_OUTPUT_NODES = [
  { x: 400, y: 100 },
  { x: 400, y: 160 },
  { x: 400, y: 220 },
];

const BRAIN_ALL_NODES = [
  ...BRAIN_INPUT_NODES,
  ...BRAIN_HIDDEN_1,
  ...BRAIN_HIDDEN_2,
  ...BRAIN_OUTPUT_NODES,
];

const BRAIN_CONNECTIONS: { x1: number; y1: number; x2: number; y2: number }[] = [];
BRAIN_INPUT_NODES.forEach((a) =>
  BRAIN_HIDDEN_1.forEach((b) =>
    BRAIN_CONNECTIONS.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y })
  )
);
BRAIN_HIDDEN_1.forEach((a) =>
  BRAIN_HIDDEN_2.forEach((b) =>
    BRAIN_CONNECTIONS.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y })
  )
);
BRAIN_HIDDEN_2.forEach((a) =>
  BRAIN_OUTPUT_NODES.forEach((b) =>
    BRAIN_CONNECTIONS.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y })
  )
);

const BRAIN_PARTICLE_PATHS = [
  { path: "M 70 90 L 180 70 L 290 70 L 400 100", dur: 3.2, delay: 0 },
  { path: "M 70 90 L 180 130 L 290 130 L 400 160", dur: 2.8, delay: 0.6 },
  { path: "M 70 160 L 180 130 L 290 190 L 400 160", dur: 3.6, delay: 1.2 },
  { path: "M 70 160 L 180 190 L 290 130 L 400 100", dur: 2.6, delay: 1.8 },
  { path: "M 70 230 L 180 250 L 290 250 L 400 220", dur: 3.0, delay: 0.9 },
  { path: "M 70 230 L 180 190 L 290 190 L 400 220", dur: 3.4, delay: 2.1 },
  { path: "M 70 90 L 180 70 L 290 130 L 400 160", dur: 2.9, delay: 2.4 },
  { path: "M 70 160 L 180 250 L 290 250 L 400 220", dur: 3.8, delay: 0.3 },
  { path: "M 70 230 L 180 190 L 290 70 L 400 100", dur: 3.1, delay: 1.5 },
  { path: "M 70 90 L 180 190 L 290 190 L 400 160", dur: 2.7, delay: 2.8 },
];

function PersonalizedBrainAnimation() {
  return (
    <div className="absolute inset-0 bg-[#0D1117] overflow-hidden select-none">
      {/* Ethos watermark — IA é sua */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-[family-name:var(--font-logo)] text-[13rem] md:text-[16rem] font-semibold text-white/[0.022] leading-none tracking-tight">
          Ethos
        </span>
      </div>

      {/* Rede neural */}
      <svg
        viewBox="0 0 470 320"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="brain-particle-glow">
            <stop offset="0%" stopColor="#F0E9D6" stopOpacity="1" />
            <stop offset="40%" stopColor="#F0E9D6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#F0E9D6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="brain-node-glow">
            <stop offset="0%" stopColor="#F0E9D6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F0E9D6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Conexões (muito sutis) */}
        {BRAIN_CONNECTIONS.map((c, i) => (
          <line
            key={`bc-${i}`}
            x1={c.x1}
            y1={c.y1}
            x2={c.x2}
            y2={c.y2}
            stroke="rgba(240,233,214,0.055)"
            strokeWidth="0.4"
          />
        ))}

        {/* Nós pulsando */}
        {BRAIN_ALL_NODES.map((n, i) => (
          <g key={`bn-${i}`}>
            <circle cx={n.x} cy={n.y} r="9" fill="url(#brain-node-glow)">
              <animate
                attributeName="opacity"
                values="0.15;0.45;0.15"
                dur={`${2.8 + (i % 4) * 0.5}s`}
                repeatCount="indefinite"
                begin={`${(i * 0.27) % 3}s`}
              />
            </circle>
            <circle cx={n.x} cy={n.y} r="2" fill="#F0E9D6" opacity="0.6">
              <animate
                attributeName="opacity"
                values="0.45;1;0.45"
                dur={`${2.2 + (i % 3) * 0.4}s`}
                repeatCount="indefinite"
                begin={`${(i * 0.35) % 2.5}s`}
              />
            </circle>
          </g>
        ))}

        {/* Partículas viajando pela rede */}
        {BRAIN_PARTICLE_PATHS.map((p, i) => (
          <g key={`bp-${i}`}>
            <circle r="3.5" fill="url(#brain-particle-glow)">
              <animateMotion
                dur={`${p.dur}s`}
                repeatCount="indefinite"
                begin={`${p.delay}s`}
                path={p.path}
              />
            </circle>
            <circle r="1.3" fill="#F0E9D6">
              <animateMotion
                dur={`${p.dur}s`}
                repeatCount="indefinite"
                begin={`${p.delay}s`}
                path={p.path}
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* Header editorial */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-4 h-px bg-white/25" />
          <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/40 tracking-[0.22em] uppercase">
            IA Personalizada
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F0E9D6]/70 animate-pulse" />
          <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/40 tracking-[0.18em] uppercase">
            aprendendo
          </p>
        </div>
      </div>

      {/* Footer statement — diferencial Ethos */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
        <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/32 tracking-[0.15em] uppercase">
          Treinada com seus dados
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/32 tracking-[0.15em] uppercase">
          Apenas você a usa
        </p>
      </div>
    </div>
  );
}

// ——————————————————————————————————————————————
// Automações — "Choreography"
// Sistemas conectados. Dados fluindo em curvas coreografadas.
// Ethos como orquestrador central — tudo passa pela inteligência.
// ——————————————————————————————————————————————

const CHOREO_STATIONS = [
  { label: "FORMS", x: 80, y: 80, isCore: false },
  { label: "CRM", x: 80, y: 240, isCore: false },
  { label: "ETHOS", x: 240, y: 160, isCore: true },
  { label: "WHATSAPP", x: 400, y: 80, isCore: false },
  { label: "EMAIL", x: 400, y: 240, isCore: false },
];

const CHOREO_FLOWS = [
  { path: "M 80 80 Q 240 160, 400 80", dur: 4.2, delay: 0 },
  { path: "M 80 240 Q 240 160, 400 240", dur: 4.6, delay: 1.2 },
  { path: "M 80 80 Q 240 160, 400 240", dur: 5.0, delay: 2.4 },
  { path: "M 400 80 Q 240 160, 80 240", dur: 4.4, delay: 0.6 },
  { path: "M 400 240 Q 240 160, 80 80", dur: 4.8, delay: 1.8 },
  { path: "M 80 80 Q 240 160, 80 240", dur: 5.2, delay: 3.0 },
  { path: "M 400 80 Q 240 160, 400 240", dur: 4.6, delay: 0.3 },
];

function ChoreographyAnimation() {
  return (
    <div className="absolute inset-0 bg-[#0D1117] overflow-hidden select-none">
      {/* Ethos watermark no fundo — marca orquestradora */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-[family-name:var(--font-logo)] text-[14rem] md:text-[18rem] font-semibold text-white/[0.02] leading-none tracking-tight">
          Ethos
        </span>
      </div>

      {/* Orquestração */}
      <svg
        viewBox="0 0 480 320"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="choreo-glow">
            <stop offset="0%" stopColor="#F0E9D6" stopOpacity="1" />
            <stop offset="35%" stopColor="#F0E9D6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F0E9D6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="choreo-core-glow">
            <stop offset="0%" stopColor="#F0E9D6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F0E9D6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Paths de fundo muito sutis */}
        {CHOREO_FLOWS.map((f, i) => (
          <path
            key={`cf-${i}`}
            d={f.path}
            stroke="rgba(240,233,214,0.04)"
            strokeWidth="0.5"
            fill="none"
          />
        ))}

        {/* Core halo (aro expandindo) */}
        <circle cx="240" cy="160" r="34" fill="url(#choreo-core-glow)">
          <animate attributeName="r" values="34;60;34" dur="4.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="4.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="240" cy="160" r="34" fill="url(#choreo-core-glow)">
          <animate
            attributeName="r"
            values="34;60;34"
            dur="4.5s"
            repeatCount="indefinite"
            begin="2.25s"
          />
          <animate
            attributeName="opacity"
            values="0.8;0;0.8"
            dur="4.5s"
            repeatCount="indefinite"
            begin="2.25s"
          />
        </circle>

        {/* Partículas viajando em coreografia */}
        {CHOREO_FLOWS.map((f, i) => (
          <g key={`cp-${i}`}>
            <circle r="5" fill="url(#choreo-glow)">
              <animateMotion
                dur={`${f.dur}s`}
                repeatCount="indefinite"
                begin={`${f.delay}s`}
                path={f.path}
              />
            </circle>
            <circle r="1.8" fill="#F0E9D6">
              <animateMotion
                dur={`${f.dur}s`}
                repeatCount="indefinite"
                begin={`${f.delay}s`}
                path={f.path}
              />
            </circle>
          </g>
        ))}

        {/* Estações */}
        {CHOREO_STATIONS.map((s, i) => (
          <g key={`cs-${i}`}>
            <rect
              x={s.x - 34}
              y={s.y - 13}
              width="68"
              height="26"
              rx="13"
              fill={s.isCore ? "rgba(240,233,214,0.09)" : "rgba(255,255,255,0.035)"}
              stroke={
                s.isCore ? "rgba(240,233,214,0.45)" : "rgba(255,255,255,0.14)"
              }
              strokeWidth="0.75"
            />
            <text
              x={s.x}
              y={s.y + 3}
              textAnchor="middle"
              fill={s.isCore ? "#F0E9D6" : "rgba(255,255,255,0.58)"}
              fontSize="7.5"
              fontFamily="var(--font-mono), monospace"
              letterSpacing="2.5"
              fontWeight="500"
            >
              {s.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Header editorial */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-4 h-px bg-white/25" />
          <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/40 tracking-[0.22em] uppercase">
            Orquestração
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
          <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/40 tracking-[0.18em] uppercase">
            em execução
          </p>
        </div>
      </div>

      {/* Footer statement */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
        <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/32 tracking-[0.15em] uppercase">
          Sistemas conectados · dados fluindo
        </p>
        <p className="font-[family-name:var(--font-mono)] text-[0.58rem] text-white/32 tracking-[0.15em] uppercase">
          24 / 7
        </p>
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
      <section id="servicos" className="w-full bg-[#F0E9D6] border-t border-[#DFD6C2] px-6 pt-28 md:pt-40 pb-16 md:pb-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-6 h-px bg-[#2A3D52]/40" />
              <p className="font-[family-name:var(--font-mono)] text-[0.62rem] text-[#87867F] tracking-[0.25em] uppercase">
                O que entregamos
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-[family-name:var(--font-display)] text-[2.4rem] md:text-[3.6rem] lg:text-[4.4rem] font-extrabold text-[#1E1D1B] leading-[1.08] tracking-tight max-w-4xl">
              Soluções com inteligência artificial{" "}
              <span className="relative inline-block">
                personalizadas
                <HandwrittenCircle />
              </span>
              .
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="font-[family-name:var(--font-mono)] text-xs text-[#2A3D52]/70 tracking-[0.2em] uppercase mt-12">
              Construídas do zero — para o seu negócio, não para o mercado.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cards contidos com padding lateral */}
      <div className="w-full bg-[#F0E9D6] px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl flex flex-col rounded-xl overflow-hidden border border-[#1C2B3A]/20">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <div
                className={`relative w-full h-[540px] md:h-[620px] overflow-hidden group cursor-pointer ${
                  i > 0 ? "border-t border-[#1C2B3A]/20" : ""
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
                ) : s.background === "choreography" ? (
                  <div className="absolute inset-0 z-[1]">
                    <ChoreographyAnimation />
                  </div>
                ) : (
                  <div className="absolute inset-0 z-[1]">
                    <PersonalizedBrainAnimation />
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
