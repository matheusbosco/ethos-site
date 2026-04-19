const technologies = [
  { name: "OpenAI", sub: "GPT-4o" },
  { name: "Anthropic", sub: "Claude" },
  { name: "n8n", sub: "Automação" },
  { name: "Make", sub: "Integrações" },
  { name: "LangGraph", sub: "Agentes" },
  { name: "Python", sub: "Backend" },
];

export function TechStack() {
  return (
    <div className="w-full border-y border-[#DFD6C2] px-6 py-10">
      <div className="mx-auto max-w-5xl flex flex-col gap-8">
        <p className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[#87867F] tracking-[0.2em] uppercase text-center">
          Tecnologias que dominamos
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-1.5 opacity-40 hover:opacity-75 transition-opacity duration-300 cursor-default"
            >
              <span className="font-[family-name:var(--font-display)] text-base font-extrabold text-[#1E1D1B] tracking-tight">
                {tech.name}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[0.58rem] text-[#87867F] tracking-widest uppercase">
                {tech.sub}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
