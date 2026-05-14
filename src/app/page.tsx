import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { Dores } from "@/sections/Dores";
import { Numbers } from "@/sections/Numbers";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { NaPratica } from "@/sections/NaPratica";
import { FAQ } from "@/sections/FAQ";
import { CtaFinal } from "@/sections/CtaFinal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Dores />
        <Numbers />
        <Services />
        <Process />
        <NaPratica />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
