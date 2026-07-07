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

const EMPTY_AUTH_STATE = {
  user: null,
  token: undefined,
} satisfies {
  user: AuthUser | null;
  token?: string;
};

function getAuthSnapshot() {
  const storedSession = readStoredAuthSession();

  if (!storedSession) {
    return EMPTY_AUTH_STATE;
  }

  return {
    user: storedSession.user,
    token: storedSession.token,
  };
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
  const loading = typeof window === "undefined";

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
