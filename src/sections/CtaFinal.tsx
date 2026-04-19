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
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold text-[#1E1D1B] leading-[1.1] tracking-tight mb-6 max-w-xl">
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
          <div className="max-w-lg flex flex-col gap-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  {status === "sending" ? "Enviando..." : "Diagnóstico gratuito — 30 min"}
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

            {/* Alternativa WhatsApp */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[#DFD6C2]" />
              <span className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[#87867F] tracking-widest uppercase">
                ou
              </span>
              <div className="flex-1 h-px bg-[#DFD6C2]" />
            </div>

            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-[#2A3D52] hover:text-[#1C2B3A] transition-colors group"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Falar pelo WhatsApp</span>
              <span className="text-[#87867F] group-hover:translate-x-0.5 transition-transform duration-200">→</span>
            </a>
          </div>
        )}
      </Reveal>
    </Section>
  );
}
