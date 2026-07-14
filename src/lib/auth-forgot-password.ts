import axios from "axios";
import { isValidCpf, normalizeCpf } from "@/lib/auth-login";

export interface ForgotPasswordFormValues {
  cpf: string;
}

interface ForgotPasswordApiResponse {
  email?: string;
  message?: string;
}

const DEFAULT_FORGOT_PASSWORD_ERROR =
  "Nao foi possivel solicitar a recuperacao de senha. Tente novamente.";

export function resolveForgotPasswordEndpoint(cpf: string) {
  return `/users-v2/${normalizeCpf(cpf)}/forgot-password`;
}

export function validateForgotPasswordValues(values: ForgotPasswordFormValues) {
  if (!isValidCpf(values.cpf)) {
    return {
      valid: false,
      message: "Digite um CPF valido para continuar.",
    };
  }

  return { valid: true };
}

export function getForgotPasswordSuccessMessage(data: unknown) {
  const response = data as ForgotPasswordApiResponse | undefined;
  const maskedEmail = typeof response?.email === "string" ? response.email : "seu e-mail cadastrado";

  return `Se existir um cadastro para este CPF, enviaremos o link de recuperacao para ${maskedEmail}.`;
}

export function getForgotPasswordErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const responseData =
      error.response?.data && typeof error.response.data === "object"
        ? (error.response.data as Record<string, unknown>)
        : undefined;

    const message = responseData?.message;

    if (Array.isArray(message) && message.length > 0) {
      const firstMessage = message.find((item) => typeof item === "string");
      if (typeof firstMessage === "string") {
        return firstMessage;
      }
    }

    return (
      (typeof message === "string" && message) ||
      (typeof responseData?.error === "string" && responseData.error) ||
      error.message ||
      DEFAULT_FORGOT_PASSWORD_ERROR
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return DEFAULT_FORGOT_PASSWORD_ERROR;
}
