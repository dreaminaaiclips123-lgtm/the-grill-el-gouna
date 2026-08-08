import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Heritage } from "@/components/Heritage";
import { SignatureDishes } from "@/components/SignatureDishes";
import { Menu } from "@/components/Menu";
import { Ambience } from "@/components/Ambience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { IntroSplash } from "@/components/IntroSplash";

export default function Home() {
  return (
    <>
      <IntroSplash />
      <Nav />
      <main className="flex-1">
        <Hero />
        <Heritage />
        <SignatureDishes />
        <Menu />
        <Ambience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
