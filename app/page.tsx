import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Heritage } from "@/components/Heritage";
import { SignatureDishes } from "@/components/SignatureDishes";
import { Menu } from "@/components/Menu";
import { Ambience } from "@/components/Ambience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { IntroVideo } from "@/components/IntroVideo";

export default function Home() {
  return (
    <>
      <IntroVideo />
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
