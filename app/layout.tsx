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
  metadataBase: new URL("https://mdeploy.dev"),
  title: "mDeploy - PassGen",
  description:
    "mDeploy builds and ships production software. Explore my portfolio, repositories, and development process.",
  keywords: ["Software Engineer", "React", "Next.js", "TypeScript", "PassGen", "mDeploy", "Web Development"],
  authors: [{ name: "Jalal Nasser", url: "https://github.com/Jalal-Nasser" }],
  creator: "Jalal Nasser",
  publisher: "mDeploy",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "mDeploy - PassGen",
    description: "Production software shipped daily. View my GitHub portfolio.",
    type: "website",
    locale: "en_US",
    siteName: "mDeploy",
    url: "https://mdeploy.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "mDeploy - PassGen",
    description: "Production software shipped daily. View my GitHub portfolio.",
    creator: "@jalalnasser",
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
    <html lang="en" suppressHydrationWarning>
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

        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-96Z376JRPQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-96Z376JRPQ');
          `}
        </Script>

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
