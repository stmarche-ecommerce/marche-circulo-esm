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
  logout: () => {
    clearStoredAuthSession();
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedSession = readStoredAuthSession();
    if (storedSession) {
      setUser(storedSession.user);
      setToken(storedSession.token);
    }

    setLoading(false);
  }, []);

  const login = (session: AuthSession) => {
    setUser(session.user);
    setToken(session.token);
    writeStoredAuthSession(session);
  };

  const logout = () => {
    setUser(null);
    setToken(undefined);
    clearStoredAuthSession();
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, isAuthenticated: Boolean(user), login, logout }}
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
