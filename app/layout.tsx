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
  title: {
    default: "Jalal Nasser | Freelance Full Stack Developer – Web & Desktop Apps",
    template: "%s | mDeploy",
  },
  description:
    "Jalal Nasser is a freelance full stack developer who builds and ships production-grade web applications and cross-platform desktop apps. Available for hire — React, Next.js, TypeScript, Electron.",
  keywords: [
    // Freelance identity
    "freelance full stack developer",
    "freelance web developer for hire",
    "hire full stack developer",
    "freelance software engineer",
    "available for freelance projects",
    // Web app focus
    "web application developer",
    "full stack web app development",
    "Next.js developer freelance",
    "React developer for hire",
    "TypeScript developer freelance",
    // Desktop app focus
    "desktop app developer",
    "Electron desktop application developer",
    "cross-platform desktop app developer",
    "Windows app developer freelance",
    // Shipping / delivery angle
    "ship web apps",
    "production software developer",
    "full stack developer shipping apps",
    // Brand & tools
    "mDeploy",
    "Jalal Nasser",
    "PassGen",
    "Next.js",
    "React",
    "TypeScript",
    "Electron",
    "Node.js",
    "web development",
    "software engineer portfolio",
  ],
  authors: [{ name: "Jalal Nasser", url: "https://github.com/Jalal-Nasser" }],
  creator: "Jalal Nasser",
  publisher: "mDeploy",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jalal Nasser | Freelance Full Stack Developer – Web & Desktop Apps",
    description:
      "Freelance full stack developer building and shipping production web apps and cross-platform desktop apps. View my portfolio on GitHub.",
    type: "website",
    locale: "en_US",
    siteName: "mDeploy",
    url: "https://mdeploy.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jalal Nasser | Freelance Full Stack Developer – Web & Desktop Apps",
    description:
      "Freelance full stack developer building and shipping production web apps and cross-platform desktop apps.",
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Jalal Nasser",
                url: "https://mdeploy.dev",
                sameAs: [
                  "https://github.com/Jalal-Nasser",
                  "https://twitter.com/jalalnasser",
                ],
                jobTitle: "Freelance Full Stack Developer",
                description:
                  "Freelance full stack developer specializing in building and shipping web applications and cross-platform desktop apps using React, Next.js, TypeScript, and Electron.",
                knowsAbout: [
                  "Full Stack Development",
                  "Web Application Development",
                  "Desktop App Development",
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Electron",
                  "Node.js",
                  "Freelance Software Development",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "mDeploy",
                url: "https://mdeploy.dev",
                description:
                  "Portfolio and product hub of Jalal Nasser — freelance full stack developer shipping web and desktop applications.",
                author: {
                  "@type": "Person",
                  name: "Jalal Nasser",
                },
              },
            ]),
          }}
        />
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
