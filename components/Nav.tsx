"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  IconCalendarEvent,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import logoMark from "@/public/images/logo-mark.jpg";

const LINKS = [
  { href: "#dishes", label: "Dishes" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="#top" aria-label="The Grill El Gouna, home">
          <Image
            src={logoMark}
            alt="The Grill El Gouna"
            width={40}
            height={40}
            className="rounded-full"
            priority
          />
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

        <div className="flex items-center gap-2">
          <Link
            href="#top"
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-px active:scale-[0.98] sm:inline-flex"
          >
            <IconCalendarEvent
              className="h-4 w-4"
              strokeWidth={2}
              aria-hidden="true"
            />
            Reserve
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:text-accent md:hidden"
          >
            {open ? (
              <IconX className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <IconMenu2 className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-line/60 bg-bg md:hidden"
          >
            <div className="flex flex-col px-6 py-4">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/40 py-3 text-base text-ink-muted transition-colors duration-200 last:border-none hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="#top"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-bg sm:hidden"
              >
                <IconCalendarEvent
                  className="h-4 w-4"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                Reserve
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
