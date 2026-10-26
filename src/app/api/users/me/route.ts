import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { guardRequest, jsonError, readJsonBody } from "@/lib/server/request-guards";
import {
  createSessionCookieValue,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
  verifySessionCookieValue,
} from "@/lib/server/session";
import { callUsersApi, readJsonSafely } from "@/lib/server/users-api";

export const runtime = "nodejs";

const short = (max: number) => z.string().trim().max(max);

// Apenas os campos que o formulario de perfil envia; o CPF vem da sessao.
const profileUpdateSchema = z.strictObject({
  email: z.string().trim().email().max(160),
  birth_date: short(10),
  first_name: short(80),
  last_name: short(120),
  telephone: z.string().regex(/^\d{0,11}$/),
  allow_communications: z.boolean(),
  address: z.strictObject({
    street: short(200),
    number: short(20),
    district: short(120),
    city: short(120),
    state: short(30),
    zip_code: z.string().regex(/^\d{0,8}$/),
    complement: short(120),
  }),
  data: z.strictObject({
    notifications: z.strictObject({
      email: z.boolean(),
      push: z.boolean(),
      sms: z.boolean(),
      whatsapp: z.boolean(),
    }),
  }),
  password: z.string().min(1).max(200).optional(),
});

async function getSession() {
  return verifySessionCookieValue((await cookies()).get(SESSION_COOKIE_NAME)?.value);
}

export async function GET(request: Request) {
  const blocked = guardRequest(request, { scope: "profile-read", limit: 60, windowMs: 60_000 });
  if (blocked) return blocked;

  const session = await getSession();
  if (!session) return jsonError("Sessao expirada.", 401);

  try {
    const upstream = await callUsersApi(`/users-v2?id=${encodeURIComponent(session.user.id)}`, {
      token: session.token,
    });

    if (!upstream?.ok) {
      return jsonError("Nao foi possivel carregar seu cadastro.", upstream?.status === 401 ? 401 : 502);
    }

    return NextResponse.json(await readJsonSafely(upstream), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("[api/users/me] falha ao carregar", {
      error: error instanceof Error ? error.message : String(error),
    });
    return jsonError("Nao foi possivel carregar seu cadastro.", 502);
  }
}

export async function PUT(request: Request) {
  const blocked = guardRequest(request, { scope: "profile-write", limit: 20, windowMs: 60_000 });
  if (blocked) return blocked;

  const session = await getSession();
  if (!session) return jsonError("Sessao expirada.", 401);

  if (!session.user.cpf) {
    return jsonError("Nao foi possivel identificar o CPF do cadastro.", 400);
  }

  const parsed = profileUpdateSchema.safeParse(await readJsonBody(request));
  if (!parsed.success) {
    return jsonError("Revise os dados informados.", 400);
  }

  try {
    const upstream = await callUsersApi(`/users-v2/${session.user.cpf}`, {
      method: "PUT",
      body: parsed.data,
      token: session.token,
    });

    if (!upstream?.ok) {
      const status = upstream && upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502;
      return jsonError("Nao foi possivel atualizar seu cadastro.", status);
    }

    const { first_name, last_name, email } = parsed.data;
    const response = NextResponse.json({ success: true }, { headers: { "Cache-Control": "no-store" } });

    response.cookies.set(
      SESSION_COOKIE_NAME,
      await createSessionCookieValue({
        token: session.token,
        user: { ...session.user, name: `${first_name} ${last_name}`.trim(), email },
      }),
      sessionCookieOptions,
    );

    return response;
  } catch (error) {
    console.error("[api/users/me] falha ao atualizar", {
      error: error instanceof Error ? error.message : String(error),
    });
    return jsonError("Nao foi possivel atualizar seu cadastro.", 502);
  }
}
