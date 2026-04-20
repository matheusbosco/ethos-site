export function EditorialBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Camada base — mesma cor de "Como funciona" */}
      <div className="absolute inset-0 bg-[#E8DFCB]" />

      {/* Grade editorial irregular (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.05]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <line x1="180" y1="0" x2="180" y2="900" stroke="#1C2B3A" strokeWidth="1" />
        <line x1="420" y1="0" x2="420" y2="900" stroke="#1C2B3A" strokeWidth="1" />
        <line x1="780" y1="0" x2="780" y2="900" stroke="#1C2B3A" strokeWidth="1" />
        <line x1="1100" y1="0" x2="1100" y2="900" stroke="#1C2B3A" strokeWidth="1" />
        <line x1="1280" y1="0" x2="1280" y2="900" stroke="#1C2B3A" strokeWidth="1" />
      </svg>

      {/* Watermark tipográfico — assinatura visual */}
      <div className="absolute bottom-[-8%] right-[-4%] flex items-end pointer-events-none select-none">
        <span
          className="font-[family-name:var(--font-heading)] italic font-bold text-[#1C2B3A]/[0.035] leading-none"
          style={{ fontSize: "clamp(18rem, 38vw, 34rem)" }}
        >
          Ethos
        </span>
      </div>

    </div>
  );
}
