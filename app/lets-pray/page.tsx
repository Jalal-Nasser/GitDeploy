import type { Metadata } from "next";
import Image from "next/image";
import { Bell, Clock, Download, TimerReset, Volume2 } from "lucide-react";
import { DonateCard } from "./DonateCard";

const WINDOWS_STORE_URL = "https://apps.microsoft.com/detail/9P0D5302L719?hl=en-us&gl=SA&ocid=pdpshare";
const ARABIC_TAGLINE = "\u062d\u064a \u0639\u0644\u0649 \u0627\u0644\u0635\u0644\u0627\u0629";

const features = [
    {
        title: "Prayer Times",
        description: "Accurate daily prayer times based on your current location and selected calculation method.",
        icon: Clock,
    },
    {
        title: "Azan Notifications",
        description: "Beautiful full-screen or subtle desktop alerts when it is time to pray.",
        icon: Bell,
    },
    {
        title: "Multiple Muezzins",
        description: "Choose from a variety of beautiful voices including Al-Afasy, Al-Hussary, and more.",
        icon: Volume2,
    },
    {
        title: "Next Prayer Countdown",
        description: "A constant widget showing exactly how much time is left until the next prayer.",
        icon: TimerReset,
    },
];

const interfaceShots = [
    {
        title: "Settings Panel",
        src: "/images/lets-pray/settings.png",
        alt: "Let's Pray Settings Panel",
    },
    {
        title: "Muezzin Selection",
        src: "/images/lets-pray/muezzin.png",
        alt: "Let's Pray Muezzin Selection",
    },
];

export const metadata: Metadata = {
    title: `Let's Pray ${ARABIC_TAGLINE} | mDeploy`,
    description: "Prayer times and precise Azan notifications right on your desktop. Stay on time with your daily worship seamlessly.",
    alternates: {
        canonical: "/lets-pray",
    },
    openGraph: {
        title: `Let's Pray ${ARABIC_TAGLINE} | mDeploy`,
        description: "Prayer times and precise Azan notifications right on your desktop.",
        url: "https://mdeploy.dev/lets-pray",
        siteName: "mDeploy",
        type: "website",
        images: [
            {
                url: "https://mdeploy.dev/images/lets-pray/hero.png",
                width: 1600,
                height: 900,
                alt: "Let's Pray App Dashboard",
            },
        ],
    },
};

function DownloadButton({ label, className = "" }: { label: string; className?: string }) {
    return (
        <a
            href={WINDOWS_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_24px_rgba(16,185,129,0.35)] transition hover:scale-[1.02] hover:from-emerald-500 hover:to-teal-500 ${className}`}
        >
            <Download className="mr-2 h-5 w-5" />
            {label}
        </a>
    );
}

export default function LetsPrayPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#020617] pb-20 pt-28 text-slate-100 selection:bg-emerald-500/30">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-screen"
                style={{ backgroundImage: "url('/mosque-bg.jpg')" }}
            />
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-emerald-500/8 via-teal-500/6 to-transparent" />
            <div className="absolute right-0 top-0 h-[32rem] w-[32rem] rounded-full bg-emerald-900/20 blur-[120px]" />
            <div className="absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-teal-900/15 blur-[120px]" />

            <div className="container relative z-10 mx-auto px-4">
                <section className="mb-28 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-3 rounded-full border border-emerald-500/25 bg-white/5 px-5 py-2 text-sm backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        <span className="font-medium text-emerald-400">LetsPray</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-slate-300">Desktop App</span>
                    </div>

                    <h1 className="mt-8 max-w-5xl bg-gradient-to-b from-emerald-300 to-teal-600 bg-clip-text pb-4 text-5xl font-bold leading-tight text-transparent drop-shadow-[0_0_25px_rgba(16,185,129,0.25)] md:text-6xl lg:text-8xl">
                        Let&apos;s Pray {ARABIC_TAGLINE}
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg font-light text-emerald-100/75 md:text-xl">
                        Prayer times and precise Azan notifications right on your desktop. Stay on time with your daily worship seamlessly.
                    </p>

                    <div className="mt-10">
                        <DownloadButton label="Download for Windows" />
                    </div>

                    <div className="mt-16 w-full max-w-5xl">
                        <div className="rounded-[1.5rem] border border-emerald-500/20 bg-black/40 p-2 shadow-[0_20px_50px_rgba(16,185,129,0.15)] backdrop-blur-sm transition duration-500 hover:scale-[1.01]">
                            <Image
                                src="/images/lets-pray/hero.png"
                                alt="Let's Pray App Dashboard"
                                width={1600}
                                height={900}
                                priority
                                className="min-h-[280px] w-full rounded-[1.15rem] border border-slate-800 object-cover md:min-h-[420px]"
                            />
                        </div>
                    </div>
                </section>

                <section className="mb-28">
                    <div className="mb-14 text-center">
                        <h2 className="inline-block bg-gradient-to-r from-emerald-200 to-teal-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                            Premium Features
                        </h2>
                        <p className="mt-4 text-slate-400">Everything you need to maintain your prayers</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {features.map(({ title, description, icon: Icon }) => (
                            <article
                                key={title}
                                className="group relative rounded-3xl border border-teal-900/40 bg-slate-900/40 p-8 backdrop-blur-xl transition hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-950/50 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition group-hover:scale-110">
                                    <Icon className="h-7 w-7 text-emerald-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-emerald-50">{title}</h3>
                                <p className="text-sm font-light leading-relaxed text-slate-400">{description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mb-28">
                    <div className="mb-14 text-center">
                        <h2 className="inline-block bg-gradient-to-r from-emerald-200 to-teal-400 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                            User Interface
                        </h2>
                        <p className="mt-4 text-slate-400">Clean, elegant, and distraction-free design</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {interfaceShots.map((shot) => (
                            <figure
                                key={shot.title}
                                className="rounded-[1.75rem] border border-emerald-500/15 bg-slate-900/35 p-3 shadow-[0_18px_40px_rgba(2,6,23,0.45)] backdrop-blur-sm"
                            >
                                <Image
                                    src={shot.src}
                                    alt={shot.alt}
                                    width={1400}
                                    height={900}
                                    className="w-full rounded-[1.2rem] border border-slate-800 object-cover"
                                />
                                <figcaption className="px-2 pb-2 pt-5 text-center text-lg font-medium text-emerald-100">
                                    {shot.title}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </section>

                <DonateCard />

                <section className="mx-auto max-w-4xl rounded-[2rem] border border-emerald-500/15 bg-gradient-to-br from-emerald-950/30 via-slate-950/70 to-teal-950/20 px-6 py-12 text-center shadow-[0_25px_70px_rgba(15,23,42,0.45)] backdrop-blur-xl md:px-12">
                    <h2 className="text-3xl font-bold text-white md:text-4xl">
                        Download now and stay on time with your prayers.
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
                        Join thousands of users who trust Let&apos;s Pray for their daily worship schedule.
                    </p>
                    <div className="mt-8">
                        <DownloadButton label="Get Let&apos;s Pray Free" className="min-w-[220px]" />
                    </div>
                </section>
            </div>
        </main>
    );
}
