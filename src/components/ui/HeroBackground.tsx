"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export function HeroBackground() {
  return (
    <MeshGradient
      className="absolute inset-0 w-full h-full"
      colors={["#F5EDE0", "#C9BCA8", "#A89278", "#D4C5AE", "#F0E4CC", "#8C7B68"]}
      speed={0.55}
      distortion={0.85}
      swirl={0.45}
      grainMixer={0.25}
      grainOverlay={0}
    />
  );
}
