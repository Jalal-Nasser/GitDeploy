import crypto from "crypto";

export function escapeJsonSlashes(value: string) {
    return value.replace(/\//g, "\\/");
}

export function createCryptomusRequestSign(body: string, apiKey: string) {
    return crypto.createHash("md5").update(Buffer.from(body).toString("base64") + apiKey).digest("hex");
}

export function createCryptomusWebhookSign(payload: unknown, apiKey: string) {
    const json = escapeJsonSlashes(JSON.stringify(payload));
    return crypto.createHash("md5").update(Buffer.from(json).toString("base64") + apiKey).digest("hex");
}

export function buildCryptomusHeaders(body: string, merchantId: string, apiKey: string) {
    return {
        merchant: merchantId,
        sign: createCryptomusRequestSign(body, apiKey),
        "Content-Type": "application/json",
    };
}

export function getCryptomusErrorMessage(payload: unknown) {
    if (!payload || typeof payload !== "object") {
        return "Unexpected Cryptomus response";
    }

    if ("message" in payload && typeof payload.message === "string") {
        return payload.message;
    }

    if ("errors" in payload && payload.errors && typeof payload.errors === "object") {
        for (const value of Object.values(payload.errors)) {
            if (Array.isArray(value) && typeof value[0] === "string") {
                return value[0];
            }
        }
    }

    return "Unexpected Cryptomus response";
}
