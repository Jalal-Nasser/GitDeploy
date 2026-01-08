import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mDeploy — GitHub Hub",
  description:
    "mDeploy builds and ships production software. Explore my portfolio, repositories, and development process.",
  openGraph: {
    title: "mDeploy — GitHub Hub",
    description: "Production software shipped daily. View my GitHub portfolio.",
    type: "website",
    locale: "en_US",
    siteName: "mDeploy",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased selection:bg-purple-500/30`}
      >
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}

        <Navbar />
        <Providers>
          {children}
        </Providers>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
