import { IconMapPin, IconClock } from "@tabler/icons-react";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="visit" className="border-t border-line/60 bg-bg py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 md:gap-16">
        <Reveal className="flex items-start gap-4">
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

        <Reveal delay={0.08} className="flex items-start gap-4">
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
    </section>
  );
}
