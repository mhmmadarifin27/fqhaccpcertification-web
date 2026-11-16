import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "fq_admin_token";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

// Ephemeral per-process fallback secret if ADMIN_SESSION_SECRET is not set in host env.
// Never uses a predictable static string so tokens cannot be forged.
const EPHEMERAL_SECRET = crypto.randomBytes(32).toString("hex");

function getSessionSecret(): string {
  const configured = process.env.ADMIN_SESSION_SECRET?.trim();
  if (configured && configured.length >= 16) {
    return configured;
  }
  return EPHEMERAL_SECRET;
}

export interface AdminSessionPayload {
  user: string;
  role: "admin";
  exp: number;
}

function base64UrlEncode(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(input: string): Buffer {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (input.length % 4)) % 4);
  return Buffer.from(padded, "base64");
}

function signData(data: string): string {
  return base64UrlEncode(crypto.createHmac("sha256", getSessionSecret()).update(data).digest());
}

export function createAdminSessionToken(user: string): string {
  const payload: AdminSessionPayload = {
    user,
    role: "admin",
    exp: Date.now() + SESSION_TTL_MS,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signData(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined): AdminSessionPayload | null {
  if (!token || !token.includes(".")) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  if (!encodedPayload || !signature) return null;

  const expectedSignature = signData(encodedPayload);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);

  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(base64UrlDecode(encodedPayload).toString("utf8")) as AdminSessionPayload;
    if (
      parsed &&
      parsed.role === "admin" &&
      typeof parsed.user === "string" &&
      typeof parsed.exp === "number" &&
      parsed.exp > Date.now()
    ) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

export async function getVerifiedAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export function safeEqualString(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

export function getAllowedAdminEmails(): string[] {
  const envEmails = (process.env.ADMIN_ALLOWED_EMAILS || process.env.ADMIN_EMAIL || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (envEmails.length > 0) {
    return envEmails;
  }
  return ["fqhaccpcertification@gmail.com"];
}
