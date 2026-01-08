
"use client";

import React, { useState } from "react";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Check, X, Info, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);
    const { data: session } = useSession();
    const router = useRouter();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handleCheckout = async (plan: string) => {
        if (!session) {
            signIn(); // Opens the provider selection page (Google, GitHub)
            return;
        }

        setLoadingPlan(plan);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    plan,
                    interval: isAnnual ? "YEAR" : "MONTH"
                })
            });

            const data = await res.json();
            if (data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                alert("Checkout failed: " + (data.error || "Unknown error"));
            }
        } catch (e) {
            console.error(e);
            alert("An error occurred. Please try again.");
        } finally {
            setLoadingPlan(null);
        }
    };

    const plans = [
        {
            id: "FREE",
            name: "Free",
            price: "$0",
            period: isAnnual ? "/year" : "/month",
            desc: "Essential local security",
            features: [
                "Encrypted local vault (4 passwords)",
                "Developer secrets: 3/day",
                "Base64URL only",
                "No cloud sync"
            ],
            cta: "Download Windows App",
            action: () => window.open(process.env.APP_DOWNLOAD_URL || "https://github.com/Jalal-Nasser/PassGen/releases/latest", "_blank"),
            popular: false
        },
        {
            id: "PRO",
            name: "Pro",
            price: isAnnual ? "$59" : "$5.99",
            period: isAnnual ? "/year" : "/month",
            desc: "For individual developers",
            features: [
                "Unlimited local passwords",
                "Unlimited Secret Generator",
                "Hex + .env export",
                "Local vault snapshots"
            ],
            cta: "Pay with Crypto",
            action: () => handleCheckout("PRO"),
            popular: true
        },
        {
            id: "CLOUD",
            name: "Cloud",
            price: isAnnual ? "$89" : "$8.99",
            period: isAnnual ? "/year" : "/month",
            desc: "Cross-device sync & backup",
            features: [
                "Everything in PRO",
                "Google Drive Sync",
                "Encrypted cloud snapshots",
                "Cross-device restore"
            ],
            cta: "Pay with Crypto",
            action: () => handleCheckout("CLOUD"),
            popular: false
        },
        {
            id: "POWER",
            name: "Power",
            price: isAnnual ? "$129" : "$12.99",
            period: isAnnual ? "/year" : "/month",
            desc: "Bring Your Own Storage",
            features: [
                "Everything in CLOUD",
                "S3-compatible storage (AWS, R2)",
                "DigitalOcean / MinIO support",
                "Priority Support"
            ],
            cta: "Pay with Crypto",
            action: () => handleCheckout("POWER"),
            popular: false
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground pt-24 pb-20">
            <div className="container mx-auto px-4 relative">
                <Link href="/apps-gallery/passgen" className="absolute top-0 left-4 md:left-0 inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Overview
                </Link>

                <div className="text-center mb-12">
                    <Badge className="mb-4">Pricing</Badge>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Choose Your Plan</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                        Secure your data with the plan that fits your workflow.
                    </p>

                    {/* Toggle */}
                    <div className="inline-flex items-center bg-slate-900/50 rounded-full p-1 border border-slate-800">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isAnnual ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isAnnual ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Yearly <span className="text-xs ml-1 opacity-75">(Save ~17%)</span>
                        </button>
                    </div>
                </div>

                {/* Plan Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
                    {plans.map((plan) => (
                        <Card key={plan.id} className={`p-6 flex flex-col relative ${plan.popular ? 'border-purple-500 bg-purple-900/10' : 'border-slate-800 bg-slate-950/50'}`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                    RECOMMENDED
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                            <div className="mb-4">
                                <span className="text-3xl font-bold text-white">{plan.price}</span>
                                <span className="text-slate-500 text-sm">{plan.period}</span>
                            </div>
                            <p className="text-slate-400 text-sm mb-6">{plan.desc}</p>

                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                        <Check className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.popular ? "primary" : "outline"}
                                className="w-full"
                                onClick={plan.action}
                                disabled={loadingPlan === plan.id}
                            >
                                {loadingPlan === plan.id ? "Processing..." : plan.cta}
                            </Button>
                        </Card>
                    ))}
                </div>

                {/* Comparison Table */}
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-white mb-8 text-center">Compare Features</h2>
                    <div className="overflow-x-auto bg-slate-950/30 rounded-xl border border-slate-800/50 p-6">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 text-slate-400 font-medium border-b border-slate-800">Feature</th>
                                    <th className="p-4 text-white font-bold border-b border-slate-800 text-center">Free</th>
                                    <th className="p-4 text-purple-400 font-bold border-b border-slate-800 text-center">Pro</th>
                                    <th className="p-4 text-blue-400 font-bold border-b border-slate-800 text-center">Cloud</th>
                                    <th className="p-4 text-orange-400 font-bold border-b border-slate-800 text-center">Power</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                                {/* Section: Vault */}
                                <tr><td colSpan={5} className="p-4 bg-slate-900/30 text-xs font-bold text-slate-500 uppercase tracking-wider">Vault & Security</td></tr>
                                <FeatureRow name="Local Encrypted Vault" free={true} pro={true} cloud={true} power={true} />
                                <FeatureRow name="Password Limit" free="4 Passwords" pro="Unlimited" cloud="Unlimited" power="Unlimited" />
                                <FeatureRow name="AES-256 Encryption" free={true} pro={true} cloud={true} power={true} />
                                <FeatureRow name="Snapshots & Rollback" free={false} pro={true} cloud={true} power={true} />
                                <FeatureRow name="Portable USB Mode" free={false} pro={true} cloud={true} power={true} />

                                {/* Section: Developer Tools */}
                                <tr><td colSpan={5} className="p-4 bg-slate-900/30 text-xs font-bold text-slate-500 uppercase tracking-wider">Developer Tools</td></tr>
                                <FeatureRow name="Secret Generator" free="3/day" pro="Unlimited" cloud="Unlimited" power="Unlimited" />
                                <FeatureRow name="Formats" free="Base64URL" pro="Base64, Hex, Env" cloud="All" power="All" />
                                <FeatureRow name=".env Injection" free={false} pro={true} cloud={true} power={true} />
                                <FeatureRow name="Project Isolation" free={false} pro={true} cloud={true} power={true} />

                                {/* Section: Cloud & Sync */}
                                <tr><td colSpan={5} className="p-4 bg-slate-900/30 text-xs font-bold text-slate-500 uppercase tracking-wider">Cloud & Storage</td></tr>
                                <FeatureRow name="Cloud Sync" free={false} pro={false} cloud={true} power={true} />
                                <FeatureRow name="Google Drive" free={false} pro={false} cloud={true} power={true} />
                                <FeatureRow name="Dropbox / OneDrive" free={false} pro={false} cloud="Soon" power="Soon" />
                                <FeatureRow name="S3 Compatible (AWS/R2)" free={false} pro={false} cloud={false} power={true} />
                                <FeatureRow name="BYOB Supabase" free={false} pro={false} cloud={false} power="Soon" />

                                {/* Section: Support */}
                                <tr><td colSpan={5} className="p-4 bg-slate-900/30 text-xs font-bold text-slate-500 uppercase tracking-wider">Support</td></tr>
                                <FeatureRow name="Community Support" free={true} pro={true} cloud={true} power={true} />
                                <FeatureRow name="Priority Email" free={false} pro={false} cloud={true} power={true} />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}

function FeatureRow({ name, free, pro, cloud, power }: { name: string, free: boolean | string, pro: boolean | string, cloud: boolean | string, power: boolean | string }) {
    const renderCell = (val: boolean | string) => {
        if (typeof val === "boolean") {
            return val ? <Check className="w-5 h-5 mx-auto text-green-500" /> : <span className="block text-center text-slate-600">—</span>;
        }
        return <span className="block text-center">{val}</span>;
    };

    return (
        <tr className="hover:bg-white/5 transition-colors">
            <td className="p-4 font-medium">{name}</td>
            <td className="p-4">{renderCell(free)}</td>
            <td className="p-4">{renderCell(pro)}</td>
            <td className="p-4">{renderCell(cloud)}</td>
            <td className="p-4">{renderCell(power)}</td>
        </tr>
    );
}
