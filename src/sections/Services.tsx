"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
// Dados dos serviços
// ——————————————————————————————————————————————

interface Service {
  id: string;
  number: string;
  tag: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    id: "atendimento",
    number: "01",
    tag: "ATENDIMENTO",
    title: "Você perde clientes pela demora na resposta.",
    description:
      "Agentes de IA que respondem, qualificam e encaminham contatos no WhatsApp, no site e por e-mail. Disponíveis 24 horas por dia, sem depender de atendimento humano em tempo real.",
  },
  {
    id: "operacao",
    number: "02",
    tag: "OPERAÇÃO",
    title: "Sua equipe executa manualmente o que deveria ser automático.",
    description:
      "Cobranças, agendamentos, relatórios e cadastros automatizados de ponta a ponta. A Ethos opera os fluxos repetitivos para o seu time focar no que decide.",
  },
  {
    id: "gestao",
    number: "03",
    tag: "GESTÃO",
    title: "Você decide sem visibilidade do que acontece na operação.",
    description:
      "Dashboards e integrações que conectam os seus sistemas e entregam a informação certa no momento certo, sem consolidação manual de planilhas.",
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
          <Parallax amount={16}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-[#5A7090]/50" />
              <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
                O que trava a operação
              </p>
            </div>
            <h2
              className="text-[2.25rem] md:text-[3.25rem] font-extrabold text-[#2C2620] leading-[1.08] tracking-tight max-w-3xl mb-6"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              O que está travando a sua operação agora.
            </h2>
            <p className="text-base md:text-lg text-[#5A7090] leading-[1.7] max-w-2xl mb-8">
              Você provavelmente reconhece pelo menos um deles. Para cada caso,
              a Ethos opera uma solução desenhada a partir do seu contexto, não de um modelo pronto.
            </p>
          </Parallax>
        </Reveal>

        {/* Cards — a dor em destaque; a solução, secundária */}
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

                {/* Categoria — discreta */}
                <p className="text-[0.6rem] font-bold text-[#8BA5BB] tracking-[0.24em] uppercase mb-5">
                  {s.tag}
                </p>

                {/* A dor — elemento principal do card */}
                <h3
                  className="text-[1.4rem] md:text-[1.6rem] font-extrabold text-[#2C2620] tracking-tight leading-[1.18] mb-6 pr-12"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {s.title}
                </h3>

                {/* A solução — secundária, ancorada na base */}
                <div className="mt-auto pt-5 border-t border-[#8BA5BB]/20">
                  <p className="text-[0.58rem] font-semibold text-[#C89A4F] tracking-[0.2em] uppercase mb-2.5">
                    Como a Ethos resolve
                  </p>
                  <p className="text-[0.8rem] text-[#5A7090]/80 leading-[1.65]">
                    {s.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
