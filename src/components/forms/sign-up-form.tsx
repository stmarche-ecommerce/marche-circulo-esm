"use client";

import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ApiService } from "@/services/api-service";
import { useSignUpForm } from "@/hooks/use-signup-form";
import { useZipCodeLookup } from "@/hooks/use-via-cep";
import { signUpSchema, type SignUpFormValues } from "@/lib/sign-up-validation";
import { Field, FieldGrid, SecondaryButton, SubmitButton } from ".";
import axios from "axios";

interface SignUpPayload {
  username: string;
  email: string;
  birth_date: string;
  first_name: string;
  last_name: string;
  telephone: string;
  allow_communications: boolean;
  data: {
    origin: string;
    esm: boolean;
  };
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zip_code: string;
  complement: string;
}

interface SignupConfirmationPayload {
  email: string;
  name: string;
}

type WizardStep = 1 | 2;

type StepConfig = {
  id: WizardStep;
  title: string;
  description: string;
  fields: Array<keyof SignUpFormValues>;
};

const STEP_CONFIG: StepConfig[] = [
  {
    id: 1,
    title: "Identificação",
    description: "Nome, sobrenome, CPF, data de nascimento, e-mail e WhatsApp.",
    fields: ["firstName", "lastName", "cpf", "birthDate", "email", "phone"],
  },
  {
    id: 2,
    title: "Endereço e preferências",
    description: "Endereço completo e consentimentos de comunicação.",
    fields: ["zipCode", "street", "number", "neighborhood", "city", "state", "privacyConsent"],
  },
];

const CONSENT_OPTIONS = [
  { name: "optInEmail", title: "E-mail" },
  { name: "optInWhatsApp", title: "WhatsApp" },
  { name: "optInSms", title: "SMS" },
] as const;

export function SignUpForm() {
  const { formData, consents, handleFieldChange, handleConsentChange } = useSignUpForm();
  const { zipCode, addressFields, cepStatus, handleZipCodeChange, handleZipCodeBlur, handleAddressFieldChange } = useZipCodeLookup();
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SignUpFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);

  const api = new ApiService();
  const currentStepConfig = STEP_CONFIG[currentStep - 1];
  const progressValue = `${(currentStep / STEP_CONFIG.length) * 100}%`;
  const stepContentMinHeight = currentStep === 1 ? "md:min-h-[15rem]" : "md:min-h-[23rem]";

  const normalizeDigits = (value: string) => value.replace(/\D/g, "");

  const getValidationValues = (): SignUpFormValues => ({
    firstName: formData.firstName,
    lastName: formData.lastName,
    cpf: formData.cpf,
    email: formData.email,
    phone: formData.phone,
    birthDate: formData.birthDate,
    zipCode,
    street: addressFields.street,
    number: addressFields.number,
    neighborhood: addressFields.neighborhood,
    city: addressFields.city,
    state: addressFields.state,
    privacyConsent,
  });

  const stepErrors = useMemo(
    () => currentStepConfig.fields.filter((field) => fieldErrors[field]),
    [currentStepConfig.fields, fieldErrors],
  );

  const clearFieldError = (fieldName: keyof SignUpFormValues) => {
    setFieldErrors((current) => {
      if (!current[fieldName]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  };

  const handlePrivacyConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyConsent(event.target.checked);
    clearFieldError("privacyConsent");
  };

  const handleFormFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFieldChange(event);
    clearFieldError(event.target.name as keyof SignUpFormValues);
  };

  const handleZipFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleZipCodeChange(event);
    clearFieldError("zipCode");
  };

  const handleAddressChange = (
    field: "street" | "number" | "neighborhood" | "city" | "state",
    value: string,
  ) => {
    handleAddressFieldChange(field, value);
    clearFieldError(field);
  };

  const handleComplementChange = (value: string) => {
    handleAddressFieldChange("complement", value);
  };

  const collectStepErrors = (step: WizardStep) => {
    const validationResult = signUpSchema.safeParse(getValidationValues());

    if (validationResult.success) {
      setFieldErrors((current) => {
        const nextErrors = { ...current };

        for (const field of STEP_CONFIG[step - 1].fields) {
          delete nextErrors[field];
        }

        return nextErrors;
      });

      return null;
    }

    const nextErrors: Partial<Record<keyof SignUpFormValues, string>> = {};
    const stepFields = new Set(STEP_CONFIG[step - 1].fields);

    for (const issue of validationResult.error.issues) {
      const fieldName = issue.path[0] as keyof SignUpFormValues | undefined;

      if (fieldName && stepFields.has(fieldName) && !nextErrors[fieldName]) {
        nextErrors[fieldName] = issue.message;
      }
    }

    setFieldErrors((current) => {
      const mergedErrors = { ...current };

      for (const field of STEP_CONFIG[step - 1].fields) {
        delete mergedErrors[field];
      }

      return { ...mergedErrors, ...nextErrors };
    });

    return Object.keys(nextErrors).length > 0 ? nextErrors : null;
  };

  const handleStepClick = (stepId: WizardStep) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
      return;
    }

    const nextErrors = collectStepErrors(currentStep);

    if (nextErrors) {
      toast.error("Conclua os campos obrigatórios da etapa atual antes de avançar.");
      return;
    }

    setCurrentStep(stepId);
  };

  const handleNextStep = () => {
    const nextErrors = collectStepErrors(currentStep);

    if (nextErrors) {
      toast.error("Revise os campos destacados desta etapa para continuar.");
      return;
    }

    setCurrentStep((current) => Math.min(current + 1, STEP_CONFIG.length) as WizardStep);
  };

  const handlePreviousStep = () => {
    setCurrentStep((current) => Math.max(current - 1, 1) as WizardStep);
  };

  const handleStepKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key !== "Enter") {
      return;
    }

    const target = event.target as HTMLElement | null;
    const tagName = target?.tagName;

    if (tagName === "BUTTON" || tagName === "TEXTAREA") {
      return;
    }

    event.preventDefault();

    if (currentStep < STEP_CONFIG.length) {
      handleNextStep();
      return;
    }

    void handleSubmit();
  };

  const buildPayload = (): SignUpPayload => {
    return {
      username: normalizeDigits(formData.cpf),
      email: formData.email.trim(),
      birth_date: formData.birthDate,
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      telephone: normalizeDigits(formData.phone),
      allow_communications: consents.optInEmail || consents.optInWhatsApp || consents.optInSms,
      data: {
        origin: "App",
        esm: true,
      },
      street: addressFields.street.trim(),
      number: addressFields.number.trim(),
      district: addressFields.neighborhood.trim(),
      city: addressFields.city.trim(),
      state: addressFields.state.trim(),
      zip_code: normalizeDigits(zipCode),
      complement: addressFields.complement.trim(),
    };
  };

  const sendSignupConfirmation = async ({ email, name }: SignupConfirmationPayload) => {
    const response = await fetch("/api/signup-confirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    });

    if (!response.ok) {
      const responseBody = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(responseBody?.message || "Falha ao enviar e-mail de confirmação.");
    }
  };

  const handleSubmit = async () => {
    const validationResult = signUpSchema.safeParse(getValidationValues());

    if (!validationResult.success) {
      const nextErrors: Partial<Record<keyof SignUpFormValues, string>> = {};

      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof SignUpFormValues | undefined;
        if (fieldName && !nextErrors[fieldName]) {
          nextErrors[fieldName] = issue.message;
        }
      }

      setFieldErrors(nextErrors);
      toast.error("Revise os campos obrigatórios destacados para continuar.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFieldErrors({});
      const payload = buildPayload();
      const response = await api.post("/users-v2", payload);
      const isSignupSuccessful = response.status >= 200 && response.status < 300;

      if (isSignupSuccessful) {
        try {
          await sendSignupConfirmation({
            email: payload.email,
            name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
          });
        } catch (emailError) {
          console.error("Erro ao enviar e-mail de confirmação:", emailError);
          const warningMessage = emailError instanceof Error
            ? emailError.message
            : "Cadastro realizado, mas o e-mail de confirmação não foi enviado.";
          toast.warn(warningMessage);
        }

        toast.success("Cadastro realizado com sucesso! Seus dados foram enviados e seu acesso está em processamento.");
        return;
      }
    } catch (err) {
      let mensagem = "Erro ao criar usuário. Tente novamente.";

      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const rawMessage = err.response?.data?.message;
        const apiMessage = Array.isArray(rawMessage)
          ? rawMessage.join(" ")
          : typeof rawMessage === "string"
            ? rawMessage
            : "";
        const normalizedMessage = apiMessage.toLowerCase();

        if (
          status === 409 ||
          normalizedMessage.includes("username") ||
          normalizedMessage.includes("email") ||
          normalizedMessage.includes("telephone") ||
          normalizedMessage.includes("already exists")
        ) {
          mensagem = "Já existe um cadastro com este e-mail, CPF ou telefone. Tente fazer login ou use outros dados.";
        } else {
          console.error("Erro ao criar usuario:", err);
          mensagem = apiMessage || err.message || mensagem;
        }
      } else if (err instanceof Error) {
        console.error("Erro ao criar usuario:", err);
        mensagem = err.message;
      } else {
        console.error("Erro ao criar usuario:", err);
      }

      toast.info(mensagem);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-5 grid gap-[0.95rem]" onKeyDown={handleStepKeyDown} noValidate>
      <div className="grid gap-4 rounded-[1.35rem] border border-[rgba(104,64,49,0.1)] bg-[rgba(255,255,255,0.74)] p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Etapa {currentStep} de {STEP_CONFIG.length}
            </p>
            <h2 className="mt-1 text-[1.15rem] font-bold uppercase tracking-[0.08em] text-[var(--color-brown)]">
              {currentStepConfig.title}
            </h2>
            <p className="mt-1 text-[0.88rem] leading-[1.5] text-[var(--color-muted)]">{currentStepConfig.description}</p>
          </div>
          <div className="flex gap-2 self-stretch md:self-start">
            {STEP_CONFIG.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const isFutureStep = step.id > currentStep;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-[0.82rem] font-bold ${isActive
                    ? "border-[var(--color-brown)] bg-[var(--color-brown)] text-white"
                    : isCompleted
                      ? "border-[var(--color-accent)] bg-[rgba(213,166,66,0.14)] text-[var(--color-brown)]"
                      : "border-[rgba(104,64,49,0.14)] bg-white text-[var(--color-muted)]"
                    } ${isFutureStep ? "cursor-not-allowed opacity-50" : ""}`}
                  aria-label={`Ir para etapa ${step.id}: ${step.title}`}
                  aria-disabled={isFutureStep}
                >
                  {step.id}
                </button>
              );
            })}
          </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[rgba(104,64,49,0.08)]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-accent),#efc76a)] transition-[width] duration-300"
            style={{ width: progressValue }}
          />
        </div>

        {stepErrors.length > 0 ? (
          <p className="text-[0.8rem] leading-[1.4] text-[#a14b3b]">Existem campos obrigatórios pendentes nesta etapa.</p>
        ) : null}
      </div>

      <div className={`grid gap-[0.95rem] ${stepContentMinHeight} md:content-start`}>
        {currentStep === 1 ? (
          <>
            <FieldGrid>
              <Field label="Nome" name="firstName" value={formData.firstName} onChange={handleFormFieldChange} placeholder="Seu nome" error={fieldErrors.firstName} required />
              <Field label="Sobrenome" name="lastName" value={formData.lastName} onChange={handleFormFieldChange} placeholder="Seu sobrenome" error={fieldErrors.lastName} required />
            </FieldGrid>

            <FieldGrid>
              <Field label="CPF" name="cpf" value={formData.cpf} onChange={handleFormFieldChange} placeholder="000.000.000-00" inputMode="numeric" maxLength={14} error={fieldErrors.cpf} required />
              <Field label="Data de nascimento" name="birthDate" value={formData.birthDate} onChange={handleFormFieldChange} type="date" error={fieldErrors.birthDate} required />
            </FieldGrid>

            <FieldGrid>
              <Field label="E-mail" name="email" type="email" value={formData.email} onChange={handleFormFieldChange} placeholder="seunome@email.com" error={fieldErrors.email} required />
              <Field label="WhatsApp" name="phone" value={formData.phone} onChange={handleFormFieldChange} type="tel" placeholder="(11) 99999-9999" error={fieldErrors.phone} required />
            </FieldGrid>
          </>
        ) : null}

        {currentStep === 2 ? (
          <>
            <FieldGrid className="md:grid-cols-1">
              <div className="grid gap-[0.46rem]">
                <Field label="CEP" name="zipCode" placeholder="00000-000" value={zipCode} onChange={handleZipFieldChange} onBlur={handleZipCodeBlur} error={fieldErrors.zipCode} required />
                {!fieldErrors.zipCode && cepStatus.message ? (
                  <p className={`text-[0.78rem] leading-[1.35] ${cepStatus.tone === "error" ? "text-[#a14b3b]" : cepStatus.tone === "success" ? "text-[#4f6b3c]" : "text-[var(--color-muted)]"}`}>
                    {cepStatus.message}
                  </p>
                ) : null}
              </div>
            </FieldGrid>

            <FieldGrid>
              <Field label="Rua/Avenida" name="street" placeholder="Rua ou avenida" value={addressFields.street} onChange={(event) => handleAddressChange("street", event.target.value)} error={fieldErrors.street} required />
              <Field label="Número" name="number" placeholder="123" value={addressFields.number} onChange={(event) => handleAddressChange("number", event.target.value)} error={fieldErrors.number} required />
            </FieldGrid>

            <FieldGrid>
              <Field label="Complemento" name="complement" placeholder="Apartamento, bloco, casa 2..." value={addressFields.complement} onChange={(event) => handleComplementChange(event.target.value)} />
              <Field label="Bairro" name="neighborhood" placeholder="Seu bairro" value={addressFields.neighborhood} onChange={(event) => handleAddressChange("neighborhood", event.target.value)} error={fieldErrors.neighborhood} required />
            </FieldGrid>

            <FieldGrid>
              <Field label="Cidade" name="city" placeholder="Sua cidade" value={addressFields.city} onChange={(event) => handleAddressChange("city", event.target.value)} error={fieldErrors.city} required />
              <Field label="Estado (UF)" name="state" placeholder="SP" maxLength={2} value={addressFields.state} onChange={(event) => handleAddressChange("state", event.target.value.toUpperCase())} error={fieldErrors.state} required />
            </FieldGrid>

            <div className="rounded-[1.15rem] border border-[rgba(104,64,49,0.05)] bg-[rgba(255,255,255,0.5)] p-2.5">
              <div className="rounded-[0.95rem] border border-[rgba(104,64,49,0.07)] bg-white/82 p-2.5">
                <p className="border-b border-[rgba(104,64,49,0.06)] pb-1.5 text-[0.74rem] font-bold uppercase tracking-[0.18em] text-[var(--color-brown)]">
                  Comunicação
                </p>

                <div className="mt-1.5 grid gap-1.5 md:grid-cols-3">
                  {CONSENT_OPTIONS.map((option) => (
                    <label
                      key={option.name}
                      className="flex cursor-pointer items-center gap-2 rounded-[0.75rem] border border-[rgba(104,64,49,0.06)] bg-[rgba(255,255,255,0.96)] px-2.5 py-2 transition-colors hover:border-[rgba(104,64,49,0.14)]"
                    >
                      <input
                        type="checkbox"
                        name={option.name}
                        checked={consents[option.name]}
                        onChange={handleConsentChange}
                        className="h-3.5 w-3.5 rounded border-[rgba(104,64,49,0.16)] text-[var(--color-accent)]"
                      />
                      <span className="text-[0.88rem] font-semibold leading-none text-[var(--color-brown)]">{option.title}</span>
                    </label>
                  ))}
                </div>

                <label className="mt-2 flex items-center gap-2 border-t border-[rgba(104,64,49,0.06)] pt-2 text-[0.88rem] text-[var(--color-muted)]">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={handlePrivacyConsentChange}
                    className="h-3.5 w-3.5 rounded border-[rgba(104,64,49,0.16)] text-[var(--color-accent)]"
                  />
                  <span>
                    Concordo com a <span className="font-semibold text-[var(--color-brown)]">política de privacidade</span>.
                  </span>
                </label>

                {fieldErrors.privacyConsent ? (
                  <p className="mt-1.5 text-[0.76rem] text-[#a14b3b]">{fieldErrors.privacyConsent}</p>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:justify-between">
        <SecondaryButton disabled={currentStep === 1 || isSubmitting} onClick={handlePreviousStep}>
          Voltar
        </SecondaryButton>
        {currentStep < STEP_CONFIG.length ? (
          <SubmitButton type="button" disabled={isSubmitting} onClick={handleNextStep}>
            Próxima etapa
          </SubmitButton>
        ) : (
          <SubmitButton type="button" disabled={isSubmitting} onClick={() => void handleSubmit()}>
            {isSubmitting ? "Enviando..." : "Criar conta"}
          </SubmitButton>
        )}
      </div>
    </form>
  );
}
