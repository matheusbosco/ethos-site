"use client";

import { useEffect, useState } from "react";

interface CookiePrefs {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = "ethos-cookie-prefs";
const DEFAULT_PREFS: CookiePrefs = {
  essential: true, // sempre ativo, não pode ser desabilitado
  analytics: false,
  marketing: false,
};

export function Footer() {
  const [modalOpen, setModalOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(DEFAULT_PREFS);

  // Carrega preferências salvas no carregamento (client-side)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as Partial<CookiePrefs>;
      setPrefs({ ...DEFAULT_PREFS, ...parsed, essential: true });
    } catch {
      // armazenamento corrompido — ignora e mantém defaults
    }
  }, []);

  const handleSave = (next: CookiePrefs) => {
    const sanitized = { ...next, essential: true };
    setPrefs(sanitized);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    }
    setModalOpen(false);
  };

  return (
    <>
      <footer className="w-full bg-[#2C2620] px-6 py-10">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-[5px]">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[3px] w-6 rounded-full bg-[#C89A4F]" />
              ))}
            </div>
            <div className="flex flex-col">
              <span
                className="text-white font-extrabold tracking-[0.14em] text-base"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                ETHOS
              </span>
              <span className="text-[0.6rem] text-[#8BA5BB] tracking-widest uppercase font-medium mt-0.5">
                Agência de soluções com IA
              </span>
            </div>
          </div>

          {/* Copyright + Cookie Settings */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <p className="text-xs text-white/30 font-medium">
              Copyright © 2026 Ethos AI - Automações e Integrações. Todos os direitos reservados.
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="self-start md:self-auto text-xs text-white/40 hover:text-[#C89A4F] underline-offset-4 hover:underline transition-colors duration-200"
            >
              Cookie Settings
            </button>
          </div>

        </div>
      </footer>

      {modalOpen && (
        <CookiePrefsModal
          initial={prefs}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

// ——————————————————————————————————————————————
// Modal de preferências de cookies
// ——————————————————————————————————————————————

interface ModalProps {
  initial: CookiePrefs;
  onSave: (prefs: CookiePrefs) => void;
  onClose: () => void;
}

function CookiePrefsModal({ initial, onSave, onClose }: ModalProps) {
  const [analytics, setAnalytics] = useState(initial.analytics);
  const [marketing, setMarketing] = useState(initial.marketing);

  // Fecha com ESC + trava scroll do body enquanto aberto
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-prefs-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl p-7 md:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          id="cookie-prefs-title"
          className="text-xl font-extrabold text-[#2C2620] mb-2"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Preferências de Cookies
        </h3>
        <p className="text-sm text-[#5A7090] leading-relaxed mb-6">
          Escolha quais categorias de cookies a Ethos pode usar. Sua escolha é
          guardada no seu navegador.
        </p>

        <div className="flex flex-col">
          <PrefRow
            title="Essenciais"
            description="Necessários para o funcionamento básico do site."
            alwaysOn
          />
          <PrefRow
            title="Analíticos"
            description="Ajudam a entender como o site é usado para melhorá-lo."
            on={analytics}
            onChange={setAnalytics}
          />
          <PrefRow
            title="Marketing"
            description="Personalizar comunicações e medir o desempenho de campanhas."
            on={marketing}
            onChange={setMarketing}
            isLast
          />
        </div>

        <div className="flex justify-end gap-3 mt-7">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-[#5A7090] px-4 py-2 hover:text-[#2C2620] transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => onSave({ essential: true, analytics, marketing })}
            className="text-sm font-bold text-[#2C2620] bg-[#C89A4F] hover:bg-[#B5853E] rounded-full px-5 py-2.5 transition-colors duration-200"
          >
            Salvar preferências
          </button>
        </div>
      </div>
    </div>
  );
}

interface PrefRowProps {
  title: string;
  description: string;
  alwaysOn?: boolean;
  on?: boolean;
  onChange?: (v: boolean) => void;
  isLast?: boolean;
}

function PrefRow({ title, description, alwaysOn, on, onChange, isLast }: PrefRowProps) {
  return (
    <div
      className={`flex items-start justify-between gap-4 py-4 ${
        isLast ? "" : "border-b border-[#8BA5BB]/20"
      }`}
    >
      <div className="flex-1">
        <p className="text-sm font-bold text-[#2C2620]">{title}</p>
        <p className="text-xs text-[#5A7090] mt-1 leading-relaxed">{description}</p>
      </div>
      {alwaysOn ? (
        <span className="text-[0.65rem] text-[#8BA5BB] font-semibold uppercase tracking-wider shrink-0 mt-1">
          Sempre ativo
        </span>
      ) : (
        <Toggle on={on ?? false} onChange={onChange ?? (() => {})} label={title} />
      )}
    </div>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={`Cookies de ${label}`}
      onClick={() => onChange(!on)}
      className={`relative shrink-0 w-10 h-6 rounded-full transition-colors duration-200 mt-1 ${
        on ? "bg-[#C89A4F]" : "bg-[#8BA5BB]/30"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
          on ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}
