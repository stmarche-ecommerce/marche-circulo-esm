"use client";

import { useSignUpFlow, CONSENT_OPTIONS } from "@/hooks/use-sign-up-flow";
import { Field, FieldGrid, SecondaryButton, SubmitButton } from ".";
import Link from "next/link";

export function SignUpForm() {
  const {
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
  } = useSignUpFlow();

  return (
    <form className="mt-5 grid gap-[0.95rem]" onKeyDown={handleStepKeyDown} noValidate>
      <div className="grid gap-4 rounded-[1.35rem] border border-[rgba(104,64,49,0.1)] bg-[rgba(255,255,255,0.74)] p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Etapa {currentStep} de 2
            </p>
            <h2 className="mt-1 text-[1.15rem] font-bold uppercase tracking-[0.08em] text-[var(--color-brown)]">
              {currentStepConfig.title}
            </h2>
            <p className="mt-1 text-[0.88rem] leading-[1.5] text-[var(--color-muted)]">{currentStepConfig.description}</p>
          </div>
          <div className="flex gap-2 self-stretch md:self-start">
            {[1, 2].map((step) => {
              const isActive = step === currentStep;
              const isCompleted = step < currentStep;
              const isFutureStep = step > currentStep;

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => handleStepClick(step as 1 | 2)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border text-[0.82rem] font-bold ${isActive
                    ? "border-[var(--color-brown)] bg-[var(--color-brown)] text-white"
                    : isCompleted
                      ? "border-[var(--color-accent)] bg-[rgba(213,166,66,0.14)] text-[var(--color-brown)]"
                      : "border-[rgba(104,64,49,0.14)] bg-white text-[var(--color-muted)]"
                    } ${isFutureStep ? "cursor-not-allowed opacity-50" : ""}`}
                  aria-label={`Ir para etapa ${step}: ${step === 1 ? "Identificação" : "Endereco e preferências"}`}
                  aria-disabled={isFutureStep}
                >
                  {step}
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
          <p className="text-[0.8rem] leading-[1.4] text-[#a14b3b]">Existem campos obrigatorios pendentes nesta etapa.</p>
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
              <Field label="WhatsApp" name="phone" value={formData.phone} onChange={handleFormFieldChange} type="tel" inputMode="numeric" maxLength={15} placeholder="(11) 99999-9999" error={fieldErrors.phone} required />
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
              <Field label="Numero" name="number" placeholder="123" value={addressFields.number} onChange={(event) => handleAddressChange("number", event.target.value)} error={fieldErrors.number} required />
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

                <span>Aceito receber ofertas, novidades e benefícios exclusivos pelos canais selecionados</span>

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
                    Concordo com a <Link href="/politica-privacidade" className="font-semibold text-[var(--color-brown)]">Política de privacidade</Link>.
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
        {currentStep < 2 ? (
          <SubmitButton type="button" disabled={isSubmitting} onClick={handleNextStep}>
            Próxima etapa
          </SubmitButton>
        ) : (
          <SubmitButton type="button" disabled={isSubmitting} loading={isSubmitting} onClick={() => void handleSubmit()}>
            {isSubmitting ? "Enviando..." : "Criar conta"}
          </SubmitButton>
        )}
      </div>
    </form>
  );
}