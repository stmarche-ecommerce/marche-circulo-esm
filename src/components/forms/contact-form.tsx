"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import {
  contactFormSchema,
  getContactFieldErrors,
  type ContactFormFieldErrors,
  type ContactFormValues,
} from "@/lib/contact-validation";
import { formatPhone, isValidEmail, isValidPhone } from "@/lib/validation";
import { SubmitButton } from "../button";

type ContactFormProps = {
  defaultSubject?: string;
  destinationEmail: string;
};

function getInitialValues(defaultSubject?: string): ContactFormValues {
  return {
    name: "",
    email: "",
    phone: "",
    subject: defaultSubject ?? "",
    message: "",
  };
}

export function ContactForm({ defaultSubject, destinationEmail }: ContactFormProps) {
  const [formValues, setFormValues] = useState<ContactFormValues>(() => getInitialValues(defaultSubject));
  const [fieldErrors, setFieldErrors] = useState<ContactFormFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = contactFormSchema.safeParse(formValues);

    if (!parsed.success) {
      const nextErrors = getContactFieldErrors(parsed.error.issues);
      setFieldErrors(nextErrors);
      toast.error("Preencha todos os campos obrigatórios corretamente.");
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...parsed.data,
          destinationEmail,
        }),
      });

      const result = await response.json()

      if (!response.ok || !result?.success) {
        if (result?.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }

        toast.error(result?.message ?? "Não foi possivel enviar sua mensagem agora.");
        return;
      }

      toast.success(result.message ?? "Mensagem enviada com sucesso.");
      setFormValues(getInitialValues(defaultSubject));
    } catch (error) {
      toast.error("Não foi possivel enviar sua mensagem agora.");
      console.error("[contact-form] Falha ao enviar formulario", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 md:grid-cols-2">
      <div>
        <input
          className="site-input"
          placeholder="Nome completo*"
          autoComplete="name"
          value={formValues.name}
          onChange={(event) => updateField("name", event.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
        />
        {fieldErrors.name ? <p className="mt-2 text-sm text-red-700">{fieldErrors.name}</p> : null}
      </div>

      <div>
        <input
          className="site-input"
          type="email"
          placeholder="E-mail*"
          autoComplete="email"
          value={formValues.email}
          onChange={(event) => updateField("email", event.target.value)}
          onBlur={() => {
            if (formValues.email && !isValidEmail(formValues.email)) {
              setFieldErrors((prev) => ({ ...prev, email: "E-mail inválido" }));
            } else {
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          aria-invalid={Boolean(fieldErrors.email)}
        />
        {fieldErrors.email ? <p className="mt-2 text-sm text-red-700">{fieldErrors.email}</p> : null}
      </div>

      <div>
        <input
          className="site-input"
          placeholder="Celular*"
          autoComplete="tel"
          inputMode="numeric"
          maxLength={15} // "(11) 91234-5678" formatado
          value={formValues.phone}
          onChange={(event) => updateField("phone", formatPhone(event.target.value))}
          onBlur={() => {
            if (formValues.phone && !isValidPhone(formValues.phone)) {
              setFieldErrors((prev) => ({ ...prev, phone: "Celular inválido" }));
            } else {
              setFieldErrors((prev) => ({ ...prev, phone: undefined }));
            }
          }}
          aria-invalid={Boolean(fieldErrors.phone)}
        />
        {fieldErrors.phone ? <p className="mt-2 text-sm text-red-700">{fieldErrors.phone}</p> : null}
      </div>

      <div>
        <input
          className="site-input"
          placeholder="Contato*"
          value={formValues.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          aria-invalid={Boolean(fieldErrors.subject)}
        />
        {fieldErrors.subject ? <p className="mt-2 text-sm text-red-700">{fieldErrors.subject}</p> : null}
      </div>

      <div className="md:col-span-2">
        <textarea
          className="site-input min-h-40 md:col-span-2"
          placeholder="Mensagem*"
          value={formValues.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {fieldErrors.message ? <p className="mt-2 text-sm text-red-700">{fieldErrors.message}</p> : null}
      </div>

      <SubmitButton isLoading={isSubmitting} className="md:col-span-2 md:w-fit">
        Enviar mensagem
      </SubmitButton>
    </form>
  );
}
