"use client";

import { motion } from "framer-motion";

export function HandwrittenCircle() {
  return (
    <motion.svg
      aria-hidden="true"
      className="absolute -inset-x-5 -inset-y-4 w-[calc(100%+2.5rem)] h-[calc(100%+2rem)] pointer-events-none"
      viewBox="0 0 160 38"
      fill="none"
      preserveAspectRatio="none"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M 148 14 Q 152 6, 136 4 Q 80 -2, 24 4 Q 8 6, 8 19 Q 8 32, 24 34 Q 80 40, 136 34 Q 152 32, 148 14"
        stroke="#2A3D52"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 },
              opacity: { duration: 0.3, delay: 0.3 },
            },
          },
        }}
      />
    </motion.svg>
  );
}
