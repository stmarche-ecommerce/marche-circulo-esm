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

let memoryAuthSession: AuthSession | null = null;
let lastSerializedSession: string | null = null;
let lastParsedSession: AuthSession | null = null;

function dispatchAuthSessionChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

export function readStoredAuthSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return memoryAuthSession;
  }

  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) {
      memoryAuthSession = null;
      lastSerializedSession = null;
      lastParsedSession = null;
      return null;
    }

    if (rawValue === lastSerializedSession) {
      return lastParsedSession;
    }

    const parsedSession = JSON.parse(rawValue) as AuthSession;

    memoryAuthSession = parsedSession;
    lastSerializedSession = rawValue;
    lastParsedSession = parsedSession;

    return parsedSession;
  } catch {
    memoryAuthSession = null;
    lastSerializedSession = null;
    lastParsedSession = null;

    try {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignore storage cleanup errors and fall back to memory state.
    }

    return memoryAuthSession;
  }
}

export function writeStoredAuthSession(session: AuthSession) {
  memoryAuthSession = session;
  lastSerializedSession = JSON.stringify(session);
  lastParsedSession = session;

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(AUTH_STORAGE_KEY, lastSerializedSession);
  } catch {
    // Keep the in-memory session when storage is unavailable.
  }

  dispatchAuthSessionChange();
}

export function clearStoredAuthSession() {
  memoryAuthSession = null;
  lastSerializedSession = null;
  lastParsedSession = null;

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Ignore storage cleanup failures and clear the in-memory session.
  }

  dispatchAuthSessionChange();
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
