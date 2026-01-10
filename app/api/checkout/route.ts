
import { auth } from "@/auth";
import { db } from "@/db";
import { payments, planEnum, subscriptionPeriodEnum } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const checkoutSchema = z.object({
    plan: z.enum(["PRO", "CLOUD", "POWER"]),
    interval: z.enum(["MONTH", "YEAR"]),
});

const PRICES = {
    PRO: { MONTH: 5.99, YEAR: 59.00 },
    CLOUD: { MONTH: 8.99, YEAR: 89.00 },
    POWER: { MONTH: 12.99, YEAR: 129.00 },
};

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const result = checkoutSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
        }

        const { plan, interval } = result.data;
        const originalAmount = PRICES[plan][interval];
        const amount = Number((originalAmount * 0.95).toFixed(2)); // Apply 5% discount
        const orderId = crypto.randomUUID();

        // NowPayments API: Create Invoice
        // Docs: https://documenter.getpostman.com/view/7928850/SzRxUm6b?version=latest#3c16223e-1088-4660-844c-9743a4115f5d
        // Using /v1/invoice endpoint for simple checkout
        const apiKey = process.env.NOWPAYMENTS_API_KEY;
        const apiBase = process.env.NOWPAYMENTS_API_BASE || "https://api.nowpayments.io/v1";

        if (!apiKey) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const invoiceResponse = await fetch(`${apiBase}/invoice`, {
            method: "POST",
            headers: {
                "x-api-key": apiKey,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                price_amount: amount,
                price_currency: "usd",
                order_id: orderId,
                order_description: `PassGen ${plan} Plan (${interval})`,
                ipn_callback_url: `${process.env.NEXTAUTH_URL}/api/webhooks/nowpayments`,
                success_url: `${process.env.NEXTAUTH_URL}/passgen/pricing?success=true`,
                cancel_url: `${process.env.NEXTAUTH_URL}/passgen/pricing?canceled=true`,
            }),
        });

        if (!invoiceResponse.ok) {
            const errorText = await invoiceResponse.text();
            console.error("NowPayments Error:", errorText);
            return NextResponse.json({ error: "Failed to create invoice" }, { status: 502 });
        }

        const invoiceData = await invoiceResponse.json();

        // Record pending payment
        await db.insert(payments).values({
            id: orderId,
            userId: session.user.id,
            plan: plan,
            subscriptionPeriod: interval,
            amountUsd: amount.toString(),
            nowpaymentsInvoiceId: invoiceData.id,
            status: "PENDING",
        });

        return NextResponse.json({ payment_url: invoiceData.invoice_url, invoice_id: invoiceData.id });

    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
