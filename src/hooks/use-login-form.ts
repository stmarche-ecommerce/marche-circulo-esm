"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/auth-context";
import { ApiService } from "@/app/services/api-service";
import {
  createLoginPayload,
  formatCpf,
  getLoginErrorMessage,
  LoginFormValues,
  mapLoginResponseToSession,
  resolveLoginEndpoint,
  validateCpfLoginValues,
} from "@/lib/auth-login";

export function useLoginForm() {
  const router = useRouter();
  const api = new ApiService();
  const { login: authenticate } = useAuth();
  const [formData, setFormData] = useState<LoginFormValues>({ login: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: name === "login" ? formatCpf(value) : value,
    }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateCpfLoginValues(formData);

    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await api.post(
        resolveLoginEndpoint(),
        createLoginPayload(formData),
      );
      const session = mapLoginResponseToSession(response.data);

      authenticate(session);
      toast.success("Login realizado com sucesso.");
      router.push("/area-cliente");
      router.refresh();
    } catch (error) {
      toast.error(getLoginErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
