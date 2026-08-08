import Link from "next/link";
import {
  IconFlame,
  IconBrandInstagram,
  IconBrandFacebook,
  IconExternalLink,
} from "@tabler/icons-react";

const SOCIALS = [
  {
    href: "https://www.instagram.com/thegrillgouna",
    label: "Instagram",
    icon: IconBrandInstagram,
  },
  {
    href: "https://www.facebook.com/search/pages/?q=The%20Grill%20El%20Gouna",
    label: "Facebook",
    icon: IconBrandFacebook,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line/60 bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2 font-display text-lg tracking-tight text-ink">
              <IconFlame
                className="h-5 w-5 text-accent"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              The Grill El Gouna
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-faint">
              Downtown El Gouna, Red Sea, Egypt. Open daily, 13:00 to 23:45.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-muted transition-colors duration-200 hover:border-ink-muted hover:text-ink"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              ))}
            </div>
            <Link
              href="https://www.tripadvisor.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-faint transition-colors duration-200 hover:text-ink-muted"
            >
              View on TripAdvisor
              <IconExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line/60 pt-6 text-xs text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} The Grill El Gouna.</p>
          <p>Photography on this site is AI-generated, pending photos from the venue.</p>
        </div>
      </div>
    </footer>
  );
}
