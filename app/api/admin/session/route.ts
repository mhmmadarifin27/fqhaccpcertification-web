import { NextResponse } from "next/server";
import { getVerifiedAdminSession } from "../../../../lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getVerifiedAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    user: session.user,
  });
}
