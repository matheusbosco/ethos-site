import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Google_Sans_Flex } from "next/font/google";
import { ContactProvider } from "@/contexts/ContactContext";
import { ContactModal } from "@/components/ui/ContactModal";
import { ScrollCTA } from "@/components/ui/ScrollCTA";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const googleSans = Google_Sans_Flex({
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ethos · Inteligência sob medida",
  description: "Agência de soluções com IA. Automação e agentes de IA para empresas que querem operar com mais inteligência.",
  openGraph: {
    title: "Ethos · Inteligência sob medida",
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
    <html lang="pt-BR" className={`${plusJakarta.variable} ${googleSans.variable} h-full antialiased`}>
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
