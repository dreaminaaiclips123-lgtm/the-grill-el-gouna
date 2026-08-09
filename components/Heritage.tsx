import { Reveal } from "./Reveal";

export function Heritage() {
  return (
    <section className="relative overflow-hidden bg-bg py-28 md:py-40">
      <div
        className="texture-grate pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 20% 0%, var(--color-accent-soft), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-4">
        <div
          className="pointer-events-none select-none font-display text-[7rem] leading-none tracking-tight text-ink/[0.06] md:text-[11rem]"
          aria-hidden="true"
        >
          1999
        </div>

        <div className="md:pt-2">
          <div className="h-px w-16 bg-accent" aria-hidden="true" />
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-2xl font-display text-2xl leading-snug tracking-tight text-ink md:text-4xl text-balance">
              Proudly grilling Egyptian favorites in El Gouna since 1999,
              honoring timeless recipes, rich flavors, and the warmth of our
              culture.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-sm text-ink-faint">
              Crafted with pride, seasoned with culture. Every dish honors the
              soul of Egyptian cooking, rich in history, grilled with
              passion.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
