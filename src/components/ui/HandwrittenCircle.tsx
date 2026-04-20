"use client";

import { motion } from "framer-motion";

export function HandwrittenCircle() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -inset-x-5 -inset-y-4 md:-inset-x-10 md:-inset-y-6 w-[calc(100%+2.5rem)] md:w-[calc(100%+5rem)] h-[calc(100%+2rem)] md:h-[calc(100%+3rem)] pointer-events-none"
      viewBox="0 0 160 38"
      fill="none"
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <motion.path
        d="M 150 13 Q 157 5, 152 3 Q 80 1, 8 3 Q 3 6, 3 19 Q 3 32, 8 35 Q 80 37, 152 35 Q 157 33, 150 13"
        stroke="#2A3D52"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial="hidden"
        animate="visible"
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
    </svg>
  );
}
