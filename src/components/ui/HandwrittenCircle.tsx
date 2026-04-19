"use client";

import { motion } from "framer-motion";

export function HandwrittenCircle() {
  return (
    <motion.svg
      aria-hidden="true"
      className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+1.5rem)] h-[calc(100%+1rem)] pointer-events-none"
      viewBox="0 0 420 90"
      fill="none"
      preserveAspectRatio="none"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M 358 18 C 295 -10, 72 0, 22 32 C 0 55, 20 84, 200 86 C 342 88, 415 70, 408 46 C 402 28, 390 6, 350 12"
        stroke="#2A3D52"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 2, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.5 },
              opacity: { duration: 0.3, delay: 0.5 },
            },
          },
        }}
      />
    </motion.svg>
  );
}
