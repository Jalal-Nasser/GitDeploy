"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/Button";

// --- Configuration & Data ---
const GITHUB_PROFILE_URL = "https://github.com/Jalal-Nasser";
const trackEvent = (eventName: string, props: Record<string, any> = {}) => {
    if (typeof window !== "undefined" && (window as any).plausible) {
        (window as any).plausible(eventName, { props });
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

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [appsDropdownOpen, setAppsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Projects", href: "/#projects" },
        { name: "How I Build", href: "/#process" },
        { name: "Contact", href: "/#contact" },
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 backdrop-blur-md border-b border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'bg-transparent'}`}>
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
                    {/* Apps Gallery Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setAppsDropdownOpen(true)}
                        onMouseLeave={() => setAppsDropdownOpen(false)}
                    >
                        <button className="flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none">
                            Apps Gallery
                            <ChevronDown className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <AnimatePresence>
                            {appsDropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 mt-2 w-48 rounded-xl bg-slate-900 border border-purple-500/20 shadow-xl overflow-hidden"
                                >
                                    <div className="py-1">
                                        <Link
                                            href="/apps-gallery/passgen"
                                            className="block px-4 py-2 text-sm text-slate-300 hover:bg-purple-900/30 hover:text-white transition-colors"
                                        >
                                            PassGen
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

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
                        className="md:hidden border-b border-slate-800 bg-slate-950 overflow-hidden"
                    >
                        <div className="p-4 flex flex-col gap-4">
                            <div className="text-base font-medium text-slate-300 border-b border-slate-800 pb-2 mb-2">
                                Apps Gallery
                                <Link
                                    href="/apps-gallery/passgen"
                                    className="block mt-2 pl-4 text-sm text-purple-300 hover:text-white"
                                    onClick={() => setIsOpen(false)}
                                >
                                    PassGen
                                </Link>
                            </div>

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

// Re-export specific small components if needed, or keep them internal.
