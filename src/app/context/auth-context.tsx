"use client";

import { createContext, ReactNode, useContext, useEffect, useState, useSyncExternalStore } from "react";
import {
  AuthSession,
  AuthUser,
  destroyAuthSession,
  readStoredAuthSession,
  refreshAuthSession,
  subscribeToAuthSession,
  writeStoredAuthSession,
} from "@/lib/auth-session";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (session: AuthSession) => void;
  updateUser: (updates: Partial<AuthUser>) => void;
  logout: () => Promise<void>;
}

interface AuthSnapshot {
  user: AuthUser | null;
}

const fallbackAuthContext: AuthContextType = {
  user: null,
  loading: false,
  isAuthenticated: false,
  login: (session: AuthSession) => {
    writeStoredAuthSession(session);
  },
  updateUser: () => {
    // no-op fallback for components rendered outside the provider
  },
  logout: destroyAuthSession,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const EMPTY_AUTH_STATE: AuthSnapshot = {
  user: null,
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
  };

  return lastAuthSnapshot;
}

function getAuthServerSnapshot() {
  return EMPTY_AUTH_STATE;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const authState = useSyncExternalStore(
    subscribeToAuthSession,
    getAuthSnapshot,
    getAuthServerSnapshot,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    void refreshAuthSession().finally(() => {
      if (!cancelled) {
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

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
    });
  };

  const logout = destroyAuthSession;

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
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
