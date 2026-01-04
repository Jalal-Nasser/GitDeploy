"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
    GitBranch,
    ArrowUp
} from "lucide-react";

// --- Configuration & Data ---

const GITHUB_PROFILE_URL = "https://github.com/Jalal-Nasser";
const BRAND_NAME = "mDeploy";
const CURRENT_YEAR = new Date().getFullYear();

const projects = [
    {
        name: "PassGen",
        description: "Secure Password Generator & Vault Desktop App featuring advanced encryption and activation dashboard.",
        repoUrl: "https://github.com/Jalal-Nasser/PassGen",
        tags: ["Desktop App", "Security", "Electron"],
    },
    {
        name: "FinAi",
        description: "AI-driven financial automation platform supporting multi-country tax compliance, ZATCA e-invoicing, and IFRS standards.",
        repoUrl: "https://github.com/mDeploys/FinAi",
        tags: ["AI", "FinTech", "ZATCA", "Automation"],
    },
    {
        name: "Dropskey",
        description: "Modern eCommerce store solution integrated with Cloudflare Turnstile for robust bot protection and secure transactions.",
        repoUrl: "https://github.com/mDeploys/Dropskey",
        tags: ["eCommerce", "Security", "Next.js"],
    },
    {
        name: "GetSolution",
        description: "Professional IT Services website showcasing digital transformation solutions and business consulting services.",
        repoUrl: "https://github.com/Jalal-Nasser/GetSolution",
        tags: ["Web Dev", "IT Services", "React"],
    },
    {
        name: "Logistic",
        description: "Comprehensive logistics management application for tracking supply chains and delivery operations.",
        repoUrl: "https://github.com/mDeploys/Logistic",
        tags: ["Logistics", "App", "Management"],
    },
    {
        name: "royalarch",
        description: "Architectural design and project management system for premium construction projects.",
        repoUrl: "https://github.com/Jalal-Nasser/royalarch",
        tags: ["Architecture", "Design", "System"],
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
        // console.log(`[Plausible Dev] ${eventName}`, props);
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
            primary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-white/10",
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
    <span className={`inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.2)] ${className}`}>
        {children}
    </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-xl border border-purple-500/20 bg-[#0d0b21] hover:bg-[#13112b] text-slate-50 shadow-sm transition-all duration-300 ${className}`}>
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
        <header className="fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 backdrop-blur-md border-b border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                        <Image
                            src="/logo.png"
                            alt="mDeploy Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="hidden leading-tight text-start md:block">
                        <span className="text-xl font-bold tracking-tight text-[#f959ca] drop-shadow-[0_2px_10px_rgba(249,89,202,0.6)]">mDeploy</span>
                        <span className="block text-xs font-medium text-white drop-shadow-[0_1px_5px_rgba(255,255,255,0.5)] opacity-90">Professional Deployment Services</span>
                    </div>
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

            {/* Background Gradients (Updated) */}
            <div className="absolute inset-0 -z-10 opacity-60 mix-blend-screen pointer-events-none
                bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.25),transparent_40%),
                    radial-gradient(circle_at_80%_30%,rgba(139,92,246,0.25),transparent_40%),
                    radial-gradient(circle_at_50%_80%,rgba(192,38,211,0.15),transparent_45%)]"
            />
            {/* Grid Overlay is now global, adding a specific spotlight effect for hero */}
            <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(126,34,206,0.15),transparent_70%)]"></div>

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
        <section className="py-20 border-y border-white/5 bg-transparent backdrop-blur-sm relative z-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {metrics.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center justify-center text-center p-4 group"
                        >
                            <div className="bg-slate-900/50 p-4 rounded-full mb-4 border border-slate-800/50 shadow-lg group-hover:border-purple-500/50 group-hover:shadow-purple-500/20 transition-all duration-300">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-slate-400 group-hover:text-purple-400 transition-colors">{stat.label}</div>
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
                            <Card className="h-full flex flex-col p-6 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-2 bg-slate-800 rounded-lg text-white group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                                        <Code className="w-6 h-6" />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex gap-2">
                                        </div>
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
                                    {React.cloneElement(step.icon as any, { className: "w-8 h-8" })}
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
                <Card className="p-8 md:p-12 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 border-purple-500/20 text-center relative overflow-hidden shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]">
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
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 py-12 lg:px-8">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="mb-2 text-xl font-bold tracking-tight">mDeploy</h3>
                        <p className="text-sm text-muted-foreground">Professional deployment services for websites, web apps, mobile apps, and desktop applications.</p>
                        <div className="mt-5">
                            <p className="text-sm font-semibold text-foreground">Connect</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                <a href="https://x.com/jalalnasser" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path d="m4 3h4.5l3.5 4.9L15.4 3H20l-6.3 8.5L20.2 21h-4.6l-4-5.2L7.2 21H3l6.5-8.8Z"></path></svg>
                                    <span>Twitter</span>
                                </a>
                                <a href="https://github.com/mDeploys" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-4 w-4" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                                    <span>GitHub</span>
                                </a>
                                <a href="https://www.behance.net/jalalnasser" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4"><path d="M4.5 4h6.4c2.9 0 4.6 1.6 4.6 3.9 0 1.5-.9 2.7-2.1 3.2 1.6.4 2.7 1.9 2.7 3.6 0 2.6-1.8 4.3-4.9 4.3H4.5Zm3.4 7.1h2.7c1.1 0 1.9-.7 1.9-1.7s-.7-1.6-1.9-1.6H7.9Zm0 6h3.1c1.3 0 2.1-.7 2.1-1.8s-.8-1.9-2.1-1.9H7.9Zm9.5-3.2c0-2.7 2-4.7 4.6-4.7 2.8 0 4.3 1.9 4.4 4.6 0 .3 0 .7-.1 1h-6c.2 1 .9 1.6 2.1 1.6.9 0 1.6-.3 2.3-1l1.6 1.8c-.9 1-2.2 1.6-3.9 1.6-2.9 0-5-1.9-5-4.9Zm4.6-2c-1 0-1.5.7-1.7 1.4h3.4c-.1-.7-.6-1.4-1.7-1.4Zm1.3-4.8H18V6h5.1Z"></path></svg>
                                    <span>Behance</span>
                                </a>
                                <a href="https://www.linkedin.com/in/jalalnasser" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin h-4 w-4" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                    <span>LinkedIn</span>
                                </a>
                                <a href="https://jalalnasser.com" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-earth h-4 w-4" aria-hidden="true"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"></path><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"></path><circle cx="12" cy="12" r="10"></circle></svg>
                                    <span>Blog</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link className="text-muted-foreground hover:text-foreground" href="/#services">Website Deployment</Link></li>
                            <li><Link className="text-muted-foreground hover:text-foreground" href="/#services">Web Apps</Link></li>
                            <li><Link className="text-muted-foreground hover:text-foreground" href="/#services">Mobile Apps</Link></li>
                            <li><Link className="text-muted-foreground hover:text-foreground" href="/#services">Desktop Development</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link className="text-muted-foreground hover:text-foreground" href="/calculator">Pricing</Link></li>
                            <li><Link className="text-muted-foreground hover:text-foreground" href="/contact">Contact us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link className="text-muted-foreground hover:text-foreground" href="/privacy">Privacy Policy</Link></li>
                            <li><Link className="text-muted-foreground hover:text-foreground" href="/terms">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-10 w-full border-t border-slate-800 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 py-5 text-center text-sm text-slate-100 shadow-[0_-10px_35px_-25px_rgba(15,23,42,0.8)]">
                <div className="container mx-auto px-4 lg:px-8">
                    <p>© {new Date().getFullYear()} mDeploy. All rights reserved. · Developed by <a href="https://github.com/Jalal-Nasser" target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-300 hover:text-purple-200">Jalal Nasser</a></p>
                </div>
            </div>
        </footer>
    );
}

function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:bg-purple-500 transition-colors focus:outline-none"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-6 h-6" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

// --- Main Page Component ---

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-purple-900/50">
            <Navbar />
            <Hero />
            <Stats />
            <Projects />
            <Process />
            <Contact />
            <Footer />
            <ScrollToTop />
        </main>
    );
}
