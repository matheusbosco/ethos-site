"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export function HeroBackground() {
  return (
    <MeshGradient
      className="absolute inset-0 w-full h-full"
      colors={["#F5EDE0", "#DACCB4", "#C4B49A", "#E8DCC8", "#F0E6D4"]}
      speed={0.45}
      distortion={0.55}
      swirl={0.22}
      grainMixer={0.18}
      grainOverlay={0}
    />
  );
}
