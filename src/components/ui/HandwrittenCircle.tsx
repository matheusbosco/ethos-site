"use client";

import { motion } from "framer-motion";

export function HandwrittenCircle() {
  return (
    <motion.svg
      aria-hidden="true"
      className="absolute -inset-x-4 -inset-y-3 w-[calc(100%+2rem)] h-[calc(100%+1.5rem)] pointer-events-none"
      viewBox="0 0 100 30"
      fill="none"
      preserveAspectRatio="none"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M 92 8 Q 95 4, 85 2 Q 25 -2, 8 10 Q 2 14, 4 22 Q 8 27, 50 28 Q 85 27, 95 22 Q 98 18, 92 8"
        stroke="#2A3D52"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
