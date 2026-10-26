import { randomInt } from "node:crypto";
import { after, NextResponse } from "next/server";
import { z } from "zod";

import { isValidCpf } from "@/lib/auth-login";
import { guardRequest, jsonError, readJsonBody } from "@/lib/server/request-guards";
import { callUsersApi, readJsonSafely } from "@/lib/server/users-api";
import { sendSignupConfirmationEmail } from "@/lib/signup-confirmation-email";

export const runtime = "nodejs";

const short = (max: number) => z.string().trim().max(max);

// Somente os campos do cadastro; qualquer campo extra e rejeitado (mass assignment).
const signupSchema = z.strictObject({
  username: z.string().regex(/^\d{11}$/).refine(isValidCpf),
  email: z.string().trim().email().max(160),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  first_name: short(80).min(1),
  last_name: short(120).min(1),
  telephone: z.string().regex(/^\d{10,11}$/),
  allow_communications: z.boolean(),
  data: z.strictObject({ origin: z.string().max(40), esm: z.boolean() }).optional(),
  street: short(200),
  number: short(20),
  district: short(120),
  city: short(120),
  state: short(30),
  zip_code: z.string().regex(/^\d{0,8}$/),
  complement: short(120),
});

function generateRandomPassword(length = 20) {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const digits = "23456789";
  const symbols = "!@#$%&*?";
  const all = upper + lower + digits + symbols;

  const pick = (chars: string) => chars[randomInt(chars.length)];

  // garante ao menos um caractere de cada classe (politica de senha do FusionAuth)
  const chars = [pick(upper), pick(lower), pick(digits), pick(symbols)];
  while (chars.length < length) chars.push(pick(all));

  // embaralha (Fisher-Yates)
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.join("");
}

function isDuplicateRegistration(status: number, body: unknown) {
  if (status === 409) return true;

  const message = JSON.stringify(body ?? "").toLowerCase();
  return message.includes("already exists") || message.includes("username") || message.includes("telephone");
}

export async function POST(request: Request) {
  const startedAt = performance.now();

  const blocked = guardRequest(request, { scope: "signup", limit: 5, windowMs: 60 * 60_000 });
  if (blocked) return blocked;

  const parsed = signupSchema.safeParse(await readJsonBody(request));
  if (!parsed.success) {
    return jsonError("Revise os dados informados para concluir o cadastro.", 400);
  }

  try {
    const upstreamResponse = await callUsersApi("/users-v2", {
      method: "POST",
      body: { ...parsed.data, data: { origin: "App", esm: true }, password: generateRandomPassword() },
    });

    if (!upstreamResponse) {
      return jsonError("Configuracao do servico de cadastro indisponivel.", 500);
    }

    if (!upstreamResponse.ok) {
      const upstreamBody = await readJsonSafely(upstreamResponse);

      console.warn("[api/signup] cadastro recusado pelo servico", { status: upstreamResponse.status });

      if (isDuplicateRegistration(upstreamResponse.status, upstreamBody)) {
        return jsonError("Ja existe um cadastro com estes dados.", 409);
      }

      return upstreamResponse.status >= 400 && upstreamResponse.status < 500
        ? jsonError("Nao foi possivel validar os dados do cadastro.", 400)
        : jsonError("Nao foi possivel concluir o cadastro agora.", 502);
    }

    const { email, first_name, last_name } = parsed.data;

    // O e-mail de boas-vindas so sai apos o cadastro real, sem endpoint publico de envio.
    after(async () => {
      try {
        await sendSignupConfirmationEmail({
          email,
          name: `${first_name} ${last_name}`.trim(),
        });
      } catch (error) {
        console.error("Signup confirmation email failed:", error);
      }
    });

    return NextResponse.json({ success: true }, { status: upstreamResponse.status });
  } catch (error) {
    const totalDurationMs = Math.round(performance.now() - startedAt);

    if (error instanceof Error && error.name === "TimeoutError") {
      console.error("[api/signup] timeout", { totalDurationMs });
      return jsonError("O servico de cadastro demorou mais do que o esperado para responder.", 504);
    }

    console.error("[api/signup] Falha ao criar cadastro", {
      totalDurationMs,
      error: error instanceof Error ? error.message : String(error),
    });

    return jsonError("Nao foi possivel concluir o cadastro agora.", 500);
  }
}
