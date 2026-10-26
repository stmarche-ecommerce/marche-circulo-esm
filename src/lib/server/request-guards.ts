import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/server/rate-limit";

/** No Cloud Run o ultimo valor de x-forwarded-for e o IP real do cliente. */
export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const lastHop = forwardedFor?.split(",").at(-1)?.trim();

  return lastHop || "unknown";
}

function isSameOrigin(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return false;
  }

  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function jsonError(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ success: false, message }, { status, headers });
}

interface GuardOptions {
  /** Prefixo da chave do limite (ex.: "login"). */
  scope: string;
  limit: number;
  windowMs: number;
}

/** Valida origem (CSRF) e aplica rate limit por IP. Retorna uma resposta se bloqueado. */
export function guardRequest(request: Request, { scope, limit, windowMs }: GuardOptions) {
  if (!isSameOrigin(request)) {
    return jsonError("Origem nao permitida.", 403);
  }

  const result = checkRateLimit(`${scope}:ip:${getClientIp(request)}`, limit, windowMs);

  if (!result.ok) {
    return jsonError("Muitas tentativas. Aguarde um instante e tente novamente.", 429, {
      "Retry-After": String(result.retryAfterSeconds),
    });
  }

  return null;
}

/** Le o corpo JSON com limite de tamanho. Retorna undefined se invalido. */
export async function readJsonBody(request: Request, maxBytes = 20_000): Promise<unknown> {
  try {
    const text = await request.text();

    if (text.length > maxBytes) {
      return undefined;
    }

    return JSON.parse(text);
  } catch {
    return undefined;
  }
}
