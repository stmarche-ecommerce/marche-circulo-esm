import { NextResponse } from "next/server";
import { z } from "zod";

import { isValidCpf, mapLoginResponseToSession } from "@/lib/auth-login";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { guardRequest, jsonError, readJsonBody } from "@/lib/server/request-guards";
import { createSessionCookieValue, SESSION_COOKIE_NAME, sessionCookieOptions } from "@/lib/server/session";
import { callUsersApi, readJsonSafely } from "@/lib/server/users-api";

export const runtime = "nodejs";

const loginSchema = z.object({
  username: z.string().regex(/^\d{11}$/).refine(isValidCpf),
  password: z.string().min(1).max(200),
});

const INVALID_CREDENTIALS = "CPF ou senha invalidos.";
const LOGIN_UNAVAILABLE = "Servico de login indisponivel.";

export async function POST(request: Request) {
  const blocked = guardRequest(request, { scope: "login", limit: 20, windowMs: 15 * 60_000 });
  if (blocked) return blocked;

  const parsed = loginSchema.safeParse(await readJsonBody(request));
  if (!parsed.success) {
    return jsonError(INVALID_CREDENTIALS, 400);
  }

  const { username, password } = parsed.data;

  // Limita tentativas por CPF para dificultar forca bruta distribuida.
  if (!checkRateLimit(`login:cpf:${username}`, 5, 15 * 60_000).ok) {
    return jsonError("Muitas tentativas. Aguarde um instante e tente novamente.", 429);
  }

  try {
    const upstream = await callUsersApi("/users-v2/login", { method: "POST", body: { username, password } });

    if (!upstream) {
      return jsonError(LOGIN_UNAVAILABLE, 500);
    }

    if (!upstream.ok) {
      const isClientError = upstream.status >= 400 && upstream.status < 500;
      return isClientError ? jsonError(INVALID_CREDENTIALS, 401) : jsonError(LOGIN_UNAVAILABLE, 502);
    }

    const data = (await readJsonSafely(upstream)) as { token?: unknown } | null;
    const { user } = mapLoginResponseToSession(data, { cpf: username });

    if (!user.id) {
      return jsonError(LOGIN_UNAVAILABLE, 502);
    }

    const token = typeof data?.token === "string" ? data.token : undefined;
    const response = NextResponse.json({ success: true, user }, { headers: { "Cache-Control": "no-store" } });

    response.cookies.set(SESSION_COOKIE_NAME, await createSessionCookieValue({ user, token }), sessionCookieOptions);

    return response;
  } catch (error) {
    console.error("[api/auth/login] falha", { error: error instanceof Error ? error.message : String(error) });
    return jsonError(LOGIN_UNAVAILABLE, 502);
  }
}
