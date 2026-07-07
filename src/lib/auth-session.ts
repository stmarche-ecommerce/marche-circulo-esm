"use client";

export const AUTH_STORAGE_KEY = "auth-session";
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
  token?: string;
}

export function readStoredAuthSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as AuthSession;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function writeStoredAuthSession(session: AuthSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

export function clearStoredAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

export function subscribeToAuthSession(onChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (!event.key || event.key === AUTH_STORAGE_KEY) {
      onChange();
    }
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(AUTH_SESSION_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(AUTH_SESSION_EVENT, onChange);
  };
}
