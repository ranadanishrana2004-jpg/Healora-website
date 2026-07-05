import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://healora.co.uk"),
  title: {
    default: "Healora — Innovating Digital Solutions with Care",
    template: "%s · Healora",
  },
  description:
    "Healora is a software development & AI studio. We transform ideas into powerful, scalable digital solutions that drive growth, delight users, and accelerate business success.",
  keywords: [
    "Healora",
    "software development",
    "AI",
    "machine learning",
    "web development",
    "mobile apps",
    "cloud",
    "digital transformation",
  ],
  openGraph: {
    title: "Healora — Innovating Digital Solutions with Care",
    description:
      "We help businesses turn their ideas into powerful software that drives growth and success.",
    url: "https://healora.co.uk",
    siteName: "Healora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healora — Innovating Digital Solutions with Care",
    description:
      "We turn ideas into powerful software that drives growth and success.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-screen bg-ink text-slate-300 antialiased selection:bg-emerald-400/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
