"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  AuthSession,
  AuthUser,
  clearStoredAuthSession,
  readStoredAuthSession,
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<{
    user: AuthUser | null;
    token?: string;
  }>({
    user: null,
    token: undefined,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedSession = readStoredAuthSession();

    if (storedSession) {
      setAuthState({
        user: storedSession.user,
        token: storedSession.token,
      });
    }

    setLoading(false);
  }, []);

  const login = (session: AuthSession) => {
    setAuthState({
      user: session.user,
      token: session.token,
    });
    writeStoredAuthSession(session);
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    setAuthState((current) => {
      if (!current.user) {
        return current;
      }

      const nextState = {
        ...current,
        user: {
          ...current.user,
          ...updates,
        },
      };

      writeStoredAuthSession({
        user: nextState.user,
        token: nextState.token,
      });

      return nextState;
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: undefined,
    });
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
