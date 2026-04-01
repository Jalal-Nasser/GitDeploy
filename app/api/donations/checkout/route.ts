import { buildCryptomusHeaders, getCryptomusErrorMessage, resolveAppUrl } from "@/lib/cryptomus";
import { NextResponse } from "next/server";
import { z } from "zod";

const donationSchema = z.object({
    amount: z.coerce.number().positive().max(100000),
    source: z.string().trim().max(64).optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = donationSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid donation amount" }, { status: 400 });
        }

        const amount = Number(result.data.amount.toFixed(2));

        if (amount < 1) {
            return NextResponse.json({ error: "Minimum donation is $1.00" }, { status: 400 });
        }

        const appUrl = process.env.NEXTAUTH_URL || process.env.AUTH_URL || resolveAppUrl(req);
        const merchantId = process.env.CRYPTOMUS_MERCHANT_ID;
        const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY;
        const apiBase = process.env.CRYPTOMUS_API_BASE || "https://api.cryptomus.com";

        const missingConfig = [
            !appUrl ? "APP_URL" : null,
            !merchantId ? "CRYPTOMUS_MERCHANT_ID" : null,
            !apiKey ? "CRYPTOMUS_PAYMENT_API_KEY" : null,
        ].filter(Boolean);

        if (missingConfig.length > 0) {
            console.error("Missing Cryptomus donation configuration:", missingConfig);
            return NextResponse.json({ error: `Missing configuration: ${missingConfig.join(", ")}` }, { status: 500 });
        }

        const orderId = `donation_${crypto.randomUUID().replace(/-/g, "_")}`;
        const source = result.data.source ? ` | Source: ${result.data.source}` : "";

        const invoicePayload = {
            amount: amount.toFixed(2),
            currency: "USD",
            order_id: orderId,
            additional_data: `LetsPray donation${source}`,
            url_success: `${appUrl}/lets-pray?donation=success`,
            url_return: `${appUrl}/lets-pray?donation=canceled`,
        };
        const invoiceBody = JSON.stringify(invoicePayload);

        const invoiceResponse = await fetch(`${apiBase}/v1/payment`, {
            method: "POST",
            headers: buildCryptomusHeaders(invoiceBody, merchantId, apiKey),
            body: invoiceBody,
        });

        const invoiceResponseBody = await invoiceResponse.json().catch(() => null);

        if (!invoiceResponse.ok || invoiceResponseBody?.state !== 0) {
            const errorMessage = getCryptomusErrorMessage(invoiceResponseBody);
            console.error("Cryptomus Donation Error:", invoiceResponseBody);
            return NextResponse.json({ error: errorMessage }, { status: 502 });
        }

        const invoiceData = invoiceResponseBody?.result;

        if (!invoiceData?.uuid || !invoiceData?.url) {
            console.error("Cryptomus Donation Error: Missing invoice data", invoiceResponseBody);
            return NextResponse.json({ error: "Failed to create donation invoice" }, { status: 502 });
        }

        return NextResponse.json({
            payment_url: invoiceData.url,
            invoice_id: invoiceData.uuid,
        });
    } catch (error) {
        console.error("Donation checkout error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
