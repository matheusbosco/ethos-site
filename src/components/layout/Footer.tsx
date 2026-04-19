export function Footer() {
  return (
    <footer className="w-full border-t border-[#E8E6DC] bg-[#FAF9F5] px-6 py-10">
      <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-[family-name:var(--font-heading)] italic text-lg font-bold text-[#141413]">
          Ethos
        </span>
        <p className="text-sm text-[#87867F]">
          © {new Date().getFullYear()} Ethos. Todos os direitos reservados.
        </p>
        <a
          href="mailto:contato@ethos.ai"
          className="text-sm text-[#7C5C3E] hover:text-[#9A7050] transition-colors underline underline-offset-4"
        >
          contato@ethos.ai
        </a>
      </div>
    </footer>
  );
}
