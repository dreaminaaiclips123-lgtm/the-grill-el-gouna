import Image from "next/image";
import { BookingWizard } from "./BookingWizard";
import heroImage from "@/public/images/ember-fire.jpg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <Image
        src={heroImage}
        alt="Glowing charcoal embers and open flame in a fire pit at night"
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-bg/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/75 via-bg/15 to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-24 pt-28 md:min-h-[92vh] md:grid-cols-[1fr_380px] md:gap-16 md:py-16">
        <div className="max-w-lg">
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
            Charcoal since 1999.
          </h1>
          <p className="mt-5 max-w-md text-base text-ink-muted md:text-lg">
            Egyptian and Mediterranean grilling in Downtown El Gouna.
            Fire-roasted meats, real mezza, and twenty-five years of it.
          </p>
        </div>

        <BookingWizard />
      </div>
    </section>
  );
}
