
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { accounts, sessions, users, verificationTokens } from "./db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens,
    }),
    providers: [Google, GitHub],
    callbacks: {
        session: async ({ session, user }) => {
            if (session?.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
});
