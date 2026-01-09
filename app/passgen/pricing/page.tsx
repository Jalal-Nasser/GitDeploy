"use client";

import React, { useState } from "react";
import { Badge } from "../../components/ui/Badge";
import { PricingCard } from "../../components/ui/PricingCard";
import { ComparisonTable } from "../../components/ui/ComparisonTable";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PricingPage() {
    const [interval, setInterval] = useState<"MONTH" | "YEAR">("YEAR");
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const router = useRouter();

    const handleCheckout = async (plan: string) => {
        try {
            setLoadingPlan(plan);
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan, interval }),
            });

            if (response.status === 401) {
                router.push("/api/auth/signin?callbackUrl=/passgen/pricing");
                return;
            }

            const data = await response.json();

            if (data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                console.error("Checkout failed:", data.error);
                alert(`Checkout failed: ${data.error || "Please try again."}`);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-20 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <Link href="/passgen" className="absolute top-0 left-4 md:left-8 inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to PassGen
                </Link>

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <Badge className="mb-4">Flexible Pricing</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6">
                        Choose the perfect plan for you
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Secure, offline-first password management for everyone. Upgrade for unlimited storage, cloud sync, and developer tools.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center mt-10 space-x-4">
                        <span className={`text-sm font-medium ${interval === "MONTH" ? "text-white" : "text-slate-500"}`}>Monthly</span>
                        <button
                            onClick={() => setInterval(interval === "MONTH" ? "YEAR" : "MONTH")}
                            className="relative w-14 h-7 bg-slate-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
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

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
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
                        onButtonClick={() => router.push("/passgen")} // Redirect to download/main page
                    />

                    {/* PRO Plan */}
                    <PricingCard
                        title="PRO"
                        price={interval === "YEAR" ? "$4.92" : "$5.99"} // 59/12 approx 4.92
                        sarPrice={interval === "YEAR" ? "19.92 SAR" : "24.99 SAR"} // 239/12 approx 19.91
                        description="Removes all local limits. For power users."
                        features={[
                            "Everything in Free",
                            "Unlimited Vault Storage",
                            "Developer Secret Generator",
                            "Project Folder Selection",
                            ".env Injection",
                            "No Cloud Required"
                        ]}
                        buttonText={interval === "YEAR" ? "Pay $59 / year" : "Pay $5.99 / month"}
                        onButtonClick={() => handleCheckout("PRO")}
                        isLoading={loadingPlan === "PRO"}
                    />

                    {/* CLOUD Plan */}
                    <PricingCard
                        isPopular
                        title="CLOUD"
                        price={interval === "YEAR" ? "$7.42" : "$8.99"} // 89/12
                        sarPrice={interval === "YEAR" ? "28.25 SAR" : "37.99 SAR"} // 339/12
                        description="Recommended. Encrypted cloud backup & restore."
                        features={[
                            "Everything in PRO",
                            "Google Drive Backup",
                            "Encrypted Cloud Restore",
                            "Dropbox (Coming Soon)",
                            "OneDrive (Coming Soon)"
                        ]}
                        buttonText={interval === "YEAR" ? "Pay $89 / year" : "Pay $8.99 / month"}
                        onButtonClick={() => handleCheckout("CLOUD")}
                        isLoading={loadingPlan === "CLOUD"}
                    />

                    {/* POWER Plan */}
                    <PricingCard
                        title="POWER"
                        price={interval === "YEAR" ? "$10.75" : "$12.99"} // 129/12
                        sarPrice={interval === "YEAR" ? "41.58 SAR" : "54.99 SAR"} // 499/12
                        description="For teams & enterprise. S3 & BYOS storage."
                        features={[
                            "Everything in CLOUD",
                            "S3-Compatible Storage",
                            "Use AWS, R2, MinIO, etc.",
                            "Supabase (Coming Soon)",
                            "Priority Support Badge"
                        ]}
                        buttonText={interval === "YEAR" ? "Pay $129 / year" : "Pay $12.99 / month"}
                        onButtonClick={() => handleCheckout("POWER")}
                        isLoading={loadingPlan === "POWER"}
                    />
                </div>

                {/* Feature Comparison */}
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Compare Features</h2>
                        <p className="text-slate-400">Detailed breakdown of what's included in each plan.</p>
                    </div>

                    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 md:p-8 backdrop-blur-sm overflow-hidden">
                        <ComparisonTable />
                    </div>

                    <div className="mt-8 text-center text-slate-500 text-sm">
                        <p className="flex items-center justify-center gap-2 mb-2">
                            <Shield className="w-4 h-4" />
                            Secure crypto payments powered by NowPayments.
                        </p>
                        <p>Prices in SAR are approximate and subject to exchange rates.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
