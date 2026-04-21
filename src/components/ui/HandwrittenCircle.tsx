"use client";

import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2.5, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] },
      opacity: { duration: 0.5 },
    },
  },
};

export function HandwrittenCircle() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -inset-x-12 -inset-y-4 md:-inset-x-24 md:-inset-y-11 w-[calc(100%+6rem)] md:w-[calc(100%+12rem)] h-[calc(100%+2rem)] md:h-[calc(100%+5.5rem)] pointer-events-none"
      viewBox="0 0 1200 600"
      fill="none"
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      <motion.path
        d="M 950 90 C 1250 300, 1050 480, 600 520 C 250 520, 150 480, 150 300 C 150 120, 350 80, 600 80 C 850 80, 950 180, 950 180"
        stroke="#2A3D52"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        vectorEffect="non-scaling-stroke"
        initial="hidden"
        animate="visible"
        variants={draw}
      />
    </svg>
  );
}
