export function Footer() {
  return (
    <footer className="w-full bg-[#2C2620] px-6 py-10 border-t border-white/8">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-[5px]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[3px] w-6 rounded-full bg-[#C89A4F]" />
            ))}
          </div>
          <div className="flex flex-col">
            <span
              className="text-white font-extrabold tracking-[0.14em] text-base"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              ETHOS
            </span>
            <span className="text-[0.6rem] text-[#8BA5BB] tracking-widest uppercase font-medium mt-0.5">
              Agência de soluções com IA
            </span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/20 font-medium">
          © {new Date().getFullYear()} Ethos. Todos os direitos reservados.
        </p>

      </div>
    </footer>
  );
}
