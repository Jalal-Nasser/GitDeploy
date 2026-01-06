"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Check, Shield, ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

declare global {
    interface Window {
        paypal: any;
    }
}

export default function PaymentPage() {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        if (scriptLoaded && window.paypal) {
            window.paypal.HostedButtons({
                hostedButtonId: "DL5XTW4XNFAZ2",
            }).render("#paypal-container-DL5XTW4XNFAZ2");
        }
    }, [scriptLoaded]);

    return (
        <main className="min-h-screen bg-black text-white pt-24 pb-12 relative overflow-hidden flex items-center justify-center">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

            <Script
                src="https://www.paypal.com/sdk/js?client-id=BAACv183c4FyO-spGzpgylI-S9ufmS-aFLJW9lEBaaagKg4SnryZXutVWibE6tXTKQFs9ofvJmcKHgzcng&components=hosted-buttons&disable-funding=venmo&currency=USD"
                onLoad={() => setScriptLoaded(true)}
            />

            <div className="container mx-auto px-4 relative z-10">
                <Link href="/apps-gallery/passgen" className="absolute top-0 left-4 md:left-8 inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg mx-auto"
                >
                    <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-slate-900/50 p-6 border-b border-slate-800 text-center">
                            <Badge className="mb-3 bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20">
                                Secure Checkout
                            </Badge>
                            <h1 className="text-2xl font-bold text-white">Complete Purchase</h1>
                            <p className="text-slate-400 text-sm mt-1">Upgrade to PassGen Premium</p>
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Order Details */}
                            <div className="bg-slate-950/50 rounded-lg p-4 mb-6 border border-slate-800/50">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-300 font-medium">PassGen Premium</span>
                                    <span className="text-white font-bold">$15.00</span>
                                </div>
                                <div className="flex justify-between items-center text-sm text-slate-500">
                                    <span>Billed Annually</span>
                                    <span>/ year</span>
                                </div>
                            </div>

                            {/* Features Summary */}
                            <div className="flex flex-wrap gap-3 mb-8 justify-center">
                                <span className="flex items-center text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                                    <Check className="w-3 h-3 mr-1 text-green-500" /> Unlimited Storage
                                </span>
                                <span className="flex items-center text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                                    <Check className="w-3 h-3 mr-1 text-green-500" /> Cloud Sync
                                </span>
                                <span className="flex items-center text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                                    <Check className="w-3 h-3 mr-1 text-green-500" /> Priority Support
                                </span>
                            </div>

                            {/* Payment Section */}
                            <div className="space-y-4">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-800"></span>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-slate-900 px-2 text-slate-500">Pay with</span>
                                    </div>
                                </div>

                                <div className="min-h-[150px] flex items-center justify-center relative z-10 rounded-lg p-2 bg-white/5">
                                    <div id="paypal-container-DL5XTW4XNFAZ2" className="w-full"></div>
                                    {!scriptLoaded && (
                                        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
                                            <div className="h-10 w-3/4 bg-slate-800 animate-pulse rounded"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                                <Lock className="w-3 h-3" />
                                <span>Payments correspond to <strong>mDeploy</strong></span>
                            </div>
                        </div>
                    </Card>

                    <p className="text-center text-slate-500 text-xs mt-6">
                        By subscribing, you agree to our Terms of Service and Privacy Policy. <br />
                        Subscription renews automatically unless cancelled.
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
