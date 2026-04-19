import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center bg-[#FAF9F5] px-6 pt-16">
      <div className="mx-auto max-w-5xl py-28 md:py-36">
        <p className="text-sm font-medium text-[#7C5C3E] tracking-widest uppercase mb-6">
          Agência de IA
        </p>

        <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl font-bold text-[#141413] leading-[1.1] tracking-tight mb-8 max-w-3xl">
          Inteligência sob medida.
        </h1>

        <p className="text-lg md:text-xl text-[#87867F] leading-relaxed max-w-xl mb-12">
          [Placeholder — uma frase que completa o posicionamento. O que a Ethos
          faz de diferente e para quem.]
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button as="a" href="#contato" variant="primary" className="text-base px-8 py-4">
            Iniciar diálogo
          </Button>
          <Button as="a" href="#servicos" variant="secondary" className="text-base px-8 py-4">
            O que entregamos
          </Button>
        </div>
      </div>
    </section>
  );
}
