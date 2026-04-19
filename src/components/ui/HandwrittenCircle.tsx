"use client";

import { motion } from "framer-motion";

export function HandwrittenCircle() {
  return (
    <motion.svg
      aria-hidden="true"
      className="absolute -inset-x-5 -inset-y-4 w-[calc(100%+2.5rem)] h-[calc(100%+2rem)] pointer-events-none"
      viewBox="0 0 440 108"
      fill="none"
      preserveAspectRatio="none"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M 395 26 C 348 4, 110 -4, 38 32 C 6 52, 14 86, 208 98 C 338 104, 434 90, 438 62 C 441 42, 422 10, 392 22"
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
