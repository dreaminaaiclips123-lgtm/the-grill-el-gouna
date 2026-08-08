import Image from "next/image";
import Link from "next/link";
import { IconPhone, IconBrandWhatsapp } from "@tabler/icons-react";
import heroImage from "@/public/images/ember-fire.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-end overflow-hidden"
    >
      <Image
        src={heroImage}
        alt="Glowing charcoal embers and open flame in a fire pit at night"
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-bg/10 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-24 md:pb-28">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-6xl">
            Charcoal since 1999.
          </h1>
          <p className="mt-5 max-w-md text-base text-ink-muted md:text-lg">
            Egyptian and Mediterranean grilling in Downtown El Gouna.
            Fire-roasted meats, real mezza, and twenty-five years of it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="tel:+201221785555"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-px active:scale-[0.98]"
            >
              <IconPhone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Call to reserve
            </Link>
            <Link
              href="https://wa.me/201221783333"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink-muted"
            >
              <IconBrandWhatsapp
                className="h-4 w-4"
                strokeWidth={2}
                aria-hidden="true"
              />
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
