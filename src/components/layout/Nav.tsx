"use client";

import { useState } from "react";
import { useContact } from "@/contexts/ContactContext";

const links = [
  { label: "O que operamos", href: "#servicos" },
  { label: "Como funciona", href: "#processo" },
  { label: "FAQ", href: "#faq" },
];

function EthosLogo() {
  return (
    <a href="#" className="flex items-center gap-2 group">
      <div className="flex flex-col gap-[5px]">
        <div className="h-[3px] w-6 rounded-full bg-[#C89A4F]" />
        <div className="h-[3px] w-4 rounded-full bg-[#C89A4F]" />
        <div className="h-[3px] w-5 rounded-full bg-[#C89A4F]" />
      </div>
      <span
        className="text-white font-extrabold tracking-[0.05em] text-lg"
        style={{ fontFamily: "var(--font-jakarta)" }}
      >
        ETHOS.
      </span>
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const { open: openContact } = useContact();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#2C2620]">
      <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <EthosLogo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#8BA5BB] hover:text-white transition-colors duration-200 font-medium font-[family-name:var(--font-google-sans)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={openContact}
            className="inline-flex items-center gap-2 bg-[#C89A4F] text-[#2C2620] text-sm font-bold tracking-wide rounded-full px-5 py-2.5 hover:bg-[#b88c47] transition-colors duration-200 active:scale-[0.98]"
          >
            Conversar
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <div
            className="w-5 h-px bg-current mb-1.5 transition-transform duration-200"
            style={{ transform: open ? "rotate(45deg) translateY(4px)" : "none" }}
          />
          <div
            className="w-5 h-px bg-current mb-1.5 transition-opacity duration-200"
            style={{ opacity: open ? 0 : 1 }}
          />
          <div
            className="w-5 h-px bg-current transition-transform duration-200"
            style={{ transform: open ? "rotate(-45deg) translateY(-4px)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#2C2620] border-t border-white/8 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base text-[#8BA5BB] hover:text-white transition-colors font-[family-name:var(--font-google-sans)]"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); openContact(); }}
            className="w-full bg-[#C89A4F] text-[#2C2620] text-sm font-bold tracking-wide rounded-full px-5 py-3 hover:bg-[#b88c47] transition-colors"
          >
            Conversar →
          </button>
        </div>
      )}
    </header>
  );
}
