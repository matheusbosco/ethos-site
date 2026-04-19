import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

export function CtaFinal() {
  return (
    <Section id="contato">
      <Reveal>
        <div className="w-12 h-px bg-[#2A3D52] mb-12" />
        <h2 className="font-[family-name:var(--font-heading)] italic text-4xl md:text-5xl font-normal text-[#1E1D1B] leading-[1.15] mb-6 max-w-xl">
          [Placeholder — frase de encerramento forte.]
        </h2>

        <p className="text-lg text-[#87867F] leading-[1.75] mb-12 max-w-md">
          [Placeholder — uma linha que reduz a fricção para entrar em contato.]
        </p>

        <Button as="a" href="mailto:contato@ethos.ai" variant="primary" className="text-sm px-8 py-3.5">
          Iniciar diálogo
        </Button>
      </Reveal>
    </Section>
  );
}
