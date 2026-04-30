import { Reveal } from "@/components/ui/Reveal";

interface AutomacaoCard {
  number: string;
  categoria: string;
  titulo: string;
  descricao: string;
  badges: string[];
  accentColor: "ambar" | "azul";
}

const automacoes: AutomacaoCard[] = [
  {
    number: "01",
    categoria: "Agendamento",
    titulo: "Agendamento inteligente com IA",
    descricao:
      "Assistente conversacional que encaixa consultas, respeita regras de especialidade e registra tudo direto no sistema.",
    badges: ["73% das consultas marcadas sem humano", "WhatsApp · IA", "LGPD · CFM"],
    accentColor: "ambar",
  },
  {
    number: "02",
    categoria: "Confirmação",
    titulo: "Confirmação via WhatsApp",
    descricao:
      "Fluxo de confirmação com lembrete na véspera, reagendamento automático e repasse cuidadoso para a recepção quando precisa de humano.",
    badges: ["38% menos no-show"],
    accentColor: "azul",
  },
  {
    number: "03",
    categoria: "Resultados",
    titulo: "Envio automático de resultados",
    descricao:
      "Laudos e resultados liberados para o paciente com autenticação segura, histórico e link permanente.",
    badges: ["4h entre laudo e paciente"],
    accentColor: "azul",
  },
  {
    number: "04",
    categoria: "Triagem",
    titulo: "Triagem pré-consulta",
    descricao:
      "Coletamos sintomas, histórico e preferências antes da consulta. O médico entra informado.",
    badges: ["9 min ganhos por atendimento"],
    accentColor: "azul",
  },
  {
    number: "05",
    categoria: "Relatórios",
    titulo: "Relatórios para o gestor",
    descricao:
      "Resumo da semana no WhatsApp: ocupação, faturamento, gargalos e tendências.",
    badges: ["1 mensagem · toda segunda"],
    accentColor: "azul",
  },
];

function Card({ a, fullWidth = false }: { a: AutomacaoCard; fullWidth?: boolean }) {
  const borderColor = a.accentColor === "ambar" ? "#C89A4F" : "#5A7090";
  const badgeBg = a.accentColor === "ambar"
    ? "bg-[#C89A4F]/10 border-[#C89A4F]/30 text-[#C89A4F]"
    : "bg-[#5A7090]/10 border-[#5A7090]/25 text-[#5A7090]";

  return (
    <div
      className={`relative h-full bg-white rounded-2xl p-7 md:p-8 overflow-hidden border border-[#8BA5BB]/15 flex flex-col gap-4 ${fullWidth ? "md:flex-row md:gap-10 md:items-start" : ""}`}
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      {/* Número watermark */}
      <span
        className="absolute top-4 right-6 text-6xl md:text-7xl font-extrabold leading-none select-none pointer-events-none"
        style={{ color: "rgba(139,165,187,0.09)", fontFamily: "var(--font-jakarta)" }}
      >
        {a.number}
      </span>

      <div className={fullWidth ? "flex-1" : ""}>
        <p className="text-[0.6rem] font-bold text-[#8BA5BB] tracking-[0.2em] uppercase mb-2">
          {a.categoria}
        </p>
        <h3
          className="text-lg md:text-xl font-extrabold text-[#2C2620] tracking-tight leading-snug mb-3"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {a.titulo}
        </h3>
        <p className="text-sm text-[#8BA5BB] leading-[1.75]">{a.descricao}</p>
      </div>

      <div className={`flex flex-wrap gap-2 ${fullWidth ? "md:flex-col md:items-start md:shrink-0 md:pt-6" : "mt-auto"}`}>
        {a.badges.map((badge) => (
          <span
            key={badge}
            className={`inline-flex items-center gap-1.5 text-[0.62rem] font-semibold rounded-full px-3 py-1.5 border tracking-wide ${badgeBg}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AutomacoesVivas() {
  const [card01, ...rest] = automacoes;
  const row2 = rest.slice(0, 2);
  const row3 = rest.slice(2, 4);

  return (
    <section className="w-full bg-[#F4EFE8] px-6 py-20 md:py-28 border-t border-[#8BA5BB]/20">
      <div className="mx-auto max-w-5xl">

        <Reveal>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-5 h-px bg-[#5A7090]/50" />
            <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
              Automações
            </p>
          </div>
          <h2
            className="text-[2rem] md:text-[3rem] font-extrabold text-[#2C2620] leading-[1.1] tracking-tight mb-14"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Automações que trabalham por você.
          </h2>
        </Reveal>

        {/* Card 01 — full width */}
        <Reveal>
          <div className="mb-5">
            <Card a={card01} fullWidth />
          </div>
        </Reveal>

        {/* Cards 02–03 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 items-stretch">
          {row2.map((a, i) => (
            <Reveal key={a.number} delay={i * 60}>
              <Card a={a} />
            </Reveal>
          ))}
        </div>

        {/* Cards 04–05 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
          {row3.map((a, i) => (
            <Reveal key={a.number} delay={i * 60}>
              <Card a={a} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
