import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Google_Sans_Flex } from "next/font/google";
import { ContactProvider } from "@/contexts/ContactContext";
import { ContactModal } from "@/components/ui/ContactModal";
import { ChatWidget } from "@/components/ui/ChatWidget";
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

const SITE_TITLE = "Ethos · Inteligência sob medida";
const SITE_DESCRIPTION =
  "BPO de tecnologia. Operamos continuamente a camada de tecnologia que sustenta a sua operação, com monitoramento 24/7 e resposta humana priorizada.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.somosethos.com.br"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
          <ChatWidget />
        </ContactProvider>
      </body>
    </html>
  );
}
