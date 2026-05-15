import { Reveal } from "@/components/ui/Reveal";

interface Persona {
  id: string;
  tag: string;
  title: string;
  description: string;
}

const personas: Persona[] = [
  {
    id: "porte",
    tag: "Porte",
    title: "PMEs em fase de profissionalização.",
    description:
      "Entre 10 e 200 funcionários, com a operação crescendo mais rápido do que a estrutura interna acompanha.",
  },
  {
    id: "governance",
    tag: "Governance",
    title: "Empresas sem CTO ou TI dedicada.",
    description:
      "Não há interesse em contratar e gerenciar um time de tecnologia. A operação digital precisa funcionar sob outra responsabilidade.",
  },
  {
    id: "momento",
    tag: "Momento",
    title: "Negócios em escala recente.",
    description:
      "Cresceram de duas a cinco vezes nos últimos 24 meses. A operação manual já não acompanha o volume.",
  },
  {
    id: "modelo",
    tag: "Modelo",
    title: "Times enxutos com alavancagem alta.",
    description:
      "Equipes pequenas operando o que normalmente exige times três vezes maiores. Cada hora liberada do humano vale muito.",
  },
];

export function ParaQuem() {
  return (
    <section className="w-full bg-[#F4EFE8] px-6 py-20 md:py-28 border-t border-[#8BA5BB]/15">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-[#5A7090]/50" />
            <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
              Para quem é
            </p>
          </div>
          <h2
            className="text-[2.25rem] md:text-[3.25rem] font-extrabold text-[#2C2620] leading-[1.08] tracking-tight max-w-3xl mb-6"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Você provavelmente se reconhece em um destes perfis.
          </h2>
          <p className="text-base md:text-lg text-[#5A7090] leading-[1.7] max-w-2xl mb-12">
            Quatro recortes do tipo de empresa para quem a Ethos foi desenhada,
            cruzando porte, governança de tecnologia, momento e modelo de operação.
          </p>
        </Reveal>

        {/* Grid de personas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {personas.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <article className="h-full rounded-2xl border border-[#8BA5BB]/20 bg-white p-7 md:p-8 flex flex-col gap-4 transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(44,38,32,0.25)]">
                <p className="text-[0.6rem] font-bold text-[#C89A4F] tracking-[0.24em] uppercase">
                  {p.tag}
                </p>
                <h3
                  className="text-[1.25rem] md:text-[1.4rem] font-extrabold text-[#2C2620] tracking-tight leading-[1.2]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {p.title}
                </h3>
                <p className="text-[0.9rem] text-[#5A7090]/85 leading-[1.7]">
                  {p.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
