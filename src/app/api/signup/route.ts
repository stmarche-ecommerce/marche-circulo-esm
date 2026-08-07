import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface SignupPayload {
  username: string;
  email: string;
  birth_date: string;
  first_name: string;
  last_name: string;
  telephone: string;
  allow_communications: boolean;
  data: {
    origin: string;
    esm: boolean;
  };
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zip_code: string;
  complement: string;
}

// function resolveUsersApiUrl() {
//   return (
//     process.env.ESM_CUSTOMER_SYNC_URL?.trim() ||
//     process.env.NEXT_PUBLIC_API_USERS_V2?.trim()
//   );
// }

function resolveUsersApiUrl() {
  const base =
    process.env.ESM_CUSTOMER_SYNC_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_USERS_V2?.trim();

  if (!base) return undefined;

  // remove barra final duplicada, se houver
  return `${base.replace(/\/+$/, "")}/users-v2`;
}

function resolveUsersApiKey() {
  return (
    process.env.ESM_CUSTOMER_SYNC_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_USERS_V2_API_KEY?.trim()
  );
}

export async function POST(request: Request) {
  const startedAt = performance.now();

  try {
    const apiUrl = resolveUsersApiUrl();
    const apiKey = resolveUsersApiKey();

    if (!apiUrl || !apiKey) {
      console.warn("[api/signup] configuracao ausente", {
        hasApiUrl: Boolean(apiUrl),
        hasApiKey: Boolean(apiKey),
      });

      return NextResponse.json(
        { message: "Configuracao do servico de cadastro indisponivel." },
        { status: 500 },
      );
    }

    const body = (await request.json()) as SignupPayload;

    const upstreamResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });

    const responseText = await upstreamResponse.text();
    const contentType = upstreamResponse.headers.get("content-type") ?? "application/json";

    return new NextResponse(responseText, {
      status: upstreamResponse.status,
      headers: {
        "content-type": contentType,
      },
    });
  } catch (error) {
    const finishedAt = performance.now();

    if (error instanceof Error && error.name === "TimeoutError") {
      console.error("[api/signup] timeout", {
        totalDurationMs: Math.round(finishedAt - startedAt),
      });

      return NextResponse.json(
        { message: "O servico de cadastro demorou mais do que o esperado para responder." },
        { status: 504 },
      );
    }

    console.error("[api/signup] Falha ao criar cadastro", {
      totalDurationMs: Math.round(finishedAt - startedAt),
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      { message: "Nao foi possivel concluir o cadastro agora." },
      { status: 500 },
    );
  }
}