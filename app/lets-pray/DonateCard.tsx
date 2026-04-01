"use client";

import { Heart, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function DonateCard() {
    const [amount, setAmount] = useState("10");
    const [donationState, setDonationState] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setDonationState(params.get("donation"));
    }, []);

    const handleDonate = async () => {
        setError(null);
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/donations/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount,
                    source: "lets-pray-page",
                }),
            });

            const data = await response.json().catch(() => null);

            if (!response.ok || !data?.payment_url) {
                setError(data?.error || "Unable to start donation checkout.");
                setIsSubmitting(false);
                return;
            }

            window.location.href = data.payment_url;
        } catch (checkoutError) {
            console.error("Donation checkout failed:", checkoutError);
            setError("Unable to start donation checkout.");
            setIsSubmitting(false);
        }
    };

    const statusMessage =
        donationState === "success"
            ? "Donation completed. Thank you for supporting LetsPray."
            : donationState === "canceled"
                ? "Donation checkout was canceled before payment completed."
                : null;

    const statusClassName =
        donationState === "success"
            ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
            : donationState === "canceled"
                ? "border-amber-500/25 bg-amber-500/10 text-amber-100"
                : "border-transparent bg-transparent text-transparent";

    return (
        <section className="mb-28">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-emerald-500/20 bg-slate-950/65 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.45)] backdrop-blur-xl md:p-10">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
                            <Heart className="h-4 w-4" />
                            Support LetsPray
                        </div>
                        <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                            Help keep the app improving
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                            If LetsPray helps you stay on time with your prayers, you can support ongoing updates with a crypto donation. Set any amount in USD and complete the payment through Cryptomus.
                        </p>
                        <p className="mt-3 text-sm text-slate-400">
                            Minimum checkout is $1.00. Cryptomus may enforce higher minimums for some cryptocurrencies at payment time.
                        </p>

                        <div
                            aria-live="polite"
                            className={`mt-5 min-h-[52px] rounded-2xl border px-4 py-3 text-sm transition ${statusClassName}`}
                        >
                            {statusMessage ?? ""}
                        </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-emerald-500/15 bg-black/30 p-5">
                        <label className="block text-sm font-medium text-slate-200" htmlFor="donation-amount">
                            Donation amount (USD)
                        </label>
                        <div className="mt-3 flex items-center rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
                            <span className="mr-3 text-sm font-semibold text-emerald-300">$</span>
                            <input
                                id="donation-amount"
                                type="number"
                                inputMode="decimal"
                                min="1"
                                step="0.01"
                                value={amount}
                                onChange={(event) => setAmount(event.target.value)}
                                className="w-full bg-transparent text-lg font-semibold text-white outline-none placeholder:text-slate-500"
                                placeholder="10.00"
                            />
                        </div>

                        {error ? (
                            <p className="mt-3 text-sm text-rose-300">{error}</p>
                        ) : null}

                        <button
                            type="button"
                            onClick={handleDonate}
                            disabled={isSubmitting}
                            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-base font-semibold text-white shadow-[0_0_24px_rgba(16,185,129,0.35)] transition hover:from-emerald-500 hover:to-teal-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Heart className="mr-2 h-5 w-5" />}
                            Donate with Cryptomus
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
