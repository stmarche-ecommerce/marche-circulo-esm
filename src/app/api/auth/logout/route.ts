import { NextResponse } from "next/server";

import { guardRequest } from "@/lib/server/request-guards";
import { SESSION_COOKIE_NAME, sessionCookieOptions } from "@/lib/server/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const blocked = guardRequest(request, { scope: "logout", limit: 60, windowMs: 60_000 });
  if (blocked) return blocked;

  const response = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(SESSION_COOKIE_NAME, "", { ...sessionCookieOptions, maxAge: 0 });

  return response;
}
