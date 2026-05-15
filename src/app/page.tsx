import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { Dores } from "@/sections/Dores";
import { ParaQuem } from "@/sections/ParaQuem";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { NaPratica } from "@/sections/NaPratica";
import { Seguranca } from "@/sections/Seguranca";
import { FAQ } from "@/sections/FAQ";
import { CtaFinal } from "@/sections/CtaFinal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Dores />
        <ParaQuem />
        <Services />
        <Process />
        <NaPratica />
        <Seguranca />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
