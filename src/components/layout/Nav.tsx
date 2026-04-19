"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";

const links = [
  { label: "O que entregamos", href: "#servicos" },
  { label: "Como funciona", href: "#processo" },
  { label: "Manifesto", href: "#manifesto" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-[#F0E9D6]/80 backdrop-blur-md border-[#DFD6C2]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="font-[family-name:var(--font-heading)] italic text-xl font-bold text-[#1E1D1B] tracking-tight"
        >
          Ethos
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#87867F] hover:text-[#1E1D1B] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button as="a" href="#contato" variant="primary">
            Iniciar diálogo
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#1E1D1B]"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <span className="block w-5 h-px bg-current mb-1.5 transition-transform" />
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-5 h-px bg-current transition-transform" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#F0E9D6] border-t border-[#DFD6C2] px-6 py-6 flex flex-col gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base text-[#1E1D1B]"
            >
              {l.label}
            </a>
          ))}
          <Button as="a" href="#contato" variant="primary" className="w-full justify-center">
            Iniciar diálogo
          </Button>
        </div>
      )}
    </header>
  );
}
