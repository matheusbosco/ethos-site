"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedWordsProps {
  prefix: string;
  words: string[];
  className?: string;
}

export function AnimatedWords({ prefix, words, className = "" }: AnimatedWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearTimeout(id);
  }, [index, words.length]);

  return (
    <div className={`flex items-baseline gap-[0.4em] overflow-hidden ${className}`}>
      <span>{prefix}</span>
      <span className="relative inline-flex h-[1.15em] min-w-[8ch] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="absolute left-0 font-extrabold text-[#2A3D52]"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 14 }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
