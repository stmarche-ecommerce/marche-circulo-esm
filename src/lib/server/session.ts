import type { AuthUser } from "@/lib/auth-session";

export const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === "production" ? "__Host-session" : "session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export interface ServerSession {
  user: AuthUser;
  token?: string;
}

interface SessionPayload extends ServerSession {
  exp: number;
}

const encoder = new TextEncoder();

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET?.trim();

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET ausente ou com menos de 32 caracteres.");
  }

  return secret;
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const binary = atob(value.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function importKey() {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/** Gera o valor assinado (HMAC-SHA256) do cookie de sessao. */
export async function createSessionCookieValue(session: ServerSession) {
  const payload: SessionPayload = {
    ...session,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const encodedPayload = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign("HMAC", await importKey(), encoder.encode(encodedPayload));

  return `${encodedPayload}.${toBase64Url(new Uint8Array(signature))}`;
}

/** Valida assinatura e expiracao. Retorna null para qualquer valor invalido. */
export async function verifySessionCookieValue(value: string | undefined | null): Promise<ServerSession | null> {
  if (!value) {
    return null;
  }

  const [encodedPayload, encodedSignature, ...rest] = value.split(".");

  if (!encodedPayload || !encodedSignature || rest.length > 0) {
    return null;
  }

  try {
    const isValid = await crypto.subtle.verify(
      "HMAC",
      await importKey(),
      fromBase64Url(encodedSignature),
      encoder.encode(encodedPayload),
    );

    if (!isValid) {
      return null;
    }

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(encodedPayload))) as SessionPayload;

    if (!payload?.user?.id || typeof payload.exp !== "number" || payload.exp < Date.now() / 1000) {
      return null;
    }

    return { user: payload.user, token: payload.token };
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
