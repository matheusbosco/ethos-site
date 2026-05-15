import { Reveal } from "@/components/ui/Reveal";

interface Client {
  name: string;
  logoUrl?: string;
}

const clients: Client[] = [
  { name: "Cliente um" },
  { name: "Cliente dois" },
  { name: "Cliente três" },
  { name: "Cliente quatro" },
  { name: "Cliente cinco" },
  { name: "Cliente seis" },
];

export function ProvaSocial() {
  return (
    <section className="w-full bg-[#F4EFE8] px-6 py-20 md:py-24 border-t border-[#8BA5BB]/15">
      <div className="mx-auto max-w-5xl">

        <Reveal>
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-5 h-px bg-[#5A7090]/50" />
            <p className="text-[0.62rem] font-semibold text-[#5A7090] tracking-[0.25em] uppercase">
              Quem confia na Ethos
            </p>
            <div className="w-5 h-px bg-[#5A7090]/50" />
          </div>
          <h2
            className="text-center text-[1.5rem] md:text-[1.85rem] font-extrabold text-[#2C2620] leading-[1.2] tracking-tight max-w-2xl mx-auto mb-12"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Operações que entregamos com responsabilidade.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-center">
            {clients.map((c, i) => (
              <div
                key={i}
                className="h-16 md:h-20 rounded-xl border border-[#8BA5BB]/20 bg-white flex items-center justify-center text-[#8BA5BB]/60 text-xs font-semibold tracking-wide"
              >
                {c.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.logoUrl} alt={c.name} className="max-h-10 max-w-[80%] object-contain" />
                ) : (
                  <span aria-label={c.name}>{c.name}</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
