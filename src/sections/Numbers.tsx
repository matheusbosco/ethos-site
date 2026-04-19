import { Reveal } from "@/components/ui/Reveal";

const metrics = [
  { value: "72h", label: "para o primeiro diagnóstico" },
  { value: "4–6", label: "semanas da descoberta à entrega" },
  { value: "100%", label: "dos projetos documentados" },
];

export function Numbers() {
  return (
    <div className="w-full bg-[#1C2B3A] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-10">
        {metrics.map((m, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="flex flex-col gap-3">
              <span className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-white leading-none tracking-tight">
                {m.value}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[0.68rem] text-white/35 tracking-wide leading-snug uppercase">
                {m.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
