import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { Manifesto } from "@/sections/Manifesto";
import { Services } from "@/sections/Services";
import { TechProof } from "@/sections/TechProof";
import { Process } from "@/sections/Process";
import { FAQ } from "@/sections/FAQ";
import { CtaFinal } from "@/sections/CtaFinal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Process />
        <TechProof />
        <Manifesto />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
