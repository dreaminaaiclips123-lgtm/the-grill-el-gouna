import Link from "next/link";
import {
  IconMapPin,
  IconClock,
  IconPhone,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="visit"
      className="texture-grate relative overflow-hidden border-t border-line/60 bg-bg-raised py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 60% at 85% 100%, var(--color-accent-soft), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="max-w-md font-display text-3xl tracking-tight text-ink md:text-5xl text-balance">
            Come find us.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 md:gap-16">
          <Reveal className="flex items-start gap-4" delay={0.05}>
            <IconClock
              className="mt-1 h-6 w-6 shrink-0 text-accent"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="text-xs text-ink-faint">Hours</p>
              <p className="mt-1 font-display text-2xl tracking-tight text-ink md:text-3xl">
                Daily, 13:00 to 23:45
              </p>
            </div>
          </Reveal>

          <Reveal className="flex items-start gap-4" delay={0.1}>
            <IconMapPin
              className="mt-1 h-6 w-6 shrink-0 text-accent"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="text-xs text-ink-faint">Location</p>
              <p className="mt-1 font-display text-2xl tracking-tight text-ink md:text-3xl">
                Downtown El Gouna, Red Sea
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-12 flex flex-wrap gap-4">
          <Link
            href="tel:+201221785555"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-px active:scale-[0.98]"
          >
            <IconPhone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Call the restaurant
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
            Message on WhatsApp
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
