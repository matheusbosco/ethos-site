"use client";

import { motion } from "framer-motion";

export function HandwrittenCircle() {
  return (
    <motion.svg
      aria-hidden="true"
      className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+1.5rem)] h-[calc(100%+1rem)] pointer-events-none"
      viewBox="0 0 400 80"
      fill="none"
      preserveAspectRatio="none"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M 385 18
           C 392 4, 300 0, 200 1
           C 100 2, 8 6, 4 30
           C 0 54, 85 78, 200 77
           C 315 76, 396 65, 392 38
           C 390 24, 382 15, 385 18"
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
