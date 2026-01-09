
import { pgTable, text, timestamp, boolean, uuid, integer, pgEnum, decimal } from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const planEnum = pgEnum("plan", ["FREE", "PRO", "CLOUD", "POWER"]);
export const subscriptionPeriodEnum = pgEnum("subscription_period", ["MONTH", "YEAR"]);
export const paymentStatusEnum = pgEnum("payment_status", ["PENDING", "COMPLETED", "FAILED", "REFUNDED"]);

export const users = pgTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => [
        {
            compoundId: { // Use a unique constraint instead of primaryKey for composite key if preferred, but primaryKey is standard for NextAuth
                columns: [account.provider, account.providerAccountId]
            }
        }
    ]
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => [
        {
            compoundId: {
                columns: [verificationToken.identifier, verificationToken.token]
            }
        }
    ]
);

export const subscriptions = pgTable("subscription", {
    userId: text("userId")
        .primaryKey()
        .references(() => users.id, { onDelete: "cascade" }),
    plan: planEnum("plan").notNull().default("FREE"),
    status: text("status").notNull().default("active"), // active, cancelled, expired
    expiresAt: timestamp("expiresAt", { mode: "date" }),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});

export const payments = pgTable("payment", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    plan: planEnum("plan").notNull(),
    subscriptionPeriod: subscriptionPeriodEnum("subscriptionPeriod").notNull(),
    amountUsd: decimal("amountUsd", { precision: 10, scale: 2 }).notNull(),
    nowpaymentsInvoiceId: text("nowpaymentsInvoiceId"),
    status: paymentStatusEnum("status").notNull().default("PENDING"),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow(),
});
