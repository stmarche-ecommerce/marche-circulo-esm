import axios from "axios";
import type { AuthSession, AuthUser } from "@/lib/auth-session";

export interface LoginFormValues {
  login: string;
  password: string;
}

interface LoginApiResponse {
  id: string;
  name: string;
  email: string;
  employee?: boolean;
  roles?: string[];
  token?: string;
}

const DEFAULT_LOGIN_ERROR =
  "Nao foi possivel realizar o login. Tente novamente.";

export function resolveLoginEndpoint() {
  return process.env.NEXT_PUBLIC_AUTH_LOGIN_ENDPOINT ?? "/users-v2";
}

export function normalizeCpf(value: string) {
  return value.replace(/\D/g, "").slice(0, 11);
}

export function formatCpf(value: string) {
  const digits = normalizeCpf(value);

  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export function isValidCpf(value: string) {
  const cpf = normalizeCpf(value);

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;

  for (let index = 0; index < 9; index += 1) {
    sum += Number(cpf[index]) * (10 - index);
  }

  let remainder = (sum * 10) % 11;
  if (remainder === 10) {
    remainder = 0;
  }

  if (remainder !== Number(cpf[9])) {
    return false;
  }

  sum = 0;

  for (let index = 0; index < 10; index += 1) {
    sum += Number(cpf[index]) * (11 - index);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10) {
    remainder = 0;
  }

  return remainder === Number(cpf[10]);
}

export function createLoginPayload(values: LoginFormValues) {
  return {
    username: normalizeCpf(values.login),
    password: values.password,
  };
}

export function validateLoginValues(values: LoginFormValues) {
  return Boolean(values.login.trim() && values.password.trim());
}

export function validateCpfLoginValues(values: LoginFormValues) {
  if (!values.password.trim()) {
    return {
      valid: false,
      message: "Preencha CPF e senha para continuar.",
    };
  }

  if (!isValidCpf(values.login)) {
    return {
      valid: false,
      message: "Digite um CPF valido para continuar.",
    };
  }

  return { valid: true };
}

export function mapLoginResponseToSession(data: unknown): AuthSession {
  const response = data as Partial<LoginApiResponse>;

  const user: AuthUser = {
    id: String(response.id ?? ""),
    name: String(response.name ?? ""),
    email: String(response.email ?? ""),
    employee: Boolean(response.employee),
    roles: Array.isArray(response.roles)
      ? response.roles.filter(
        (role): role is string => typeof role === "string" && role.length > 0,
      )
      : [],
  };

  return {
    user,
    token: typeof response.token === "string" ? response.token : undefined,
  };
}

export function getLoginErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const responseData =
      error.response?.data && typeof error.response.data === "object"
        ? (error.response.data as Record<string, unknown>)
        : undefined;

    return (
      (typeof responseData?.message === "string" && responseData.message) ||
      (typeof responseData?.error === "string" && responseData.error) ||
      error.message ||
      DEFAULT_LOGIN_ERROR
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return DEFAULT_LOGIN_ERROR;
}
