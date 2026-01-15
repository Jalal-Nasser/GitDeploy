"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MsStoreBadge } from "../components/ui/MsStoreBadge";

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
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Card } from "../components/ui/Card";
import { PricingCard } from "../components/ui/PricingCard";



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
                    Password Vault & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                        Developer Secret Manager
                    </span>
                    <br /> for Windows
                </motion.h1>

                <motion.p
                    className="text-xl text-slate-400 mb-4 max-w-3xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Secure passwords, API keys, and application secrets — encrypted locally and backed up safely.
                </motion.p>

                <motion.p
                    className="text-lg text-slate-500 mb-10 max-w-3xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                >
                    Generate strong passwords, manage encrypted vaults, and create production-ready API secrets with zero-knowledge security.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <MsStoreBadge />
                    <p className="mt-4 text-sm text-slate-500">
                        Version 1.0.7 • Windows 10/11
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
                    <div className="flex justify-center gap-2 mb-4">
                        <Badge>Features</Badge>
                        <Badge variant="outline" className="border-purple-500/30 text-purple-300">Offline-first</Badge>
                        <Badge variant="outline" className="border-blue-500/30 text-blue-300">Zero-knowledge</Badge>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Security Simplified — for Users and Developers</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Everything you need to protect passwords, API keys, and application secrets with zero-knowledge, military-grade encryption.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    {/* Generator */}
                    <Card className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-purple-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-900/20 group">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 text-purple-400 group-hover:bg-purple-500/30 transition-colors">
                            <Key className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Password Generator</h3>
                        <ul className="space-y-4">
                            {[
                                "Generate cryptographically secure passwords",
                                "Customizable length and character sets",
                                "Presets for websites, banking, and accounts",
                                "One-click copy with clipboard protection"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Vault */}
                    <Card className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-900/20 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-900/20 group flex flex-col">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Encrypted Password Vault</h3>
                        <ul className="space-y-4 mb-auto">
                            {[
                                "Store passwords securely with AES-256 encryption",
                                "Search, organize, and tag credentials",
                                "Store usernames, URLs, notes, and metadata",
                                "Master password–protected, zero-knowledge vault"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-4 border-t border-slate-800/50">
                            <p className="text-xs text-slate-500">Cloud backup stores encrypted vault snapshots only.</p>
                        </div>
                    </Card>

                    {/* Developer Secrets */}
                    <Card className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-900/20 border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-900/20 group">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-6 text-orange-400 group-hover:bg-orange-500/30 transition-colors">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Developer Secret Generator</h3>
                        <ul className="space-y-4">
                            {[
                                "Generate 32-byte (256-bit) API & application secrets",
                                "Output formats: Base64URL, Hex, .env key/value",
                                "Presets for JWT signing keys, API keys, webhooks",
                                "Inject secrets directly into project .env files",
                                "Secrets generated locally and never stored in plaintext"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Encrypted Backup */}
                    <Card className="p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900/20 border-sky-500/20 hover:border-sky-500/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-sky-900/20 group flex flex-col">
                        <div className="w-12 h-12 bg-sky-500/20 rounded-lg flex items-center justify-center mb-6 text-sky-400 group-hover:bg-sky-500/30 transition-colors">
                            <Cloud className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Encrypted Backup & Sync</h3>
                        <ul className="space-y-4 mb-6">
                            {[
                                "Local-first encryption — cloud never sees plaintext",
                                "Google Drive encrypted backup (recommended)",
                                "Advanced BYOB options (S3-compatible storage)",
                                "Restore vault securely on new devices"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-sky-500 mt-0.5 shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Supported Providers Grid */}
                <div className="mt-8">
                    <p className="text-sm text-slate-400 mb-4 block font-medium">Supported Providers:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Local Storage */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                                <Database className="w-5 h-5 text-indigo-400" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-semibold text-sm">Local Storage</span>
                                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Default</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">Store your encrypted vault on this device</p>
                            </div>
                        </div>

                        {/* Google Drive */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden p-1.5">
                                <Image
                                    src="/passgen/icons/google-drive.png"
                                    alt="Google Drive"
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-contain"
                                    unoptimized
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-semibold text-sm">Google Drive</span>
                                    <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Recommended</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">Encrypted sync/backup with your Google account</p>
                            </div>
                        </div>

                        {/* S3-Compatible */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-[#242e38] flex items-center justify-center shrink-0 border border-slate-700 overflow-hidden p-1.5">
                                <Image
                                    src="/passgen/icons/s3.png"
                                    alt="S3 Compatible"
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-contain"
                                    unoptimized
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-semibold text-sm">S3-Compatible</span>
                                    <span className="text-[10px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Advanced</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">AWS, R2, Wasabi, Spaces, MinIO, or custom</p>
                            </div>
                        </div>

                        {/* Supabase */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors">
                            <div className="w-10 h-10 rounded-lg bg-[#1c1c1c] flex items-center justify-center shrink-0 border border-slate-700 overflow-hidden p-1.5">
                                <Image
                                    src="/passgen/icons/supabase.png"
                                    alt="Supabase"
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-contain"
                                    unoptimized
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-semibold text-sm">Supabase</span>
                                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Advanced</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">Encrypted snapshots in your database</p>
                            </div>
                        </div>

                        {/* OneDrive (New) */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors sm:col-span-2 lg:col-span-4 justify-center">
                            <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden p-1.5">
                                <Image
                                    src="/passgen/icons/onedrive.png"
                                    alt="OneDrive"
                                    width={24}
                                    height={24}
                                    className="w-full h-full object-contain"
                                    unoptimized
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-semibold text-sm">OneDrive</span>
                                    <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Coming Soon</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed">Encrypted OneDrive backup support coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 text-sm flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-500" />
                        Your passwords and secrets are encrypted on your device before any backup. PassGen cannot read your data.
                    </p>
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
                                    src="/passgen/vault-v2.png"
                                    alt="Vault Dashboard"
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    style={{ width: '100%', height: 'auto' }}
                                    className="rounded-xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                                    unoptimized
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

                    {/* Feature 4: Developer Tools (New) */}
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        <motion.div
                            className="flex-1"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6 text-orange-400">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Developer Tools</h3>
                            <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                Built for engineers. Generate cryptographic secrets for your applications and inject them directly into your workflow.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-orange-500" />
                                    Generate API Keys & JWT Secrets
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-orange-500" />
                                    Direct .env Injection
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Check className="w-5 h-5 text-orange-500" />
                                    Base64URL & Hex Formats
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
                            <div className="relative group rounded-xl overflow-hidden border border-orange-500/20 shadow-2xl shadow-orange-900/20">
                                <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                                <Image
                                    src="/passgen/developer-secrets.png"
                                    alt="Developer Secret Generator"
                                    width={800}
                                    height={600}
                                    className="w-full h-auto rounded-xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}





function Pricing() {
    const [interval, setInterval] = React.useState<"MONTH" | "YEAR">("YEAR");
    const { useRouter, useSearchParams } = require("next/navigation");
    const router = useRouter();
    const searchParams = useSearchParams();
    const installIdParam = searchParams?.get("installId") || "";
    const readInstallIdFromUrl = () => {
        if (typeof window === "undefined") return "";
        return new URLSearchParams(window.location.search).get("installId") || "";
    };

    React.useEffect(() => {
        const fromUrl = installIdParam || readInstallIdFromUrl();
        if (fromUrl) {
            localStorage.setItem("passgen-install-id", fromUrl);
        }
    }, [installIdParam]);

    const getInstallId = () =>
        readInstallIdFromUrl() || installIdParam || localStorage.getItem("passgen-install-id") || "";
    const buildPricingUrl = (installId: string) =>
        installId ? `/passgen/pricing?installId=${encodeURIComponent(installId)}` : "/passgen/pricing";
    const openPricing = () => {
        const installId = getInstallId();
        if (installId) {
            localStorage.setItem("passgen-install-id", installId);
        }
        const url = buildPricingUrl(installId);
        if (typeof window !== "undefined") {
            window.location.assign(url);
        } else {
            router.push(url);
        }
    };

    return (
        <section id="pricing" className="py-24 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <Badge className="mb-4">Flexible Pricing</Badge>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Choose Your Plan</h2>
                    <p className="text-slate-400">Secure, offline-first password management for everyone.</p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center mt-8 space-x-4">
                        <span className={`text-sm font-medium ${interval === "MONTH" ? "text-white" : "text-slate-500"}`}>Monthly</span>
                        <button
                            onClick={() => setInterval(interval === "MONTH" ? "YEAR" : "MONTH")}
                            className="relative w-14 h-7 bg-slate-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                        >
                            <span
                                className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform transform ${interval === "YEAR" ? "translate-x-7" : ""
                                    }`}
                            />
                        </button>
                        <span className={`text-sm font-medium ${interval === "YEAR" ? "text-white" : "text-slate-500"}`}>
                            Yearly <span className="text-green-400 text-xs ml-1 font-bold">(Save ~17%)</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {/* Free Plan */}
                    <PricingCard
                        title="FREE"
                        price={interval === "YEAR" ? "$0" : "$0"}
                        sarPrice="0 SAR"
                        description="Offline encrypted vault for personal use."
                        features={[
                            "Offline Encrypted Vault",
                            "Password Generator",
                            "Limit: 4 Stored Passwords",
                            "Limit: 3 Secrets / Day",
                            "No Cloud Backup"
                        ]}
                        buttonText="Download Now"
                        onButtonClick={() => window.open("https://github.com/mDeploys/PassGen/releases/download/v1.0.7/PassGen.Setup.1.0.7.exe", "_blank")}
                    />

                    {/* PRO Plan */}
                    <PricingCard
                        title="PRO"
                        price={interval === "YEAR" ? "$4.67" : "$5.69"} // Original 59/12=4.92, 5.99. 5% off: 56.05/12=4.67, 5.69
                        sarPrice={interval === "YEAR" ? "18.92 SAR" : "23.74 SAR"} // 19.92->18.92, 24.99->23.74
                        originalPrice={interval === "YEAR" ? "$4.92/mo" : "$5.99/mo"}
                        description="Removes all local limits. For power users."
                        features={[
                            "Everything in Free",
                            "Unlimited Vault Storage",
                            "Developer Secret Generator",
                            "Project Folder Selection",
                            ".env Injection",
                            "No Cloud Required"
                        ]}
                        buttonText={interval === "YEAR" ? "Pay $56 / year" : "Pay $5.69 / month"}
                        onButtonClick={openPricing}
                    />

                    {/* CLOUD Plan */}
                    <PricingCard
                        isPopular
                        title="CLOUD"
                        price={interval === "YEAR" ? "$7.04" : "$8.54"} // Original 89/12=7.41, 8.99. 5% off: 84.55/12=7.04, 8.54
                        sarPrice={interval === "YEAR" ? "26.83 SAR" : "36.09 SAR"} // 28.25->26.83, 37.99->36.09
                        originalPrice={interval === "YEAR" ? "$7.42/mo" : "$8.99/mo"}
                        description="Recommended. Encrypted cloud backup."
                        features={[
                            "Everything in PRO",
                            "Google Drive Backup",
                            "Encrypted Cloud Restore",
                            "Dropbox (Coming Soon)",
                            "OneDrive (Coming Soon)"
                        ]}
                        buttonText={interval === "YEAR" ? "Pay $84 / year" : "Pay $8.54 / month"}
                        onButtonClick={openPricing}
                    />

                    {/* POWER Plan */}
                    <PricingCard
                        title="POWER"
                        price={interval === "YEAR" ? "$10.21" : "$12.34"} // Original 129/12=10.75, 12.99. 5% off: 122.55/12=10.21, 12.34
                        sarPrice={interval === "YEAR" ? "39.50 SAR" : "52.24 SAR"} // 41.58->39.50, 54.99->52.24
                        originalPrice={interval === "YEAR" ? "$10.75/mo" : "$12.99/mo"}
                        description="For teams & enterprise. S3 & BYOS."
                        features={[
                            "Everything in CLOUD",
                            "S3-Compatible Storage",
                            "Use AWS, R2, MinIO",
                            "Supabase (Coming Soon)",
                            "Priority Support Badge"
                        ]}
                        buttonText={interval === "YEAR" ? "Pay $122 / year" : "Pay $12.34 / month"}
                        onButtonClick={openPricing}
                    />
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
                <div className="flex justify-center">
                    <MsStoreBadge />
                </div>
                {downloadCount !== null && (
                    <p className="mt-4 text-sm text-slate-400">
                        Join {downloadCount.toLocaleString()} users securing their data
                    </p>
                )}
            </div>
        </section>
    );
}
