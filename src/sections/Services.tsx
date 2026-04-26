"use client";

import { Reveal } from "@/components/ui/Reveal";

// ——————————————————————————————————————————————
// Automações — Choreography: sistemas conectados, dados fluindo
// ——————————————————————————————————————————————

const CHOREO_STATIONS = [
  { label: "FORMS", x: 80, y: 80, isCore: false },
  { label: "CRM", x: 80, y: 240, isCore: false },
  { label: "ETHOS", x: 240, y: 160, isCore: true },
  { label: "WHATSAPP", x: 400, y: 80, isCore: false },
  { label: "EMAIL", x: 400, y: 240, isCore: false },
];

// Caminhos em dois segmentos: cada partícula passa pelo Ethos (240,160) antes
// de seguir para o próximo canal. O fim do primeiro segmento coincide com o
// início do segundo, garantindo que a bolinha entre no nome Ethos.
const CHOREO_FLOWS = [
  { path: "M 80 80 Q 160 100, 240 160 Q 320 100, 400 80", dur: 4.2, delay: 0 },
  { path: "M 80 240 Q 160 220, 240 160 Q 320 220, 400 240", dur: 4.6, delay: 1.2 },
  { path: "M 80 80 Q 180 130, 240 160 Q 300 190, 400 240", dur: 5.0, delay: 2.4 },
  { path: "M 400 80 Q 300 130, 240 160 Q 180 190, 80 240", dur: 4.4, delay: 0.6 },
  { path: "M 400 240 Q 300 190, 240 160 Q 180 130, 80 80", dur: 4.8, delay: 1.8 },
  { path: "M 80 80 Q 140 100, 240 160 Q 140 220, 80 240", dur: 5.2, delay: 3.0 },
  { path: "M 400 80 Q 340 100, 240 160 Q 340 220, 400 240", dur: 4.6, delay: 0.3 },
];

function ChoreographyAnimation() {
  return (
    <div className="absolute inset-0 bg-[#0D1117] overflow-hidden select-none">
      <svg
        viewBox="0 0 480 320"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="choreo-glow2">
            <stop offset="0%" stopColor="#C89A4F" stopOpacity="1" />
            <stop offset="35%" stopColor="#C89A4F" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C89A4F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="choreo-core-glow2">
            <stop offset="0%" stopColor="#C89A4F" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#C89A4F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {CHOREO_FLOWS.map((f, i) => (
          <path key={`cf-${i}`} d={f.path} stroke="rgba(200,154,79,0.06)" strokeWidth="0.5" fill="none" />
        ))}

        <circle cx="240" cy="160" r="34" fill="url(#choreo-core-glow2)">
          <animate attributeName="r" values="34;60;34" dur="4.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="4.5s" repeatCount="indefinite" />
        </circle>

        {CHOREO_FLOWS.map((f, i) => (
          <g key={`cp-${i}`}>
            <circle r="5" fill="url(#choreo-glow2)">
              <animateMotion dur={`${f.dur}s`} repeatCount="indefinite" begin={`${f.delay}s`} path={f.path} />
            </circle>
            <circle r="1.8" fill="#C89A4F">
              <animateMotion dur={`${f.dur}s`} repeatCount="indefinite" begin={`${f.delay}s`} path={f.path} />
            </circle>
          </g>
        ))}

        {CHOREO_STATIONS.map((s, i) => (
          <g key={`cs-${i}`}>
            <rect
              x={s.x - 34} y={s.y - 13} width="68" height="26" rx="13"
              fill={s.isCore ? "rgba(200,154,79,0.12)" : "rgba(255,255,255,0.035)"}
              stroke={s.isCore ? "rgba(200,154,79,0.5)" : "rgba(255,255,255,0.12)"}
              strokeWidth="0.75"
            />
            <text
              x={s.x} y={s.y + 3} textAnchor="middle"
              fill={s.isCore ? "#C89A4F" : "rgba(255,255,255,0.55)"}
              fontSize="7.5" fontFamily="var(--font-jakarta), sans-serif"
              letterSpacing="2.5" fontWeight="600"
            >
              {s.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
        <span className="text-[0.58rem] text-white/30 tracking-[0.2em] uppercase font-medium">Orquestração</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
          <span className="text-[0.58rem] text-white/30 tracking-[0.15em] uppercase">em execução</span>
        </div>
      </div>
    </div>
  );
}

// ——————————————————————————————————————————————
// IA Preditiva — rede neural abstrata
// ——————————————————————————————————————————————

const BRAIN_INPUT_NODES = [{ x: 70, y: 90 }, { x: 70, y: 160 }, { x: 70, y: 230 }];
const BRAIN_HIDDEN_1 = [{ x: 180, y: 70 }, { x: 180, y: 130 }, { x: 180, y: 190 }, { x: 180, y: 250 }];
const BRAIN_HIDDEN_2 = [{ x: 290, y: 70 }, { x: 290, y: 130 }, { x: 290, y: 190 }, { x: 290, y: 250 }];
const BRAIN_OUTPUT_NODES = [{ x: 400, y: 100 }, { x: 400, y: 160 }, { x: 400, y: 220 }];
const BRAIN_ALL_NODES = [...BRAIN_INPUT_NODES, ...BRAIN_HIDDEN_1, ...BRAIN_HIDDEN_2, ...BRAIN_OUTPUT_NODES];

const BRAIN_CONNECTIONS: { x1: number; y1: number; x2: number; y2: number }[] = [];
BRAIN_INPUT_NODES.forEach((a) => BRAIN_HIDDEN_1.forEach((b) => BRAIN_CONNECTIONS.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y })));
BRAIN_HIDDEN_1.forEach((a) => BRAIN_HIDDEN_2.forEach((b) => BRAIN_CONNECTIONS.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y })));
BRAIN_HIDDEN_2.forEach((a) => BRAIN_OUTPUT_NODES.forEach((b) => BRAIN_CONNECTIONS.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y })));

const BRAIN_PARTICLE_PATHS = [
  { path: "M 70 90 L 180 70 L 290 70 L 400 100", dur: 3.2, delay: 0 },
  { path: "M 70 90 L 180 130 L 290 130 L 400 160", dur: 2.8, delay: 0.6 },
  { path: "M 70 160 L 180 130 L 290 190 L 400 160", dur: 3.6, delay: 1.2 },
  { path: "M 70 160 L 180 190 L 290 130 L 400 100", dur: 2.6, delay: 1.8 },
  { path: "M 70 230 L 180 250 L 290 250 L 400 220", dur: 3.0, delay: 0.9 },
];

function PersonalizedBrainAnimation() {
  return (
    <div className="absolute inset-0 bg-[#0D1117] overflow-hidden select-none">
      <svg viewBox="0 0 470 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="brain-particle-glow2">
            <stop offset="0%" stopColor="#C89A4F" stopOpacity="1" />
            <stop offset="40%" stopColor="#C89A4F" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C89A4F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="brain-node-glow2">
            <stop offset="0%" stopColor="#C89A4F" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C89A4F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {BRAIN_CONNECTIONS.map((c, i) => (
          <line key={`bc-${i}`} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="rgba(200,154,79,0.06)" strokeWidth="0.4" />
        ))}

        {BRAIN_ALL_NODES.map((n, i) => (
          <g key={`bn-${i}`}>
            <circle cx={n.x} cy={n.y} r="9" fill="url(#brain-node-glow2)">
              <animate attributeName="opacity" values="0.15;0.45;0.15" dur={`${2.8 + (i % 4) * 0.5}s`} repeatCount="indefinite" begin={`${(i * 0.27) % 3}s`} />
            </circle>
            <circle cx={n.x} cy={n.y} r="2" fill="#C89A4F" opacity="0.6">
              <animate attributeName="opacity" values="0.45;1;0.45" dur={`${2.2 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${(i * 0.35) % 2.5}s`} />
            </circle>
          </g>
        ))}

        {BRAIN_PARTICLE_PATHS.map((p, i) => (
          <g key={`bp-${i}`}>
            <circle r="3.5" fill="url(#brain-particle-glow2)">
              <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`} path={p.path} />
            </circle>
            <circle r="1.3" fill="#C89A4F">
              <animateMotion dur={`${p.dur}s`} repeatCount="indefinite" begin={`${p.delay}s`} path={p.path} />
            </circle>
          </g>
        ))}
      </svg>

      <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
        <span className="text-[0.58rem] text-white/30 tracking-[0.2em] uppercase font-medium">IA Personalizada</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C89A4F]/80 animate-pulse" />
          <span className="text-[0.58rem] text-white/30 tracking-[0.15em] uppercase">aprendendo</span>
        </div>
      </div>
    </div>
  );
}

// ——————————————————————————————————————————————
// Dados dos serviços
// ——————————————————————————————————————————————

interface Service {
  id: string;
  number: string;
  title: string;
  tags: string[];
  description: string;
  background: "video" | "neural" | "choreography";
  videoUrl?: string;
  posterUrl?: string;
}

const services: Service[] = [
  {
    id: "automacoes",
    number: "01",
    title: "Automações",
    tags: ["Workflows", "Integrações", "WhatsApp"],
    description:
      "Conectamos sistemas, eliminamos trabalho manual repetitivo e fazemos os dados fluírem onde precisam — sem intervenção humana. Cada automação é construída para o seu processo, não adaptada de um template.",
    background: "choreography",
  },
  {
    id: "agentes",
    number: "02",
    title: "Agentes de IA",
    tags: ["Agentes autônomos", "Atendimento", "Análise de dados"],
    description:
      "Agentes que raciocinam, tomam decisões e agem de forma autônoma. Qualificam leads, respondem clientes, analisam documentos e executam tarefas complexas — 24 horas por dia.",
    background: "video",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-robotic-arm-with-blue-luminescent-neon-9099-large.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "ia-preditiva",
    number: "03",
    title: "IA Preditiva & Generativa",
    tags: ["Modelos preditivos", "Geração de conteúdo", "Análise de padrões"],
    description:
      "Modelos treinados para prever comportamentos, gerar conteúdo e identificar padrões invisíveis ao olho humano. Da previsão de churn ao gerador de propostas comerciais — IA que aprende com seus dados.",
    background: "neural",
  },
];

// ——————————————————————————————————————————————
// Componente principal
// ——————————————————————————————————————————————

export function Services() {
  return (
    <section id="servicos" className="w-full bg-[#F4EFE8] px-6 pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-5 h-px bg-[#5A7090]/50" />
            <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
              O que entregamos
            </p>
          </div>
          <h2
            className="text-[2.2rem] md:text-[3.2rem] font-extrabold text-[#2C2620] leading-[1.1] tracking-tight max-w-3xl mb-4"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Soluções com inteligência artificial personalizadas.
          </h2>
          <p className="text-sm font-medium text-[#8BA5BB] tracking-[0.18em] uppercase mt-8 mb-14">
            Construídas do zero — para o seu negócio, não para o mercado.
          </p>
        </Reveal>

        {/* Cards split horizontal */}
        <div className="flex flex-col gap-5">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden border border-[#8BA5BB]/20 bg-white min-h-[380px] md:min-h-[420px]"
                style={{ borderLeft: "3px solid #C89A4F" }}
              >
                {/* Painel esquerdo — media */}
                <div className="relative md:w-[45%] min-h-[240px] md:min-h-full flex-shrink-0 bg-[#0D1117] overflow-hidden">
                  {s.background === "video" ? (
                    <video
                      autoPlay loop muted playsInline poster={s.posterUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={s.videoUrl} type="video/mp4" />
                    </video>
                  ) : s.background === "choreography" ? (
                    <ChoreographyAnimation />
                  ) : (
                    <PersonalizedBrainAnimation />
                  )}
                </div>

                {/* Painel direito — conteúdo */}
                <div className="flex-1 flex flex-col justify-center p-8 md:p-10 lg:p-14">
                  <span className="text-[0.65rem] font-bold text-[#8BA5BB] tracking-[0.2em] uppercase mb-5 block">
                    {s.number}
                  </span>
                  <h3
                    className="text-2xl md:text-3xl font-extrabold text-[#2C2620] tracking-tight mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {s.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.65rem] font-semibold text-[#5A7090] bg-[#5A7090]/10 border border-[#5A7090]/20 rounded-full px-3 py-1 tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-base text-[#5A7090] leading-[1.8]">
                    {s.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
