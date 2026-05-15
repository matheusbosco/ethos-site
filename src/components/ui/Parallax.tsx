"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  /**
   * Deslocamento total em px ao longo da passagem do elemento pela viewport.
   * O elemento desliza de +amount a -amount conforme a pagina rola, criando
   * separacao de camadas (profundidade). Mantenha pequeno (16-40) para um
   * efeito sutil. Valor negativo inverte a direcao.
   */
  amount?: number;
  className?: string;
}

/**
 * Aplica um parallax discreto no eixo Y, ligado ao progresso de scroll.
 * Respeita prefers-reduced-motion (desliga o deslocamento).
 */
export function Parallax({ children, amount = 24, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduce ? 0 : y, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}
