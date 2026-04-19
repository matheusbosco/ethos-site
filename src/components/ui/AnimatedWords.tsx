"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedWordsProps {
  phrases: string[];
  className?: string;
}

export function AnimatedWords({ phrases, className = "" }: AnimatedWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 2400);
    return () => clearTimeout(id);
  }, [index, phrases.length]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          className="block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 55, damping: 14 }}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
