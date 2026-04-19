"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export function HeroBackground() {
  return (
    <MeshGradient
      className="absolute inset-0 w-full h-full"
      colors={["#F0E9D6", "#D8CEBC", "#C9BCA8", "#E4D9C4", "#F5EDE0"]}
      speed={0.5}
      distortion={0.6}
      swirl={0.3}
      grainMixer={0.2}
      grainOverlay={0}
    />
  );
}
