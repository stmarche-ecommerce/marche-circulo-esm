"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { formatCpf } from "@/lib/auth-login";
import {
  ForgotPasswordFormValues,
  getForgotPasswordErrorMessage,
  getForgotPasswordSuccessMessage,
  resolveForgotPasswordEndpoint,
  validateForgotPasswordValues,
} from "@/lib/auth-forgot-password";
import { ApiService } from "@/services/api-service";

export function useForgotPasswordForm() {
  const api = new ApiService();
  const [formData, setFormData] = useState<ForgotPasswordFormValues>({ cpf: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setFormData({ cpf: formatCpf(value) });
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validateForgotPasswordValues(formData);

    if (!validation.valid) {
      toast.error(validation.message);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.get(resolveForgotPasswordEndpoint(formData.cpf));
      const nextMessage = getForgotPasswordSuccessMessage(response.data);

      setSuccessMessage(nextMessage);
      toast.success(nextMessage);
    } catch (error) {
      toast.error(getForgotPasswordErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    formData,
    isSubmitting,
    successMessage,
    handleChange,
    handleSubmit,
  };
}
