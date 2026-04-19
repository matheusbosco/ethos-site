"use client";

import { motion } from "framer-motion";

export function HandwrittenCircle() {
  return (
    <motion.svg
      aria-hidden="true"
      className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+1.5rem)] h-[calc(100%+1rem)] pointer-events-none"
      viewBox="0 0 220 70"
      fill="none"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M 210 20
           C 215 5, 170 2, 110 3
           C 50 4, 8 8, 5 28
           C 2 48, 40 68, 110 67
           C 180 66, 218 55, 215 35
           C 213 22, 200 18, 210 20"
        stroke="#2A3D52"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
              pathLength: { duration: 2, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.4 },
              opacity: { duration: 0.3, delay: 0.4 },
            },
          },
        }}
      />
    </motion.svg>
  );
}
