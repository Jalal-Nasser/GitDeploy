"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Github,
    Code,
    Terminal,
    ArrowRight,
    Star,
    Users,
    Clock,
    Mail,
    Layers,
    Zap,
    GitBranch,
} from "lucide-react";
import { Button } from "./components/ui/Button";
import { Badge } from "./components/ui/Badge";
import { Card } from "./components/ui/Card";


// --- Configuration & Data ---

const GITHUB_PROFILE_URL = "https://github.com/Jalal-Nasser";

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
        name: "Ardh",
        description: "Modern eCommerce store solution integrated with Cloudflare Turnstile for robust bot protection and secure transactions.",
        repoUrl: "https://github.com/Jalal-Nasser/ARDH",
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

// --- Sections ---

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
        <section className="py-20 border-y border-purple-500/20 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 backdrop-blur-sm relative z-20">
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
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % timelineSteps.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 50,
                damping: 10
            }
        }
    };

    return (
        <section id="process" className="py-24 bg-slate-950/50 border-y border-white/5 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-16 md:text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How I Build</h2>
                        <p className="text-slate-400">From concept to deployment, my workflow focuses on quality and speed.</p>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <motion.div
                        className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-5 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {timelineSteps.map((step, idx) => {
                            const isActive = idx === activeStep;
                            return (
                                <motion.div
                                    key={step.title}
                                    className="relative flex flex-col items-center md:text-center z-10"
                                    variants={itemVariants}
                                >
                                    <div
                                        className="group relative cursor-pointer"
                                        onMouseEnter={() => setActiveStep(idx)}
                                    >
                                        <div className={`absolute inset-0 bg-purple-500/20 blur-xl rounded-full transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                                        <div className={`relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl bg-slate-900 border shadow-xl mb-6 transition-all duration-500 ${isActive ? "border-purple-500/50 scale-110 shadow-purple-500/20" : "border-slate-800 group-hover:border-purple-500/50 group-hover:scale-110"}`}>
                                            {React.cloneElement(step.icon as any, { className: `w-8 h-8 transition-colors duration-300 ${isActive ? "text-purple-400" : "text-slate-300 group-hover:text-purple-400"}` })}
                                        </div>
                                    </div>
                                    <h3 className={`text-lg font-bold transition-colors duration-300 mb-2 ${isActive ? "text-white" : "text-white/70"}`}>{step.title}</h3>
                                    <p className="text-sm text-slate-400 px-2 leading-relaxed">{step.description}</p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
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

// --- Main Page Component ---

export default function Home() {
    return (
        <main className="min-h-screen bg-transparent text-foreground selection:bg-purple-900/50">
            <Hero />
            <Stats />
            <Projects />
            <Process />
            <Contact />
        </main>
    );
}
