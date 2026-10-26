"use client";

const AUTH_SESSION_EVENT = "auth-session-change";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  cpf?: string;
  employee?: boolean;
  roles?: string[];
}

export interface AuthSession {
  user: AuthUser;
}

// A credencial real fica em cookie HttpOnly emitido pelo servidor. Aqui mantemos
// apenas os dados de exibicao do usuario, em memoria.
let memoryAuthSession: AuthSession | null = null;

function dispatchAuthSessionChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

export function readStoredAuthSession(): AuthSession | null {
  return memoryAuthSession;
}

export function writeStoredAuthSession(session: AuthSession) {
  memoryAuthSession = session;
  dispatchAuthSessionChange();
}

export function clearStoredAuthSession() {
  memoryAuthSession = null;
  dispatchAuthSessionChange();
}

/** Sincroniza o estado local com a sessao validada pelo servidor. */
export async function refreshAuthSession() {
  try {
    const response = await fetch("/api/auth/session", { cache: "no-store" });
    const data = (await response.json().catch(() => null)) as { user?: AuthUser | null } | null;

    if (data?.user) {
      writeStoredAuthSession({ user: data.user });
    } else {
      clearStoredAuthSession();
    }
  } catch {
    // Mantem o estado atual quando a rede falha.
  }
}

export async function destroyAuthSession() {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } finally {
    clearStoredAuthSession();
  }
}

export function subscribeToAuthSession(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener(AUTH_SESSION_EVENT, onChange);

  return () => {
    window.removeEventListener(AUTH_SESSION_EVENT, onChange);
  };
}
