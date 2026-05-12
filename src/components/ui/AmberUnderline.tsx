"use client";

import { motion } from "framer-motion";

/**
 * Sublinhado âmbar desenhado com animação — o motivo assinatura da marca.
 * Use dentro de um `<span className="relative inline-block">` ao redor da
 * palavra que deve receber o traço. Anima ao entrar na viewport (uma vez).
 */
export function AmberUnderline({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 300 20"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 -bottom-[0.16em] w-full h-[0.32em] text-[#C89A4F] overflow-visible ${className}`}
    >
      <motion.path
        d="M 0,12 Q 75,2 150,12 Q 225,22 300,12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
      />
    </motion.svg>
  );
}
