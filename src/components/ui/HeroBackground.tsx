"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export function HeroBackground() {
  return (
    <MeshGradient
      className="absolute inset-0 w-full h-full"
      colors={["#FAF9F5", "#F0EEE6", "#E8E6DC", "#EDEAE0", "#FAF9F5"]}
      speed={0.35}
      distortion={0.25}
      swirl={0.08}
      grainMixer={0.1}
      grainOverlay={0}
    />
  );
}
