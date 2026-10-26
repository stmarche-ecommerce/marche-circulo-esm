import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE_NAME, verifySessionCookieValue } from "@/lib/server/session";

// A area do cliente esta desativada por enquanto. Para reativar, defina AREA_CLIENTE_ENABLED=true.
const isAreaClienteEnabled = () => process.env.AREA_CLIENTE_ENABLED === "true";

export async function middleware(request: NextRequest) {
  if (!isAreaClienteEnabled()) {
    // Reescreve para uma rota inexistente: responde 404 sem expor a pagina.
    return NextResponse.rewrite(new URL("/area-cliente-desativada", request.url));
  }

  const session = await verifySessionCookieValue(request.cookies.get(SESSION_COOKIE_NAME)?.value).catch(() => null);

  if (session) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);

  const response = NextResponse.redirect(loginUrl);
  // Descarta cookie invalido/expirado.
  if (request.cookies.has(SESSION_COOKIE_NAME)) {
    response.cookies.delete(SESSION_COOKIE_NAME);
  }

  return response;
}

export const config = {
  matcher: ["/area-cliente/:path*"],
};
