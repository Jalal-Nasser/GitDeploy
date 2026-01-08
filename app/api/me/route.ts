
import { auth } from "@/auth";
import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = session.user;

        // Fetch active subscription
        const sub = await db.query.subscriptions.findFirst({
            where: and(
                eq(subscriptions.userId, user.id),
                eq(subscriptions.status, "active"),
                gt(subscriptions.expiresAt, new Date())
            )
        });

        const currentPlan = sub ? sub.plan : "FREE";
        const isPremium = currentPlan !== "FREE";

        // Feature Flags Logic
        const features = {
            unlimitedVault: isPremium, // PRO+
            devTools: isPremium,       // PRO+
            envInject: isPremium,      // PRO+
            cloudSync: ["CLOUD", "POWER"].includes(currentPlan),
            s3Byos: ["POWER"].includes(currentPlan),
        };

        return NextResponse.json({
            userId: user.id,
            email: user.email,
            plan: currentPlan,
            isPremium: isPremium,
            expiresAt: sub?.expiresAt || null,
            features: features
        });

    } catch (error) {
        console.error("API Me error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
