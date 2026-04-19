import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { Numbers } from "@/sections/Numbers";
import { Manifesto } from "@/sections/Manifesto";
import { Services } from "@/sections/Services";
import { TechProof } from "@/sections/TechProof";
import { Process } from "@/sections/Process";
import { FAQ } from "@/sections/FAQ";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Numbers />
        <Services />
        <TechProof />
        <Manifesto />
        <Process />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
