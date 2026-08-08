import Link from "next/link";
import { IconFlame, IconCalendarEvent } from "@tabler/icons-react";

const LINKS = [
  { href: "#dishes", label: "Dishes" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="#top"
          className="flex items-center gap-2 font-display text-lg tracking-tight text-ink"
        >
          <IconFlame
            className="h-5 w-5 text-accent"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          The Grill
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#top"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-px active:scale-[0.98]"
        >
          <IconCalendarEvent className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          Reserve
        </Link>
      </div>
    </header>
  );
}
