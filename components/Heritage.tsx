import { Reveal } from "./Reveal";

export function Heritage() {
  return (
    <section className="relative overflow-hidden bg-bg py-28 md:py-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 0%, var(--color-accent-soft), transparent)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="font-display text-2xl leading-snug tracking-tight text-ink md:text-4xl text-balance">
            Proudly grilling Egyptian favorites in El Gouna since 1999,
            honoring timeless recipes, rich flavors, and the warmth of our
            culture.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-sm text-ink-faint">
            Crafted with pride, seasoned with culture. Every dish honors the
            soul of Egyptian cooking, rich in history, grilled with passion.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
