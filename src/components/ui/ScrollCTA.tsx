"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContact } from "@/contexts/ContactContext";
import { Button } from "@/components/ui/Button";

export function ScrollCTA() {
  const { open, isOpen } = useContact();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("scroll-cta-dismissed")) {
      setDismissed(true);
      return;
    }

    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      if (window.scrollY / total > 0.75) setVisible(true);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismiss() {
    setDismissed(true);
    sessionStorage.setItem("scroll-cta-dismissed", "1");
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && !isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 w-72 bg-[#1C2B3A] rounded-2xl shadow-2xl p-6 border border-white/8"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 60, damping: 14 }}
        >
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors rounded-lg"
            aria-label="Fechar"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <p className="font-[family-name:var(--font-mono)] text-[0.6rem] text-white/30 tracking-[0.2em] uppercase mb-3">
            Pronto para começar?
          </p>
          <h3 className="font-[family-name:var(--font-display)] text-base font-extrabold text-white leading-tight mb-4 pr-4">
            Uma conversa de 30 min pode mudar seu processo.
          </h3>
          <Button
            variant="primary"
            className="w-full text-sm py-2.5"
            onClick={() => { dismiss(); open(); }}
          >
            Diagnóstico gratuito
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
