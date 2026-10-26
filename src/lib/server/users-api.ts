// Acesso server-side a API users-v2. A chave nunca deve chegar ao navegador.
function resolveConfig() {
  const baseUrl = (
    process.env.USERS_API_URL ??
    process.env.ESM_CUSTOMER_SYNC_URL ??
    process.env.NEXT_PUBLIC_API_USERS_V2
  )?.trim();
  const apiKey = (
    process.env.USERS_API_KEY ??
    process.env.ESM_CUSTOMER_SYNC_API_KEY ??
    process.env.NEXT_PUBLIC_USERS_V2_API_KEY
  )?.trim();

  return { baseUrl: baseUrl?.replace(/\/+$/, ""), apiKey };
}

interface UsersApiRequest {
  method?: "GET" | "POST" | "PUT";
  body?: unknown;
  token?: string;
}

/** Chama a API upstream. Retorna null se a configuracao estiver ausente. */
export async function callUsersApi(path: string, { method = "GET", body, token }: UsersApiRequest = {}) {
  const { baseUrl, apiKey } = resolveConfig();

  if (!baseUrl || !apiKey) {
    console.warn("[users-api] configuracao ausente", {
      hasApiUrl: Boolean(baseUrl),
      hasApiKey: Boolean(apiKey),
    });
    return null;
  }

  return fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
}

export async function readJsonSafely(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
