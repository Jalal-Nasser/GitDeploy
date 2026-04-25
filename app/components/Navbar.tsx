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
        { name: "Home", href: "https://mdeploy.dev" },
        { 
            name: "App Store", 
            isDropdown: true,
            children: [
                { name: "PassGen", href: "/passgen" },
                { name: "Let's Pray", href: "/lets-pray" },
            ]
        },
        { name: "Demo", href: "https://passgen.mdeploy.dev/" },
        { name: "Pricing", href: "/passgen#pricing" },
        { name: "Projects", href: "/#projects" },
        { name: "How I Build", href: "/#process" },
        { name: "Support", href: "https://github.com/mDeploys/PassGen/issues" },
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
                    {navLinks.map((link) => (
                        link.isDropdown ? (
                            <div key={link.name} className="relative group" onMouseEnter={() => setAppsDropdownOpen(true)} onMouseLeave={() => setAppsDropdownOpen(false)}>
                                <button className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-[#f959ca] hover:drop-shadow-[0_0_8px_rgba(249,89,202,0.8)] transition-all duration-300">
                                    {link.name} <ChevronDown className="w-4 h-4" />
                                </button>
                                <AnimatePresence>
                                    {appsDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden"
                                        >
                                            <div className="flex flex-col">
                                                {link.children?.map(child => (
                                                    <Link key={child.name} href={child.href} className="px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-[#f959ca] transition-colors" onClick={() => setAppsDropdownOpen(false)}>
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link key={link.name} href={link.href!} className="text-sm font-medium text-slate-300 hover:text-[#f959ca] hover:drop-shadow-[0_0_8px_rgba(249,89,202,0.8)] transition-all duration-300">
                                {link.name}
                            </Link>
                        )
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
                <button className="md:hidden text-slate-300 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
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
                            {navLinks.map((link) => (
                                link.isDropdown ? (
                                    <div key={link.name} className="flex flex-col gap-2">
                                        <span className="text-base font-bold text-white uppercase tracking-wider text-xs pt-2 pb-1">{link.name}</span>
                                        {link.children?.map(child => (
                                            <Link key={child.name} href={child.href} className="text-base font-medium pl-4 text-slate-400 hover:text-[#f959ca] transition-colors" onClick={() => setIsOpen(false)}>
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        key={link.name}
                                        href={link.href!}
                                        className="text-base font-medium text-slate-300 hover:text-[#f959ca] hover:drop-shadow-[0_0_8px_rgba(249,89,202,0.8)] transition-all duration-300"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                )
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
