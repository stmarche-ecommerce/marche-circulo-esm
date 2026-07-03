"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { ApiService } from "@/app/services/api-service";
import { useSignUpForm } from "@/hooks/use-signup-form";
import { useZipCodeLookup } from "@/hooks/use-via-cep";
import { signUpSchema, type SignUpFormValues } from "@/lib/sign-up-validation";
import { ConsentOption, ConsentSection, Field, FieldGrid, SubmitButton } from ".";
import axios from "axios";

interface SignUpPayload {
  username: string;
  email: string;
  birth_date: string;
  first_name: string;
  last_name: string;
  telephone: string;
  password: string;
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

export function SignUpForm() {
  const { formData, consents, handleFieldChange, handleConsentChange } = useSignUpForm();
  const { zipCode, addressFields, cepStatus, handleZipCodeChange, handleZipCodeBlur, handleAddressFieldChange } = useZipCodeLookup();
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SignUpFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const api = new ApiService();

  const normalizeDigits = (value: string) => value.replace(/\D/g, "");

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

  const buildPayload = (): SignUpPayload => {
    const trimmedName = formData.name.trim();
    const [firstName = "", ...lastNameParts] = trimmedName.split(/\s+/);

    return {
      username: normalizeDigits(formData.cpf),
      email: formData.email.trim(),
      birth_date: formData.birthDate,
      first_name: firstName,
      last_name: lastNameParts.join(" "),
      telephone: normalizeDigits(formData.phone),
      password: formData.password,
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

  const getValidationValues = (): SignUpFormValues => ({
    name: formData.name,
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
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    privacyConsent,
  });

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      toast.error("Revise os campos obrigatorios destacados para continuar.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFieldErrors({});
      const payload = buildPayload();
      const response = await api.post("/users-v2", payload);

      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso! Seus dados foram enviados e seu acesso esta em processamento.");
        return;
      }
    } catch (err) {
      console.error("Erro ao criar usuario:", err);
      let mensagem = "Erro ao criar usuário. Tente novamente.";

      if (axios.isAxiosError(err)) {
        mensagem = err.response?.data?.message ?? err.message ?? mensagem;
      } else if (err instanceof Error) {
        mensagem = err.message;
      }
      toast.error(mensagem);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="mt-5 grid gap-[0.95rem]" onSubmit={handleSubmit} noValidate>
      <FieldGrid>
        <Field
          label="Nome completo"
          name="name"
          value={formData.name}
          onChange={handleFormFieldChange}
          placeholder="Seu nome completo"
          error={fieldErrors.name}
          required
        />
        <Field
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleFormFieldChange}
          placeholder="000.000.000-00"
          inputMode="numeric"
          maxLength={14}
          error={fieldErrors.cpf}
          required
        />
      </FieldGrid>

      <FieldGrid>
        <Field
          label="E-mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleFormFieldChange}
          placeholder="seunome@email.com"
          error={fieldErrors.email}
          required
        />
        <Field
          label="Telefone"
          name="phone"
          value={formData.phone}
          onChange={handleFormFieldChange}
          type="tel"
          placeholder="(11) 99999-9999"
          error={fieldErrors.phone}
          required
        />
      </FieldGrid>

      <FieldGrid>
        <Field
          label="Data de nascimento"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleFormFieldChange}
          type="date"
          error={fieldErrors.birthDate}
          required
        />
        <div className="grid gap-[0.46rem]">
          <Field
            label="CEP"
            name="zipCode"
            placeholder="00000-000"
            value={zipCode}
            onChange={handleZipFieldChange}
            onBlur={handleZipCodeBlur}
            error={fieldErrors.zipCode}
            required
          />
          {!fieldErrors.zipCode && cepStatus.message ? (
            <p
              className={`text-[0.78rem] leading-[1.35] ${cepStatus.tone === "error"
                ? "text-[#a14b3b]"
                : cepStatus.tone === "success"
                  ? "text-[#4f6b3c]"
                  : "text-[var(--color-muted)]"
                }`}
            >
              {cepStatus.message}
            </p>
          ) : null}
        </div>
      </FieldGrid>

      <FieldGrid>
        <Field
          label="Rua/Avenida"
          name="street"
          placeholder="Rua ou avenida"
          value={addressFields.street}
          onChange={(event) => handleAddressChange("street", event.target.value)}
          error={fieldErrors.street}
          required
        />
        <Field
          label="Numero"
          name="number"
          placeholder="123"
          value={addressFields.number}
          onChange={(event) => handleAddressChange("number", event.target.value)}
          error={fieldErrors.number}
          required
        />
      </FieldGrid>

      <FieldGrid>
        <Field
          label="Bairro"
          name="neighborhood"
          placeholder="Seu bairro"
          value={addressFields.neighborhood}
          onChange={(event) => handleAddressChange("neighborhood", event.target.value)}
          error={fieldErrors.neighborhood}
          required
        />
        <Field
          label="Cidade"
          name="city"
          placeholder="Sua cidade"
          value={addressFields.city}
          onChange={(event) => handleAddressChange("city", event.target.value)}
          error={fieldErrors.city}
          required
        />
      </FieldGrid>

      <Field
        label="Estado (UF)"
        name="state"
        placeholder="SP"
        maxLength={2}
        value={addressFields.state}
        onChange={(event) => handleAddressChange("state", event.target.value.toUpperCase())}
        error={fieldErrors.state}
        required
      />

      <Field
        label="Complemento"
        name="complement"
        placeholder="Apartamento, bloco, casa 2..."
        value={addressFields.complement}
        onChange={(event) => handleComplementChange(event.target.value)}
      />

      <FieldGrid className="md:grid-cols-2">
        <Field
          label="Senha"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleFormFieldChange}
          placeholder="Crie uma senha"
          error={fieldErrors.password}
          required
        />
        <Field
          label="Confirmar senha"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleFormFieldChange}
          placeholder="Repita a senha"
          error={fieldErrors.confirmPassword}
          required
        />
      </FieldGrid>

      <ConsentSection
        privacyConsentChecked={privacyConsent}
        onPrivacyConsentChange={handlePrivacyConsentChange}
        privacyConsentError={fieldErrors.privacyConsent}
      >
        <ConsentOption
          name="optInEmail"
          title="E-mail"
          description="Novidades, beneficios e comunicados."
          checked={consents.optInEmail}
          handleConsentChange={handleConsentChange}
        />
        <ConsentOption
          name="optInWhatsApp"
          title="WhatsApp"
          description="Alertas e mensagens diretas no celular."
          checked={consents.optInWhatsApp}
          handleConsentChange={handleConsentChange}
        />
        <ConsentOption
          name="optInSms"
          title="SMS"
          description="Avisos curtos e confirmacoes importantes."
          checked={consents.optInSms}
          handleConsentChange={handleConsentChange}
        />
      </ConsentSection>

      <SubmitButton disabled={isSubmitting}>{isSubmitting ? "Enviando..." : "Criar conta"}</SubmitButton>
    </form>
  );
}
