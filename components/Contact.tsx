import { IconMapPin, IconClock } from "@tabler/icons-react";
import { Reveal } from "./Reveal";
import { BookingForm } from "./BookingForm";

export function Contact() {
  return (
    <section id="visit" className="bg-bg py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="font-display text-3xl tracking-tight text-ink md:text-5xl text-balance">
            Reserve a table.
          </h2>
          <p className="mt-5 max-w-sm text-ink-muted">
            Tell us the date and party size. We confirm every booking on
            WhatsApp.
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
          <BookingForm />
        </Reveal>
      </div>
    </section>
  );
}
