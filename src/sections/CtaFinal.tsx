"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export function CtaFinal() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    try {
      // Crie sua conta em formspree.io e substitua REPLACE_WITH_FORM_ID pelo seu ID
      const res = await fetch("https://formspree.io/f/REPLACE_WITH_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

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
      </Reveal>

      <Reveal delay={120}>
        {status === "sent" ? (
          <div className="max-w-lg border border-[#DFD6C2] rounded-xl p-8">
            <p className="font-[family-name:var(--font-heading)] italic text-xl text-[#1E1D1B] mb-2">
              Mensagem recebida.
            </p>
            <p className="text-sm text-[#87867F]">Respondemos em até 24 horas úteis.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[#87867F] tracking-[0.15em] uppercase">
                  Nome
                </label>
                <input
                  name="nome"
                  required
                  placeholder="Seu nome"
                  className="bg-transparent border border-[#DFD6C2] rounded-lg px-4 py-3 text-sm text-[#1E1D1B] placeholder:text-[#87867F]/40 focus:outline-none focus:border-[#2A3D52] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[#87867F] tracking-[0.15em] uppercase">
                  Empresa
                </label>
                <input
                  name="empresa"
                  placeholder="Nome da empresa"
                  className="bg-transparent border border-[#DFD6C2] rounded-lg px-4 py-3 text-sm text-[#1E1D1B] placeholder:text-[#87867F]/40 focus:outline-none focus:border-[#2A3D52] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[#87867F] tracking-[0.15em] uppercase">
                Qual é o desafio?
              </label>
              <textarea
                name="mensagem"
                required
                rows={4}
                placeholder="Descreva o processo ou problema que você quer resolver..."
                className="bg-transparent border border-[#DFD6C2] rounded-lg px-4 py-3 text-sm text-[#1E1D1B] placeholder:text-[#87867F]/40 focus:outline-none focus:border-[#2A3D52] transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                type="submit"
                variant="primary"
                className="text-sm px-8 py-3.5"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Enviando..." : "Iniciar diálogo"}
              </Button>
              <p className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[#87867F] tracking-wide">
                Respondemos em até 24h.
              </p>
            </div>

            {status === "error" && (
              <p className="text-xs text-red-700">
                Algo deu errado. Escreva diretamente:{" "}
                <a href="mailto:contato@ethos.ai" className="underline">
                  contato@ethos.ai
                </a>
              </p>
            )}
          </form>
        )}
      </Reveal>
    </Section>
  );
}
