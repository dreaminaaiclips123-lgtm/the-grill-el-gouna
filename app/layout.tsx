import type { Metadata } from "next";
import { Bodoni_Moda, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://the-grill-el-gouna.vercel.app"),
  title: "The Grill El Gouna | Charcoal Grill Since 1999",
  description:
    "The Grill El Gouna: Egyptian and Mediterranean charcoal grilling in Downtown El Gouna since 1999. Fire-grilled meats, mezza, and fresh seafood, open daily 13:00-23:45.",
  openGraph: {
    title: "The Grill El Gouna",
    description:
      "Egyptian and Mediterranean charcoal grilling in Downtown El Gouna since 1999.",
    url: "https://the-grill-el-gouna.vercel.app",
    siteName: "The Grill El Gouna",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <div
          className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
