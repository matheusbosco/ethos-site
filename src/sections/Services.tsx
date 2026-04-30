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

// Cada flow é definido por 6 pontos: [start, control1, edge1, edge2, control2, end].
// O path é gerado dinamicamente com um deslocamento `dy` aplicado aos pontos de
// controle — isso permite morphing leve da curva (efeito rede neural respirando)
// sem reescrever os 7 paths em três variantes cada.
//
// Tanto as 4 estações quanto o Ethos têm pílulas 68×26 (rx=13). Os pontos de
// borda usados:
//   FORMS (80,80) → (107, 93)        EMAIL (400,240) → (373, 227)
//   CRM   (80,240)→ (107, 227)       WHATSAPP (400,80)→ (373, 93)
//   ETHOS topo-esq (210,150)  topo-dir (270,150)
//   ETHOS base-esq (210,170)  base-dir (270,170)
type Pt = readonly [number, number];
type FlowPts = readonly [Pt, Pt, Pt, Pt, Pt, Pt];

function flowPath(pts: FlowPts, dy = 0): string {
  const [s, c1, e1, e2, c2, e] = pts;
  return `M ${s[0]} ${s[1]} Q ${c1[0]} ${c1[1] + dy}, ${e1[0]} ${e1[1]} L ${e2[0]} ${e2[1]} Q ${c2[0]} ${c2[1] + dy}, ${e[0]} ${e[1]}`;
}

interface ChoreoFlow {
  pts: FlowPts;
  /** duração da partícula percorrendo o path (s) */
  dur: number;
  /** offset de início da partícula (s) */
  delay: number;
  /** período da oscilação da linha (s) */
  waveDur: number;
  /** offset de início da oscilação para desacoplar fases entre linhas (s) */
  waveDelay: number;
}

const CHOREO_FLOWS: ChoreoFlow[] = [
  // FORMS → WHATSAPP (entra topo-esquerdo, sai topo-direito do Ethos)
  { pts: [[107, 93], [145, 100], [210, 150], [270, 150], [335, 100], [373, 93]], dur: 4.2, delay: 0,   waveDur: 7.5, waveDelay: 0   },
  // CRM → EMAIL (entra base-esquerda, sai base-direita do Ethos)
  { pts: [[107, 227], [145, 220], [210, 170], [270, 170], [335, 220], [373, 227]], dur: 4.6, delay: 1.2, waveDur: 8.2, waveDelay: 2.0 },
  // FORMS → EMAIL (diagonal: topo-esquerdo → base-direita)
  { pts: [[107, 93], [145, 110], [210, 150], [270, 170], [335, 200], [373, 227]], dur: 5.0, delay: 2.4, waveDur: 9.0, waveDelay: 3.5 },
  // WHATSAPP → CRM (diagonal: topo-direito → base-esquerda)
  { pts: [[373, 93], [335, 110], [270, 150], [210, 170], [145, 200], [107, 227]], dur: 4.4, delay: 0.6, waveDur: 7.8, waveDelay: 1.5 },
  // EMAIL → FORMS (diagonal inversa)
  { pts: [[373, 227], [335, 200], [270, 170], [210, 150], [145, 110], [107, 93]], dur: 4.8, delay: 1.8, waveDur: 8.6, waveDelay: 0.8 },
  // FORMS → CRM (lateral esquerda)
  { pts: [[107, 93], [145, 100], [210, 150], [210, 170], [145, 220], [107, 227]], dur: 5.2, delay: 3.0, waveDur: 9.5, waveDelay: 4.2 },
  // WHATSAPP → EMAIL (lateral direita)
  { pts: [[373, 93], [335, 100], [270, 150], [270, 170], [335, 220], [373, 227]], dur: 4.6, delay: 0.3, waveDur: 8.0, waveDelay: 5.0 },
];

// Amplitude da oscilação (pixels). Mantida pequena para um efeito sutil.
const WAVE_AMPLITUDE = 4;

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

        {CHOREO_FLOWS.map((f, i) => {
          // Linha visível faz uma respiração suave — pontos de controle oscilam
          // entre +amplitude → 0 → -amplitude → 0 → +amplitude com ease-in-out.
          const dPlus = flowPath(f.pts, WAVE_AMPLITUDE);
          const dZero = flowPath(f.pts, 0);
          const dMinus = flowPath(f.pts, -WAVE_AMPLITUDE);
          const wavingD = `${dPlus};${dZero};${dMinus};${dZero};${dPlus}`;
          return (
            <path key={`cf-${i}`} d={dZero} stroke="rgba(200,154,79,0.06)" strokeWidth="0.5" fill="none">
              <animate
                attributeName="d"
                values={wavingD}
                keyTimes="0;0.25;0.5;0.75;1"
                dur={`${f.waveDur}s`}
                begin={`${f.waveDelay}s`}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
              />
            </path>
          );
        })}

        <circle cx="240" cy="160" r="34" fill="url(#choreo-core-glow2)">
          <animate attributeName="r" values="34;60;34" dur="4.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="4.5s" repeatCount="indefinite" />
        </circle>

        {CHOREO_FLOWS.map((f, i) => {
          // Bolinha some nas bordas dos 5 nós (4 estações + Ethos):
          //  • fade-in 0–5%   : emerge da borda da estação de origem
          //  • visível 5–38%  : viaja até a borda do Ethos
          //  • fade-out 38–40%: encosta na borda do Ethos
          //  • invisível 40–60%: atravessa por dentro do Ethos (segmento L)
          //  • fade-in 60–62% : ressurge na borda oposta do Ethos
          //  • visível 62–95% : viaja até a borda da estação de destino
          //  • fade-out 95–100%: encosta na borda da estação de destino
          const fadeKeyTimes = "0;0.05;0.38;0.40;0.60;0.62;0.95;1";
          const fadeValues = "0;1;1;0;0;1;1;0";
          return (
            <g key={`cp-${i}`}>
              <circle r="5" fill="url(#choreo-glow2)" opacity="0">
                <animate
                  attributeName="opacity"
                  values={fadeValues}
                  keyTimes={fadeKeyTimes}
                  dur={`${f.dur}s`}
                  repeatCount="indefinite"
                  begin={`${f.delay}s`}
                />
                <animateMotion dur={`${f.dur}s`} repeatCount="indefinite" begin={`${f.delay}s`} path={flowPath(f.pts)} />
              </circle>
              <circle r="1.8" fill="#C89A4F" opacity="0">
                <animate
                  attributeName="opacity"
                  values={fadeValues}
                  keyTimes={fadeKeyTimes}
                  dur={`${f.dur}s`}
                  repeatCount="indefinite"
                  begin={`${f.delay}s`}
                />
                <animateMotion dur={`${f.dur}s`} repeatCount="indefinite" begin={`${f.delay}s`} path={flowPath(f.pts)} />
              </circle>
            </g>
          );
        })}

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
  tag: string;
  title: string;
  description: string;
  footer: string;
}

const services: Service[] = [
  {
    id: "automacoes",
    number: "01",
    tag: "Automações",
    title: "Eliminamos o trabalho manual",
    description:
      "Fluxos automáticos que conectam Forms, CRM, WhatsApp e e-mail e tiram da sua equipe as tarefas repetitivas. Cada um é desenhado pro seu processo, não um template.",
    footer: "Integrações",
  },
  {
    id: "agentes",
    number: "02",
    tag: "Agentes de IA",
    title: "Atendemos com inteligência real",
    description:
      "Agentes que leem o contexto, qualificam leads, respondem clientes e analisam documentos. Não são respostas automáticas. Decidem em segundos.",
    footer: "Decisão autônoma",
  },
  {
    id: "ia-preditiva",
    number: "03",
    tag: "IA Preditiva",
    title: "Antecipamos o que vem depois",
    description:
      "Modelos treinados nos seus dados pra prever churn, demanda e comportamento de cliente. Você decide com base no que vai acontecer, não no que já passou.",
    footer: "Sob medida",
  },
];

// ——————————————————————————————————————————————
// Componente principal
// ——————————————————————————————————————————————

export function Services() {
  return (
    <section id="servicos" className="w-full bg-[#F4EFE8] px-6 pt-12 md:pt-16 pb-12 md:pb-16">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-[#5A7090]/50" />
            <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
              O que entregamos
            </p>
          </div>
          <h2
            className="text-[2rem] md:text-[2.6rem] font-extrabold text-[#2C2620] leading-[1.1] tracking-tight max-w-3xl mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Soluções com inteligência artificial personalizadas.
          </h2>
          <p className="text-sm font-medium text-[#8BA5BB] tracking-[0.18em] uppercase mt-3 mb-8">
            Construídas do zero, para o seu negócio. Nada de templates.
          </p>
        </Reveal>

        {/* Cards compactos em grade — 3 colunas no desktop, empilha no mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <article
                className="relative h-full rounded-2xl border border-[#8BA5BB]/20 bg-white p-7 md:p-8 flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(44,38,32,0.25)]"
                style={{ borderLeft: "3px solid #C89A4F" }}
              >
                {/* Número em marca-d'água no canto superior direito */}
                <span
                  aria-hidden
                  className="absolute top-5 right-6 text-[3.75rem] md:text-[4.25rem] font-extrabold text-[#5A7090]/12 leading-none select-none"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {s.number}
                </span>

                {/* Tag (categoria) */}
                <p className="text-[0.62rem] font-bold text-[#5A7090] tracking-[0.22em] uppercase mb-4">
                  {s.tag}
                </p>

                {/* Título — verbo de ação */}
                <h3
                  className="text-xl md:text-2xl font-extrabold text-[#2C2620] tracking-tight leading-[1.15] mb-3 pr-12"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {s.title}
                </h3>

                {/* Descrição */}
                <p className="text-sm text-[#5A7090] leading-[1.7] flex-1">
                  {s.description}
                </p>

                {/* Rodapé com divisor + label + seta */}
                <div className="border-t border-[#8BA5BB]/20 pt-4 mt-6 flex items-center justify-between">
                  <span className="text-[0.62rem] font-bold text-[#5A7090] tracking-[0.22em] uppercase">
                    {s.footer}
                  </span>
                  <span className="text-[#C89A4F] text-base leading-none" aria-hidden>
                    →
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
