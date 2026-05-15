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
      <footer className="w-full bg-[#2C2620] px-6 pt-16 pb-8 border-t border-white/8">
        <div className="mx-auto max-w-5xl">

          {/* Grid principal */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-10">

            {/* Logo + slogan */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex flex-col gap-[5px]">
                  <div className="h-[3px] w-6 rounded-full bg-[#C89A4F]" />
                  <div className="h-[3px] w-4 rounded-full bg-[#C89A4F]" />
                  <div className="h-[3px] w-5 rounded-full bg-[#C89A4F]" />
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-white font-extrabold tracking-[0.05em] text-base"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    ETHOS.
                  </span>
                  <span className="text-[0.6rem] text-[#8BA5BB] tracking-widest uppercase font-medium mt-0.5">
                    BPO de tecnologia
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/45 leading-[1.7] max-w-xs">
                Operamos a camada de tecnologia que executa, monitora e evolui a sua operação continuamente.
              </p>
            </div>

            {/* Navegar */}
            <div className="md:col-span-2">
              <p className="text-[0.62rem] font-semibold text-[#C89A4F] tracking-[0.25em] uppercase mb-4">
                Navegar
              </p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href="#servicos" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    O que operamos
                  </a>
                </li>
                <li>
                  <a href="#processo" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div className="md:col-span-3">
              <p className="text-[0.62rem] font-semibold text-[#C89A4F] tracking-[0.25em] uppercase mb-4">
                Contato
              </p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href="mailto:contato@ethos.ai" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    contato@ethos.ai
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.99 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.22 0z" />
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.73 3.73 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.73 3.73 0 0 1-1.38-.9 3.73 3.73 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.55a5.88 5.88 0 0 0-2.13 1.39A5.88 5.88 0 0 0 .62 4.14C.33 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.55 2.91.3.79.7 1.46 1.39 2.13a5.88 5.88 0 0 0 2.13 1.39c.76.3 1.63.49 2.91.55C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.55a5.88 5.88 0 0 0 2.13-1.39 5.88 5.88 0 0 0 1.39-2.13c.3-.76.49-1.63.55-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.55-2.91a5.88 5.88 0 0 0-1.39-2.13A5.88 5.88 0 0 0 19.86.62C19.1.33 18.23.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.84a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
                    </svg>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Institucional */}
            <div className="md:col-span-2">
              <p className="text-[0.62rem] font-semibold text-[#C89A4F] tracking-[0.25em] uppercase mb-4">
                Institucional
              </p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href="#" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    Política de privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    Termos de uso
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Linha de base */}
          <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-xs text-white/30 font-medium">
              Copyright © 2026 Ethos AI - Automações e Integrações. Todos os direitos reservados.
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="text-xs text-white/40 hover:text-[#C89A4F] underline-offset-4 hover:underline transition-colors duration-200"
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
