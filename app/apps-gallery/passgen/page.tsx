"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Download,
    Check,
    Shield,
    Key,
    Cloud,
    Search,
    Lock,
    Eye,
    Zap,
    Server,
    Database,
    Globe,
    ChevronRight,
    X,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Card } from "../../components/ui/Card";



export default function PassGenPage() {
    const [downloadCount, setDownloadCount] = useState<number | null>(null);

    useEffect(() => {
        fetch("https://api.github.com/repos/Jalal-Nasser/PassGen/releases")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const total = data.reduce((acc, release) => {
                        return acc + release.assets.reduce((sum: number, asset: any) => sum + asset.download_count, 0);
                    }, 0);
                    setDownloadCount(total);
                }
            })
            .catch((err) => console.error("Failed to fetch download count", err));
    }, []);

    return (
        <main className="min-h-screen bg-background text-foreground pt-16">
            <Hero downloadCount={downloadCount} />
            <Features />
            <Interface />
            <Pricing />
            <DownloadSection downloadCount={downloadCount} />
        </main>
    );
}

function Hero({ downloadCount }: { downloadCount: number | null }) {
    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-900/20 blur-[130px] -z-10 rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/10 blur-[120px] -z-10 rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Image
                        src="/passgen-logo.png"
                        alt="PassGen Logo"
                        width={120}
                        height={120}
                        className="mb-8 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                    />
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 max-w-5xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Password Generator <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        & Vault Desktop App
                    </span>
                </motion.h1>

                <motion.p
                    className="text-xl text-slate-400 mb-10 max-w-3xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    A secure and user-friendly desktop application for generating strong passwords and storing them encrypted in the cloud.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Button
                        size="lg"
                        className="h-14 px-8 text-lg"
                        onClick={() => window.open("https://github.com/Jalal-Nasser/PassGen/releases/download/v1.0.6/PassGen.Setup.1.0.6.exe", "_blank")}
                    >
                        <Download className="w-6 h-6 mr-3" />
                        Download for Windows
                    </Button>
                    <p className="mt-4 text-sm text-slate-500">
                        Version 1.0.6 • Windows 10/11
                        {downloadCount !== null && (
                            <span className="text-slate-400"> • {downloadCount.toLocaleString()} Downloads</span>
                        )}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

function Features() {
    return (
        <section className="py-24 bg-slate-900/30 border-y border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <Badge className="mb-4">Features</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Security Simplified</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Everything you need to manage your credentials securely with military-grade encryption.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Generator */}
                    <Card className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-900/20 border-purple-500/20">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 text-purple-400">
                            <Key className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Password Generator</h3>
                        <ul className="space-y-4">
                            {[
                                "Generate secure random passwords",
                                "Customizable password length (4-64 characters)",
                                "Choose character types (Uppercase, Lowercase, Numbers, Symbols)",
                                "One-click copy to clipboard"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Vault */}
                    <Card className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20 border-blue-500/20">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 text-blue-400">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Password Vault</h3>
                        <ul className="space-y-4">
                            {[
                                "Store passwords securely with AES-256 encryption",
                                "Search and organize your passwords",
                                "Store additional info: username, URL, notes",
                                "Master password protection"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                <div className="mt-12">
                    <Card className="p-8 border-slate-800 bg-slate-950/50">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Cloud className="w-8 h-8 text-sky-400" />
                                    Multiple Cloud Storage Options
                                </h3>
                                <p className="text-slate-400 mb-6">
                                    Sync your encrypted passwords across devices using valid storage providers.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Database className="w-4 h-4 text-slate-500" /> Local Storage
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Server className="w-4 h-4 text-green-500" /> Google Drive
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Cloud className="w-4 h-4 text-orange-500" /> AWS S3
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-300">
                                        <Globe className="w-4 h-4 text-blue-500" /> DigitalOcean Spaces
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}


function Interface() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Visual Tour</h2>
                    <p className="text-slate-400">Experience the modern and intuitive interface.</p>
                </div>

                <div className="space-y-32">
                    {/* Feature 1: Login */}
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        <motion.div
                            className="flex-1 order-2 md:order-1 relative"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative group rounded-xl overflow-hidden border border-purple-500/20 shadow-2xl shadow-purple-900/20">
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                                <Image
                                    src="/passgen/login.png"
                                    alt="Secure Login Screen"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded-xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            className="flex-1 order-1 md:order-2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Secure Entry</h3>
                            <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                Your data is protected by a master password. We use industry-standard AES-256 encryption to ensure only you can access your vault.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-purple-500" />
                                    Locally Encrypted
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-purple-500" />
                                    Offline Capable
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Feature 2: Generator */}
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        <motion.div
                            className="flex-1"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Instant Generation</h3>
                            <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                Create unbreakable passwords in milliseconds. Customize length and complexity to meet specific requirements for any service.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-blue-500" />
                                    Customizable Rules
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-blue-500" />
                                    One-Click Copy
                                </li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="flex-1 relative"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative group rounded-xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-900/20">
                                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                                <Image
                                    src="/passgen/generator.png"
                                    alt="Password Generator Screen"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded-xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Feature 3: Vault */}
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        <motion.div
                            className="flex-1 order-2 md:order-1 relative"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative group rounded-xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-900/20">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                                <Image
                                    src="/passgen/vault.png"
                                    alt="Vault Dashboard"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded-xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            className="flex-1 order-1 md:order-2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-400">
                                <Database className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Organized Vault</h3>
                            <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                Keep your digital life organized. Store credentials with metadata, search instantly, and manage your accounts efficiently.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500" />
                                    Smart Search
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-emerald-500" />
                                    Cloud Backup Actions
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}




function Pricing() {
    return (
        <section id="pricing" className="py-24 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple Pricing</h2>
                    <p className="text-slate-400">Choose the plan that fits your security needs.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Plan */}
                    <Card className="p-8 border-slate-800 bg-transparent hover:border-slate-700 flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                        <div className="text-4xl font-bold text-white mb-6">$0</div>
                        <p className="text-slate-400 mb-8">Essential password generation for local use.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-green-500" />
                                Store up to 4 passwords locally
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-green-500" />
                                Secure Random Generator
                            </li>
                            <li className="flex items-center gap-3 text-slate-500">
                                <X className="w-5 h-5" />
                                Cloud Sync
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full" onClick={() => window.open("https://github.com/Jalal-Nasser/PassGen/releases/download/v1.0.6/PassGen.Setup.1.0.6.exe", "_blank")}>
                            Download Free
                        </Button>
                    </Card>

                    {/* Premium Plan */}
                    <Card className="p-8 border-purple-500/50 bg-purple-900/10 hover:border-purple-500 relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                            POPULAR
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
                        <div className="text-4xl font-bold text-white mb-6">$15<span className="text-lg text-slate-400 font-normal">/year</span></div>
                        <p className="text-slate-400 mb-8">Complete cloud sync and unlimited storage.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-purple-400" />
                                Unlimited password storage
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-purple-400" />
                                Cloud sync (Google Drive, AWS, DO)
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-purple-400" />
                                Automatic backups
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-purple-400" />
                                Priority support
                            </li>
                        </ul>

                        <Button className="w-full" onClick={() => window.location.href = "/apps-gallery/passgen/pricing"}>
                            Get Premium
                        </Button>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card className="p-8 border-slate-800 bg-transparent hover:border-blue-500/50 flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
                        <div className="text-4xl font-bold text-white mb-6">Custom</div>
                        <p className="text-slate-400 mb-8">Advanced security for large organizations.</p>

                        <ul className="space-y-4 mb-8 flex-1">
                            <li className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-blue-500" />
                                Single Sign-On (SSO)
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-blue-500" />
                                Advanced Audit Logs
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-blue-500" />
                                Dedicated Success Manager
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <Check className="w-5 h-5 text-blue-500" />
                                Custom Contract & SLA
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full" onClick={() => window.location.href = "/#contact"}>
                            Contact Sales
                        </Button>
                    </Card>
                </div>
            </div>
        </section>
    );
}


function DownloadSection({ downloadCount }: { downloadCount: number | null }) {
    return (
        <section className="py-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-purple-600/10 blur-3xl -z-10" />
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold text-white mb-6">Start Securing Your Data Today</h2>
                <Button
                    size="lg"
                    className="h-14 px-8 text-lg"
                    onClick={() => window.open("https://github.com/Jalal-Nasser/PassGen/releases/download/v1.0.6/PassGen.Setup.1.0.6.exe", "_blank")}
                >
                    <Download className="w-6 h-6 mr-3" />
                    Download PassGen v1.0.6
                </Button>
                {downloadCount !== null && (
                    <p className="mt-4 text-sm text-slate-400">
                        Join {downloadCount.toLocaleString()} users securing their data
                    </p>
                )}
            </div>
        </section>
    );
}
