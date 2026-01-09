"use client";

import React, { Suspense } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Github, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function SignInContent() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [isLoading, setIsLoading] = React.useState<string | null>(null);

    const handleSignIn = async (provider: "google" | "github") => {
        setIsLoading(provider);
        await signIn(provider, { callbackUrl });
    };

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-md px-4">
                <Link href="/" className="absolute top-8 left-8 inline-flex items-center text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-8">
                        <div className="relative w-16 h-16 mx-auto mb-6">
                            <Image
                                src="/logo.png"
                                alt="mDeploy Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-slate-400">Sign in to access your dashboard and apps.</p>
                    </div>

                    <Card className="p-8 border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
                        <div className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full h-12 text-base justify-center gap-3 border-slate-700 hover:bg-slate-800 hover:text-white bg-transparent"
                                onClick={() => handleSignIn("google")}
                                disabled={!!isLoading}
                            >
                                {isLoading === "google" ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                            fill="#EA4335"
                                        />
                                    </svg>
                                )}
                                Sign in with Google
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full h-12 text-base justify-center gap-3 border-slate-700 hover:bg-slate-800 hover:text-white bg-transparent"
                                onClick={() => handleSignIn("github")}
                                disabled={!!isLoading}
                            >
                                {isLoading === "github" ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Github className="w-5 h-5" />
                                )}
                                Sign in with GitHub
                            </Button>
                        </div>

                        <div className="mt-6 text-center text-xs text-slate-500">
                            By signing in, you agree to our <a href="#" className="underline hover:text-slate-400">Terms of Service</a> and <a href="#" className="underline hover:text-slate-400">Privacy Policy</a>.
                        </div>
                    </Card>
                </motion.div>
            </div>
        </main>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}
