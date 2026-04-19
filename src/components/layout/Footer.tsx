export function Footer() {
  return (
    <footer className="w-full border-t border-[#DFD6C2] bg-[#F0E9D6] px-6 py-12">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="font-[family-name:var(--font-heading)] italic text-lg font-bold text-[#1E1D1B]">
            Ethos
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[0.65rem] text-[#87867F] tracking-widest uppercase">
            Feito por engenheiros. Entregue com responsabilidade.
          </span>
        </div>

        <p className="text-sm text-[#87867F]">
          © {new Date().getFullYear()} Ethos. Todos os direitos reservados.
        </p>

        <a
          href="mailto:contato@ethos.ai"
          className="text-sm text-[#2A3D52] hover:text-[#3A5370] transition-colors underline underline-offset-4"
        >
          contato@ethos.ai
        </a>
      </div>
    </footer>
  );
}
