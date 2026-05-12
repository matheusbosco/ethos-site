import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/sections/Hero";
import { Dores } from "@/sections/Dores";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { FAQ } from "@/sections/FAQ";
import { CtaFinal } from "@/sections/CtaFinal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Dores />
        <Services />
        <Process />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
