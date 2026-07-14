"use client";

import { createContext, ReactNode, useContext, useSyncExternalStore } from "react";
import {
  AuthSession,
  AuthUser,
  clearStoredAuthSession,
  readStoredAuthSession,
  subscribeToAuthSession,
  writeStoredAuthSession,
} from "@/lib/auth-session";

interface AuthContextType {
  user: AuthUser | null;
  token?: string;
  loading: boolean;
  isAuthenticated: boolean;
  login: (session: AuthSession) => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  logout: () => void;
}

interface AuthSnapshot {
  user: AuthUser | null;
  token?: string;
}

const fallbackAuthContext: AuthContextType = {
  user: null,
  token: undefined,
  loading: false,
  isAuthenticated: false,
  login: (session: AuthSession) => {
    writeStoredAuthSession(session);
  },
  updateUser: () => {
    // no-op fallback for components rendered outside the provider
  },
  logout: () => {
    clearStoredAuthSession();
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const EMPTY_AUTH_STATE: AuthSnapshot = {
  user: null,
  token: undefined,
};

let lastAuthSession: AuthSession | null = null;
let lastAuthSnapshot: AuthSnapshot = EMPTY_AUTH_STATE;

function getAuthSnapshot() {
  const storedSession = readStoredAuthSession();

  if (!storedSession) {
    lastAuthSession = null;
    lastAuthSnapshot = EMPTY_AUTH_STATE;
    return EMPTY_AUTH_STATE;
  }

  if (storedSession === lastAuthSession) {
    return lastAuthSnapshot;
  }

  lastAuthSession = storedSession;
  lastAuthSnapshot = {
    user: storedSession.user,
    token: storedSession.token,
  };

  return lastAuthSnapshot;
}

function getAuthServerSnapshot() {
  return EMPTY_AUTH_STATE;
}

function subscribeToHydration() {
  return () => undefined;
}

function getHydrationSnapshot() {
  return true;
}

function getHydrationServerSnapshot() {
  return false;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const authState = useSyncExternalStore(
    subscribeToAuthSession,
    getAuthSnapshot,
    getAuthServerSnapshot,
  );
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getHydrationServerSnapshot,
  );

  const loading = !hydrated;

  const login = (session: AuthSession) => {
    writeStoredAuthSession(session);
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    if (!authState.user) {
      return;
    }

    writeStoredAuthSession({
      user: {
        ...authState.user,
        ...updates,
      },
      token: authState.token,
    });
  };

  const logout = () => {
    clearStoredAuthSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        loading,
        isAuthenticated: Boolean(authState.user),
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    if (typeof window !== "undefined") {
      console.warn("useAuth rendered outside AuthProvider; falling back to storage-only auth.");
    }

    return fallbackAuthContext;
  }
  return context;
}
