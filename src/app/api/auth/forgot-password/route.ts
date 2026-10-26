import { NextResponse } from "next/server";
import { z } from "zod";

import { isValidCpf } from "@/lib/auth-login";
import { checkRateLimit } from "@/lib/server/rate-limit";
import { guardRequest, jsonError, readJsonBody } from "@/lib/server/request-guards";
import { callUsersApi, readJsonSafely } from "@/lib/server/users-api";

export const runtime = "nodejs";

const forgotPasswordSchema = z.object({
  cpf: z.string().regex(/^\d{11}$/).refine(isValidCpf),
});

const FAILURE_MESSAGE = "Nao foi possivel solicitar a recuperacao de senha agora.";

export async function POST(request: Request) {
  const blocked = guardRequest(request, { scope: "forgot-password", limit: 10, windowMs: 15 * 60_000 });
  if (blocked) return blocked;

  const parsed = forgotPasswordSchema.safeParse(await readJsonBody(request));
  if (!parsed.success) {
    return jsonError("Digite um CPF valido para continuar.", 400);
  }

  const { cpf } = parsed.data;

  if (!checkRateLimit(`forgot-password:cpf:${cpf}`, 3, 60 * 60_000).ok) {
    return jsonError("Muitas tentativas. Aguarde um instante e tente novamente.", 429);
  }

  try {
    const upstream = await callUsersApi(`/users-v2/${cpf}/forgot-password`);

    if (!upstream) {
      return jsonError(FAILURE_MESSAGE, 500);
    }

    // CPF inexistente recebe a mesma resposta de sucesso, sem expor o e-mail.
    if (upstream.status === 404) {
      return NextResponse.json({ success: true });
    }

    if (!upstream.ok) {
      return jsonError(FAILURE_MESSAGE, 502);
    }

    const data = (await readJsonSafely(upstream)) as { email?: unknown } | null;

    return NextResponse.json({ success: true, email: typeof data?.email === "string" ? data.email : undefined });
  } catch (error) {
    console.error("[api/auth/forgot-password] falha", {
      error: error instanceof Error ? error.message : String(error),
    });
    return jsonError(FAILURE_MESSAGE, 502);
  }
}
