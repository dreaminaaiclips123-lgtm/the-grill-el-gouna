import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Heritage } from "@/components/Heritage";
import { SignatureDishes } from "@/components/SignatureDishes";
import { Menu } from "@/components/Menu";
import { Ambience } from "@/components/Ambience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { IntroLogo } from "@/components/IntroLogo";
import { SearScrub } from "@/components/SearScrub";

export default function Home() {
  return (
    <>
      <IntroLogo />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Heritage />
        <SignatureDishes />
        <SearScrub />
        <Menu />
        <Ambience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
