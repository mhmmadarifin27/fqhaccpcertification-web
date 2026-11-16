import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAllowedAdminEmails,
  safeEqualString,
} from "../../../../lib/adminAuth";

export const dynamic = "force-dynamic";

// Simple in-memory brute-force protection per IP
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 15 * 60 * 1000;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        authenticated: false,
        error: "Terlalu banyak percobaan login gagal. Coba lagi dalam 15 menit.",
      },
      { status: 429 }
    );
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { authenticated: false, error: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }

  const cleanUser = typeof body.username === "string" ? body.username.trim() : "";
  const cleanPass = typeof body.password === "string" ? body.password.trim() : "";

  if (!cleanUser || !cleanPass) {
    return NextResponse.json(
      { authenticated: false, error: "Silakan isi username/email dan password." },
      { status: 400 }
    );
  }

  let authenticatedUser: string | null = null;
  let supabaseSession: { access_token: string; refresh_token: string } | null = null;

  const allowedEmails = getAllowedAdminEmails();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 1. Verify against Supabase Auth (only allow accounts with admin role or explicit admin email allowlist)
  if (supabaseUrl && supabaseAnonKey) {
    try {
      const serverSupabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });

      const emailCandidate = cleanUser.includes("@")
        ? cleanUser.toLowerCase()
        : (process.env.ADMIN_EMAIL || "fqhaccpcertification@gmail.com").toLowerCase();

      const { data, error } = await serverSupabase.auth.signInWithPassword({
        email: emailCandidate,
        password: cleanPass,
      });

      if (!error && data?.user) {
        const userEmail = (data.user.email || "").toLowerCase();
        const isExplicitAdminRole = data.user.app_metadata?.role === "admin";
        const isAllowedAdminEmail = allowedEmails.includes(userEmail);

        if (isExplicitAdminRole || isAllowedAdminEmail) {
          authenticatedUser = data.user.email || emailCandidate;
          if (data.session) {
            supabaseSession = {
              access_token: data.session.access_token,
              refresh_token: data.session.refresh_token,
            };
          }
        } else {
          // Authenticated in Supabase as a regular/non-admin user -> explicitly reject!
          recordFailedAttempt(ip);
          return NextResponse.json(
            { authenticated: false, error: "Akun ini tidak memiliki hak akses administrator." },
            { status: 403 }
          );
        }
      }
    } catch (err) {
      console.warn("Supabase server auth check warning:", err);
    }
  }

  // 2. Verify against server-only environment admin credentials (if configured)
  if (!authenticatedUser) {
    const envPass = process.env.ADMIN_PASSWORD?.trim();
    const envUsername = (process.env.ADMIN_USERNAME || "admin").trim().toLowerCase();
    const envEmail = (process.env.ADMIN_EMAIL || "fqhaccpcertification@gmail.com").trim().toLowerCase();

    if (envPass && envPass.length > 0) {
      const lowerInputUser = cleanUser.toLowerCase();
      const userMatches =
        safeEqualString(lowerInputUser, envUsername) ||
        safeEqualString(lowerInputUser, envEmail);
      const passMatches = safeEqualString(cleanPass, envPass);

      if (userMatches && passMatches) {
        authenticatedUser = lowerInputUser === envEmail ? envEmail : envUsername;
      }
    }
  }

  if (!authenticatedUser) {
    recordFailedAttempt(ip);
    return NextResponse.json(
      { authenticated: false, error: "Email / Username atau Password salah." },
      { status: 401 }
    );
  }

  // Clear failed attempts on valid login
  loginAttempts.delete(ip);

  const token = createAdminSessionToken(authenticatedUser);
  const proto = request.headers.get("x-forwarded-proto") || new URL(request.url).protocol.replace(":", "");
  const isHttps = proto === "https";

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isHttps,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return NextResponse.json({
    authenticated: true,
    user: authenticatedUser,
    supabaseSession,
  });
}
