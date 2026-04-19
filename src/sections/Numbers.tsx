import { Reveal } from "@/components/ui/Reveal";

const metrics = [
  { value: "72h", label: "para o primeiro diagnóstico" },
  { value: "4–6", label: "semanas da descoberta à entrega" },
  { value: "100%", label: "dos projetos documentados" },
];

export function Numbers() {
  return (
    <div className="w-full bg-[#1C2B3A] px-6 py-20 md:py-24">
      <div className="mx-auto max-w-5xl flex flex-col gap-14">
        <Reveal>
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] text-white/20 tracking-[0.25em] uppercase text-center">
            O que você pode esperar
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-white/8">
          {metrics.map((m, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="flex flex-col items-center gap-4 px-8 py-8 md:py-0 text-center border-b md:border-b-0 border-white/8 last:border-b-0">
                <span className="font-[family-name:var(--font-display)] text-6xl md:text-7xl font-extrabold text-white leading-none tracking-tight">
                  {m.value}
                </span>
                <div className="w-8 h-px bg-white/15" />
                <span className="font-[family-name:var(--font-mono)] text-[0.68rem] text-white/35 tracking-[0.12em] leading-relaxed uppercase max-w-[14ch] text-center">
                  {m.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
