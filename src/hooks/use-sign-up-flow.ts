import { useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSignUpForm } from "@/hooks/use-signup-form";
import { useZipCodeLookup } from "@/hooks/use-via-cep";
import { signUpSchema, type SignUpFormValues } from "@/lib/sign-up-validation";

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

export const CONSENT_OPTIONS = [
  { name: "optInEmail", title: "E-mail" },
  { name: "optInWhatsApp", title: "WhatsApp" },
  { name: "optInSms", title: "SMS" },
] as const;

export function useSignUpFlow() {
  const { formData, consents, handleFieldChange, handleConsentChange, resetForm } = useSignUpForm();
  const { zipCode, addressFields, cepStatus, resetZipCodeLookup, handleZipCodeChange, handleZipCodeBlur, handleAddressFieldChange } = useZipCodeLookup();
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SignUpFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const submissionLockRef = useRef(false);

  const currentStepConfig = STEP_CONFIG[currentStep - 1];
  const progressValue = `${(currentStep / STEP_CONFIG.length) * 100}%`;
  const stepContentMinHeight = currentStep === 1 ? "md:min-h-[15rem]" : "md:min-h-[23rem]";

  const stepErrors = useMemo(
    () => currentStepConfig.fields.filter((field) => fieldErrors[field]),
    [currentStepConfig.fields, fieldErrors],
  );

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

  const handlePrivacyConsentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrivacyConsent(event.target.checked);
    clearFieldError("privacyConsent");
  };

  const handleFormFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange(event);
    clearFieldError(event.target.name as keyof SignUpFormValues);
  };

  const handleZipFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    const nextErrors: Partial<Record<keyof SignUpFormValues, string>> = {};

    if (!validationResult.success) {
      const stepFields = new Set(STEP_CONFIG[step - 1].fields);
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof SignUpFormValues | undefined;
        if (fieldName && stepFields.has(fieldName) && !nextErrors[fieldName]) {
          nextErrors[fieldName] = issue.message;
        }
      }
    }

    setFieldErrors((current) => {
      const merged = { ...current };
      for (const field of STEP_CONFIG[step - 1].fields) delete merged[field];
      return { ...merged, ...nextErrors };
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
      toast.error("Conclua os campos obrigatorios da etapa atual antes de avancar.");
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

  const resetSignUpFlow = () => {
    resetForm();
    resetZipCodeLookup();
    setPrivacyConsent(false);
    setFieldErrors({});
    setCurrentStep(1);
  };

  const sendSignupConfirmation = async ({ email, name }: SignupConfirmationPayload) => {
    const startedAt = performance.now();
    const response = await fetch("/api/signup-confirmation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    });
    const finishedAt = performance.now();

    console.info("[signup] /api/signup-confirmation concluido", {
      durationMs: Math.round(finishedAt - startedAt),
      status: response.status,
    });

    if (!response.ok) {
      const responseBody = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(responseBody?.message || "Falha ao enviar e-mail de confirmacao.");
    }
  };

  const handleSubmit = async () => {
    if (submissionLockRef.current || isSubmitting) {
      return;
    }

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

    const submitStartedAt = performance.now();

    try {
      submissionLockRef.current = true;
      setIsSubmitting(true);
      setFieldErrors({});
      const payload = buildPayload();

      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseBody = (await response.json().catch(() => null)) as { message?: string } | null;
      const apiMessage = responseBody?.message ?? "";
      const isSignupSuccessful = response.ok;

      if (isSignupSuccessful) {
        void sendSignupConfirmation({
          email: payload.email,
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
        }).catch((emailError) => {
          console.error("Erro ao enviar e-mail de confirmacao:", emailError);
          const warningMessage = emailError instanceof Error
            ? emailError.message
            : "Cadastro realizado, mas o e-mail de confirmacao nao foi enviado.";
          toast.warn(warningMessage);
        });

        resetSignUpFlow();
        toast.success("Cadastro realizado com sucesso! Seus dados foram enviados e seu acesso esta em processamento.");
        return;
      }

      const normalizedMessage = apiMessage.toLowerCase();

      if (
        response.status === 409 ||
        normalizedMessage.includes("username") ||
        normalizedMessage.includes("email") ||
        normalizedMessage.includes("telephone") ||
        normalizedMessage.includes("already exists")
      ) {
        toast.info("Já existe um cadastro com este e-mail, CPF ou telefone. Use outros dados.");
        return;
      }

      if (response.status === 504) {
        toast.info("O cadastro demorou mais do que o esperado para ser processado. Tente novamente em alguns instantes.");
        return;
      }

      toast.info(apiMessage || "Erro ao criar usuario. Tente novamente.");
    } catch (err) {
      const submitFinishedAt = performance.now();

      console.error("[signup] falha no envio", {
        durationMs: Math.round(submitFinishedAt - submitStartedAt),
        error: err instanceof Error ? err.message : String(err),
      });

      let mensagem = "Erro ao criar usuario. Tente novamente.";

      if (axios.isAxiosError(err)) {
        console.error("Erro ao criar usuario:", err);
        mensagem = err.message || mensagem;
      } else if (err instanceof Error) {
        console.error("Erro ao criar usuario:", err);
        mensagem = err.message;
      } else {
        console.error("Erro ao criar usuario:", err);
      }

      toast.info(mensagem);
    } finally {
      submissionLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleStepKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
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

  return {
    addressFields,
    cepStatus,
    consents,
    currentStep,
    currentStepConfig,
    fieldErrors,
    formData,
    handleAddressChange,
    handleComplementChange,
    handleConsentChange,
    handleFormFieldChange,
    handleNextStep,
    handlePreviousStep,
    handlePrivacyConsentChange,
    handleStepClick,
    handleStepKeyDown,
    handleSubmit,
    handleZipCodeBlur,
    handleZipFieldChange,
    isSubmitting,
    privacyConsent,
    progressValue,
    stepContentMinHeight,
    stepErrors,
    zipCode,
  };
}