import Link from "next/link";
import {
  IconPhone,
  IconBrandWhatsapp,
  IconMapPin,
  IconClock,
} from "@tabler/icons-react";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="visit" className="bg-bg py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight text-ink md:text-5xl text-balance">
            Reserve a table.
          </h2>
          <p className="mt-5 max-w-sm text-ink-muted">
            Call ahead on weekends. Delivery and takeaway run the same hours,
            every day.
          </p>

          <dl className="mt-10 space-y-6 text-sm">
            <div className="flex items-start gap-3">
              <IconClock
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div>
                <dt className="text-ink-faint">Hours</dt>
                <dd className="mt-0.5 text-ink">Daily, 13:00 to 23:45</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <IconMapPin
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <div>
                <dt className="text-ink-faint">Location</dt>
                <dd className="mt-0.5 text-ink">
                  Downtown El Gouna, Red Sea, Egypt
                </dd>
              </div>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl bg-bg-raised p-8 md:p-10">
            <p className="text-sm text-ink-faint">Reservations and delivery</p>
            <div className="mt-5 space-y-3">
              <Link
                href="tel:+201221785555"
                className="flex items-center justify-between gap-3 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-px active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <IconPhone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  +20 122 178 5555
                </span>
              </Link>
              <Link
                href="https://wa.me/201221783333"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink-muted"
              >
                <span className="flex items-center gap-2">
                  <IconBrandWhatsapp
                    className="h-4 w-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  +20 122 178 3333
                </span>
              </Link>
            </div>
            <p className="mt-6 text-xs text-ink-faint">
              Second line doubles as delivery and takeaway orders.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
