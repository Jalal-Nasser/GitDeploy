"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Github,
    Code,
    Terminal,
    ArrowRight,
    ExternalLink,
    Star,
    Users,
    Clock,
    Mail,
    Layers,
    Zap,
    Menu,
    X,
    GitBranch
} from "lucide-react";

// --- Configuration & Data ---

const GITHUB_PROFILE_URL = "https://github.com/Jalal-Nasser";
const BRAND_NAME = "mDeploy";
const CURRENT_YEAR = new Date().getFullYear();

const projects = [
    {
        name: "nexus-dashboard",
        description: "High-performance analytics dashboard with real-time data visualization and customizable widgets.",
        repoUrl: `${GITHUB_PROFILE_URL}/nexus-dashboard`,
        demoUrl: "https://demo.example.com",
        tags: ["Next.js", "TypeScript", "D3.js"],
    },
    {
        name: "cloud-deploy-cli",
        description: "A zero-config CLI tool for deploying full-stack applications to AWS/GCP in seconds.",
        repoUrl: `${GITHUB_PROFILE_URL}/cloud-deploy-cli`,
        tags: ["Rust", "CLI", "DevOps"],
    },
    {
        name: "hyper-auth",
        description: "Secure, passwordless authentication library for modern web apps. JWT & WebAuthn support.",
        repoUrl: `${GITHUB_PROFILE_URL}/hyper-auth`,
        tags: ["Node.js", "Security", "OAuth"],
    },
    {
        name: "pixel-editor-pro",
        description: "Browser-based image manipulation suite with WebGL acceleration and AI filters.",
        repoUrl: `${GITHUB_PROFILE_URL}/pixel-editor-pro`,
        demoUrl: "https://editor.example.com",
        tags: ["React", "WebGL", "WASM"],
    },
    {
        name: "async-queue-worker",
        description: "Robust distributed background job processing system backed by Redis strings and streams.",
        repoUrl: `${GITHUB_PROFILE_URL}/async-queue-worker`,
        tags: ["Go", "Redis", "Distributed Systems"],
    },
    {
        name: "finance-tracker-api",
        description: "Double-entry accounting ledger API with multi-currency support and audit trails.",
        repoUrl: `${GITHUB_PROFILE_URL}/finance-tracker-api`,
        tags: ["Python", "FastAPI", "PostgreSQL"],
    },
];

const timelineSteps = [
    { title: "Discover", description: "Deep dive into problem space & user needs.", icon: <Users className="w-5 h-5" /> },
    { title: "Design", description: "Architect scalable systems & intuitive UIs.", icon: <Layers className="w-5 h-5" /> },
    { title: "Build", description: "Clean, test-driven code with modern stacks.", icon: <Code className="w-5 h-5" /> },
    { title: "Ship", description: "Automated CI/CD pipelines to production.", icon: <Zap className="w-5 h-5" /> },
    { title: "Iterate", description: "Data-driven improvements & feature growth.", icon: <GitBranch className="w-5 h-5" /> },
];

const metrics = [
    { label: "Projects", value: "45+", icon: <Terminal className="w-5 h-5 text-blue-400" /> },
    { label: "Stars", value: "1.2k", icon: <Star className="w-5 h-5 text-yellow-400" /> },
    { label: "Followers", value: "850", icon: <Users className="w-5 h-5 text-green-400" /> },
    { label: "Last Release", value: "2d ago", icon: <Clock className="w-5 h-5 text-purple-400" /> },
];

// --- Utilities ---

const trackEvent = (eventName: string, props: Record<string, any> = {}) => {
    if (typeof window !== "undefined" && (window as any).plausible) {
        (window as any).plausible(eventName, { props });
    } else {
        console.log(`[Plausible Dev] ${eventName}`, props);
    }
};

const getUtmLink = (baseUrl: string, content: string) => {
    const url = new URL(baseUrl);
    url.searchParams.set("utm_source", "hub");
    url.searchParams.set("utm_medium", "landing");
    url.searchParams.set("utm_campaign", "github_growth");
    url.searchParams.set("utm_content", content);
    return url.toString();
};

// --- UI Components (Inline) ---

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" | "ghost", size?: "sm" | "md" | "lg" }>(
    ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
        const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
        const variants = {
            primary: "bg-white text-black hover:bg-slate-200 shadow-sm",
            secondary: "bg-slate-800 text-slate-50 hover:bg-slate-800/80",
            outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100",
            ghost: "hover:bg-slate-800 text-slate-100 hover:text-slate-50",
        };
        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 py-2",
            lg: "h-12 px-8 text-base",
        };
        return (
            <button ref={ref} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
        );
    }
);
Button.displayName = "Button";

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <span className={`inline-flex items-center rounded-full border border-slate-700 bg-slate-900/50 px-2.5 py-0.5 text-xs font-semibold text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
        {children}
    </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-xl border border-slate-800 bg-slate-950/50 text-slate-50 shadow-sm ${className}`}>
        {children}
    </div>
);

// --- Sections ---

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Projects", href: "#projects" },
        { name: "How I Build", href: "#process" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/70 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white">
                    <Terminal className="w-6 h-6 text-purple-500" />
                    {BRAND_NAME}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            {link.name}
                        </Link>
                    ))}
                    <Button
                        size="sm"
                        onClick={() => {
                            trackEvent("GitHub Click", { where: "nav" });
                            window.open(getUtmLink(GITHUB_PROFILE_URL, "nav_cta"), "_blank");
                        }}
                    >
                        <Github className="w-4 h-4 mr-2" />
                        View GitHub
                    </Button>
                </nav>

                {/* Mobile Nav Toggle */}
                <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-slate-800 bg-slate-950"
                    >
                        <div className="p-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-base font-medium text-slate-300 hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button
                                className="w-full"
                                onClick={() => {
                                    trackEvent("GitHub Click", { where: "nav", device: "mobile" });
                                    window.open(getUtmLink(GITHUB_PROFILE_URL, "nav_cta_mobile"), "_blank");
                                }}
                            >
                                <Github className="w-4 h-4 mr-2" />
                                View GitHub
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] -z-10 rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-900/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 -z-10 opacity-30 mix-blend-soft-light pointer-events-none
              bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.18),transparent_35%),
                  radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.16),transparent_40%),
                  radial-gradient(circle_at_50%_80%,rgba(236,72,153,0.10),transparent_45%)]"
            />
            <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Badge className="mb-6 px-4 py-1.5 border-purple-500/30 bg-purple-500/10 text-purple-300">
                        <span className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            Available for new projects
                        </span>
                    </Badge>
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    mDeploy builds and ships{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        production software.
                    </span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Specializing in scalable web applications, cross-platform mobile experiences, and robust open-source tools.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Button
                        size="lg"
                        onClick={() => {
                            trackEvent("GitHub Click", { where: "hero" });
                            window.open(getUtmLink(GITHUB_PROFILE_URL, "hero_cta"), "_blank");
                        }}
                    >
                        <Github className="w-5 h-5 mr-2" />
                        View GitHub Profile
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => {
                            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        Explore Projects
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

function Stats() {
    return (
        <section className="py-10 border-y border-white/5 bg-slate-950/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {metrics.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center justify-center text-center p-4"
                        >
                            <div className="bg-slate-900/50 p-3 rounded-full mb-3 border border-slate-800">
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Projects() {
    return (
        <section id="projects" className="py-24 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center mb-16 text-center">
                    <Badge className="mb-4 bg-blue-500/10 text-blue-300 border-blue-500/20">Portfolio</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
                    <p className="text-slate-400 max-w-2xl">
                        A selection of open-source repositories and production applications I've shipped.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="h-full flex flex-col p-6 hover:border-purple-500/50 hover:bg-slate-900/80 transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 bg-slate-800 rounded-lg text-white group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                                        <Code className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-2">
                                        {project.demoUrl && (
                                            <button
                                                onClick={() => {
                                                    trackEvent("Demo Click", { repo: project.name });
                                                    window.open(project.demoUrl, "_blank");
                                                }}
                                                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
                                                title="Live Demo"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300 font-mono">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Button
                                        className="w-full mt-4"
                                        variant="secondary"
                                        onClick={() => {
                                            trackEvent("GitHub Click", { where: "project_card", repo: project.name });
                                            window.open(getUtmLink(project.repoUrl, "project_repo"), "_blank");
                                        }}
                                    >
                                        <Github className="w-4 h-4 mr-2" />
                                        View Source
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => {
                            trackEvent("GitHub Click", { where: "project_card", repo: "all_repos" });
                            window.open(getUtmLink(GITHUB_PROFILE_URL, "all_repos"), "_blank");
                        }}
                    >
                        See all repositories
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </section>
    );
}

function Process() {
    return (
        <section id="process" className="py-24 bg-slate-950/50 border-y border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-16 md:text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How I Build</h2>
                    <p className="text-slate-400">From concept to deployment, my workflow focuses on quality and speed.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {timelineSteps.map((step, idx) => (
                            <motion.div
                                key={step.title}
                                className="relative flex flex-col items-center md:text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                            >
                                <div className="z-10 flex items-center justify-center w-24 h-24 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl mb-6 group hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all duration-300">
                                    <div className="text-slate-400 group-hover:text-purple-400 transition-colors transform group-hover:scale-110 duration-300">
                                        {React.cloneElement(step.icon as React.ReactElement, { className: "w-8 h-8" })}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-400 px-2">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Contact() {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/10 blur-[130px] -z-10 rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <Card className="p-8 md:p-12 bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to collaborate?</h2>
                        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                            I'm always open to discussing new projects, open-source ideas, or employment opportunities.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="w-full sm:w-auto min-w-[160px]"
                                onClick={() => window.open(getUtmLink(GITHUB_PROFILE_URL, "contact_github"), "_blank")}
                            >
                                <Github className="w-5 h-5 mr-2" />
                                GitHub
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="w-full sm:w-auto min-w-[160px]"
                                onClick={() => window.location.href = "mailto:hello@mdeploy.dev"}
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                Email Me
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-8 border-t border-white/5 bg-slate-950">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="font-semibold text-slate-200">© {CURRENT_YEAR} {BRAND_NAME}</span>
                    <span>•</span>
                    <span>All rights reserved.</span>
                </div>

                <div className="flex items-center gap-6">
                    <Link href={getUtmLink(GITHUB_PROFILE_URL, "footer")} target="_blank" className="text-slate-400 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link href="mailto:hello@mdeploy.dev" className="text-slate-400 hover:text-white transition-colors">
                        <Mail className="w-5 h-5" />
                        <span className="sr-only">Email</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}

// --- Main Page Component ---

export default function Home() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 selection:bg-purple-900/50">
            <Navbar />
            <Hero />
            <Stats />
            <Projects />
            <Process />
            <Contact />
            <Footer />
        </main>
    );
}
