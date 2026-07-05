import type { Metadata } from "next";
import { Gluten, Nunito } from "next/font/google";
import "./globals.css";
import RevealManager from "@/components/RevealManager";
import { Analytics } from "@vercel/analytics/next";

// Enable the scroll-reveal hidden state before paint (skipped for reduced
// motion) so tagged elements can animate in without a flash of content.
const REVEAL_INIT = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-reveal')}}catch(e){}`;

const gluten = Gluten({
  variable: "--font-gluten",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Foxy app",
  description: "The free, fun, and effective way to learn math!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The reveal init script adds a `js-reveal` class to <html> before
      // hydration; suppress the expected className mismatch warning.
      suppressHydrationWarning
      className={`${gluten.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: REVEAL_INIT }} />
        {children}
        <RevealManager />
        <Analytics />
      </body>
    </html>
  );
}
