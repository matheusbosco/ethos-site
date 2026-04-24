import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { Services } from "@/sections/Services";
import { AutomacoesVivas } from "@/sections/AutomacoesVivas";
import { Process } from "@/sections/Process";
import { NaPratica } from "@/sections/NaPratica";
import { Manifesto } from "@/sections/Manifesto";
import { FAQ } from "@/sections/FAQ";
import { CtaFinal } from "@/sections/CtaFinal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <AutomacoesVivas />
        <Process />
        <NaPratica />
        <Manifesto />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
