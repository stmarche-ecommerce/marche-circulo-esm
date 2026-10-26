import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, verifySessionCookieValue } from "@/lib/server/session";

export const runtime = "nodejs";

export async function GET() {
  const session = await verifySessionCookieValue((await cookies()).get(SESSION_COOKIE_NAME)?.value);

  return NextResponse.json({ user: session?.user ?? null }, { headers: { "Cache-Control": "no-store" } });
}
