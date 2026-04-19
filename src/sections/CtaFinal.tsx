import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";

export function CtaFinal() {
  return (
    <Section id="contato">
      <div className="max-w-2xl">
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#141413] leading-[1.15] tracking-tight mb-6">
          [Placeholder — frase de encerramento forte. Uma pergunta ou provocação.]
        </h2>

        <p className="text-lg text-[#87867F] leading-relaxed mb-12 max-w-md">
          [Placeholder — uma linha que reduz a fricção para entrar em contato.]
        </p>

        <Button as="a" href="mailto:contato@ethos.ai" variant="primary" className="text-base px-8 py-4">
          Iniciar diálogo
        </Button>
      </div>
    </Section>
  );
}
