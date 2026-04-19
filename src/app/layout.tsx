import type { Metadata } from "next";
import { Inter, Libre_Baskerville, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ContactProvider } from "@/contexts/ContactContext";
import { ContactModal } from "@/components/ui/ContactModal";
import { ScrollCTA } from "@/components/ui/ScrollCTA";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ethos — Inteligência sob medida",
  description: "Agência de soluções com IA. Automação e agentes de IA para empresas que querem operar com mais inteligência.",
  openGraph: {
    title: "Ethos — Inteligência sob medida",
    description: "Agência de soluções com IA. Automação e agentes de IA para empresas que querem operar com mais inteligência.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${libreBaskerville.variable} ${jetbrainsMono.variable} ${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ContactProvider>
          {children}
          <ContactModal />
          <ScrollCTA />
        </ContactProvider>
      </body>
    </html>
  );
}
