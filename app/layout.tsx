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
        {children}
      </body>
    </html>
  );
}
