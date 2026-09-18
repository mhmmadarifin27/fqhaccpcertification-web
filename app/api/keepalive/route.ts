import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const timestamp = new Date().toISOString();

  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json({
      status: "warning",
      message: "Supabase environment variables not configured on this host",
      timestamp,
    });
  }

  try {
    // Perform a lightweight query to keep Supabase active and prevent 7-day inactivity pause
    const { data, error } = await supabase
      .from("team")
      .select("id")
      .limit(1);

    if (error) {
      return NextResponse.json({
        status: "alive",
        message: "Supabase contacted (ping active)",
        error: error.message,
        timestamp,
      });
    }

    return NextResponse.json({
      status: "ok",
      message: "Supabase pinged successfully. 7-day inactivity timer reset.",
      dataCount: data?.length ?? 0,
      timestamp,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        status: "error",
        message: errorMessage,
        timestamp,
      },
      { status: 500 }
    );
  }
}
