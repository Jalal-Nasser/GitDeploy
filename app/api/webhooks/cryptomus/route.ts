import { db } from "@/db";
import { payments, subscriptions } from "@/db/schema";
import { createCryptomusWebhookSign } from "@/lib/cryptomus";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const SUCCESS_STATUSES = new Set(["paid", "paid_over"]);
const FAILED_STATUSES = new Set(["fail", "wrong_amount", "cancel", "system_fail"]);

export async function POST(req: Request) {
    try {
        const rawBody = await req.text();
        const paymentApiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY;

        if (!paymentApiKey) {
            return NextResponse.json({ error: "Missing Cryptomus configuration" }, { status: 500 });
        }

        const body = JSON.parse(rawBody);
        const receivedSign = body?.sign;

        if (!receivedSign) {
            return NextResponse.json({ error: "Missing signature" }, { status: 400 });
        }

        const { sign: _unused, ...signedPayload } = body;
        const calculatedSign = createCryptomusWebhookSign(signedPayload, paymentApiKey);

        if (receivedSign !== calculatedSign) {
            console.error("Invalid Cryptomus signature", { received: receivedSign, calculated: calculatedSign });
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        const { order_id, status } = body;

        if (!order_id || !status) {
            return NextResponse.json({ error: "Missing order data" }, { status: 400 });
        }

        console.log(`Cryptomus Webhook: Order ${order_id}, Status ${status}`);

        if (SUCCESS_STATUSES.has(status)) {
            const paymentRecord = await db.query.payments.findFirst({
                where: eq(payments.id, order_id)
            });

            if (!paymentRecord) {
                console.error("Payment record not found for order:", order_id);
                return NextResponse.json({ message: "Record not found" }, { status: 200 });
            }

            await db.update(payments)
                .set({ status: "COMPLETED", updatedAt: new Date() })
                .where(eq(payments.id, order_id));

            const now = new Date();
            const expiresAt = new Date(now);

            if (paymentRecord.subscriptionPeriod === "YEAR") {
                expiresAt.setFullYear(expiresAt.getFullYear() + 1);
            } else {
                expiresAt.setMonth(expiresAt.getMonth() + 1);
            }

            await db.insert(subscriptions)
                .values({
                    userId: paymentRecord.userId,
                    plan: paymentRecord.plan,
                    status: "active",
                    expiresAt: expiresAt,
                    updatedAt: now
                })
                .onConflictDoUpdate({
                    target: subscriptions.userId,
                    set: {
                        plan: paymentRecord.plan,
                        status: "active",
                        expiresAt: expiresAt,
                        updatedAt: now
                    }
                });
        } else if (status === "refund_paid") {
            await db.update(payments)
                .set({ status: "REFUNDED", updatedAt: new Date() })
                .where(eq(payments.id, order_id));
        } else if (FAILED_STATUSES.has(status)) {
            await db.update(payments)
                .set({ status: "FAILED", updatedAt: new Date() })
                .where(eq(payments.id, order_id));
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
