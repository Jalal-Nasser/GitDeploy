import { auth } from "@/auth";
import { db } from "@/db";
import { payments } from "@/db/schema";
import { buildCryptomusHeaders, getCryptomusErrorMessage } from "@/lib/cryptomus";
import { NextResponse } from "next/server";
import { z } from "zod";

const checkoutSchema = z.object({
    plan: z.enum(["PRO", "CLOUD", "POWER"]),
    interval: z.enum(["MONTH", "YEAR"]),
    installId: z.string().optional(),
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

        const { plan, interval, installId } = result.data;
        const originalAmount = PRICES[plan][interval];
        const amount = Number((originalAmount * 0.95).toFixed(2));
        const orderId = crypto.randomUUID();
        const installTag = installId ? ` | Install ID: ${installId}` : "";

        const appUrl = process.env.NEXTAUTH_URL || process.env.AUTH_URL;
        const merchantId = process.env.CRYPTOMUS_MERCHANT_ID;
        const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY;
        const apiBase = process.env.CRYPTOMUS_API_BASE || "https://api.cryptomus.com";

        if (!appUrl || !merchantId || !apiKey) {
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const invoicePayload = {
            amount: amount.toFixed(2),
            currency: "USD",
            order_id: orderId,
            additional_data: `PassGen ${plan} Plan (${interval})${installTag}`,
            url_callback: `${appUrl}/api/webhooks/cryptomus`,
            url_success: `${appUrl}/passgen/pricing?success=true${installId ? `&installId=${encodeURIComponent(installId)}` : ""}`,
            url_return: `${appUrl}/passgen/pricing?canceled=true${installId ? `&installId=${encodeURIComponent(installId)}` : ""}`,
        };

        const invoiceResponse = await fetch(`${apiBase}/v1/payment`, {
            method: "POST",
            headers: buildCryptomusHeaders(invoicePayload, merchantId, apiKey),
            body: JSON.stringify(invoicePayload),
        });

        const invoiceResponseBody = await invoiceResponse.json().catch(() => null);

        if (!invoiceResponse.ok || invoiceResponseBody?.state !== 0) {
            const errorMessage = getCryptomusErrorMessage(invoiceResponseBody);
            console.error("Cryptomus Error:", invoiceResponseBody);
            return NextResponse.json({ error: errorMessage }, { status: 502 });
        }

        const invoiceData = invoiceResponseBody?.result;

        if (!invoiceData?.uuid || !invoiceData?.url) {
            console.error("Cryptomus Error: Missing invoice data", invoiceResponseBody);
            return NextResponse.json({ error: "Failed to create invoice" }, { status: 502 });
        }

        await db.insert(payments).values({
            id: orderId,
            userId: session.user.id,
            plan: plan,
            subscriptionPeriod: interval,
            amountUsd: amount.toString(),
            cryptomusInvoiceUuid: invoiceData.uuid,
            status: "PENDING",
        });

        return NextResponse.json({ payment_url: invoiceData.url, invoice_id: invoiceData.uuid });

    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
