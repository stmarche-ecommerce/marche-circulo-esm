"use client";

import { ConsentOption, Field, FieldGrid, SubmitButton } from "@/components/forms";
import { useProfileForm, type SectionId } from "@/hooks/use-profile-form";

const TAB_ICONS: Record<SectionId, React.ReactNode> = {
  identification: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  contact: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  address: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  preferences: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  ),
};

const TABS: Array<{ id: SectionId; label: string }> = [
  { id: "identification", label: "Identificacao" },
  { id: "contact", label: "Contato" },
  { id: "address", label: "Endereco" },
  { id: "preferences", label: "Preferencias" },
];

export default function PerfilPage() {
  const {
    user,
    formData,
    address,
    consents,
    fieldErrors,
    isSubmitting,
    isLoadingProfile,
    isDirty,
    activeSection,
    formTopRef,
    setActiveSection,
    handleFieldChange,
    handleAddressChange,
    handleConsentChange,
    handleSubmit,
    sectionHasErrors,
    sectionIsComplete,
  } = useProfileForm();

  if (isLoadingProfile) {
    return (
      <section className="rounded-[1.9rem] border border-[rgba(104,64,49,0.08)] bg-white p-6 shadow-[0_18px_40px_rgba(71,42,35,0.06)] md:p-8">
        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent)]">Meu cadastro</p>
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-[0.08em] text-[var(--color-brown)]">Atualize seus dados</h1>
        <p className="mt-6 text-sm leading-7 text-[var(--color-muted)]">Carregando seus dados cadastrais...</p>
      </section>
    );
  }

  return (
    <section
      ref={formTopRef}
      className="rounded-[1.9rem] border border-[rgba(104,64,49,0.08)] bg-white p-6 shadow-[0_18px_40px_rgba(71,42,35,0.06)] md:p-8"
    >
      <div className="max-w-3xl">
        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent)]">Meu cadastro</p>
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-[0.08em] text-[var(--color-brown)]">Atualize seus dados</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] md:text-base">
          Edite seus dados cadastrais e as preferencias de comunicacao do Circulo Santa Maria.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Secoes do cadastro"
        className="mt-8 -mx-1 flex gap-2 overflow-x-auto border-b border-[rgba(104,64,49,0.1)] px-1 pb-3"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeSection;
          const hasError = sectionHasErrors(tab.id);
          const isComplete = !hasError && sectionIsComplete(tab.id) && tab.id !== "preferences";

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSection(tab.id)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full py-2 pr-4 text-[0.82rem] font-bold uppercase tracking-[0.08em] transition-colors ${isComplete ? "pl-8" : "pl-4"} ${isActive ? "bg-[var(--color-brown)] text-white" : "bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-brown)]"}`}
            >
              <span className={isActive ? "text-[var(--color-gold,#d4a94a)]" : ""}>{TAB_ICONS[tab.id]}</span>
              {tab.label}
              {hasError ? (
                <span aria-label="Esta secao tem campos com erro" className="absolute left-3 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500" />
              ) : isComplete ? (
                <span
                  aria-label="Secao preenchida"
                  className="absolute left-3 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_4px_10px_rgba(16,185,129,0.28)]"
                >
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5 6.5 11.5 12.5 5.5" />
                  </svg>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-[1.5rem] bg-[var(--color-surface)] p-5 pb-8">
        {activeSection === "identification" ? (
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Identificacao</p>
            <FieldGrid className="mt-4 md:grid-cols-2">
              <Field
                label="Nome"
                name="firstName"
                value={formData.firstName}
                onChange={handleFieldChange}
                placeholder="Seu nome"
                error={fieldErrors.firstName}
                required
              />
              <Field
                label="Sobrenome"
                name="lastName"
                value={formData.lastName}
                onChange={handleFieldChange}
                placeholder="Seu sobrenome"
                error={fieldErrors.lastName}
                required
              />
            </FieldGrid>

            <FieldGrid className="mt-4 md:grid-cols-1">
              <Field
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleFieldChange}
                placeholder="000.000.000-00"
                error={fieldErrors.cpf}
                disabled
              />
            </FieldGrid>
          </div>
        ) : null}

        {activeSection === "contact" ? (
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Contato</p>
            <FieldGrid className="mt-4 md:grid-cols-2">
              <Field
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFieldChange}
                placeholder="seunome@email.com"
                error={fieldErrors.email}
                required
              />
              <Field
                label="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleFieldChange}
                placeholder="(11) 99999-9999"
                error={fieldErrors.phone}
                required
              />
            </FieldGrid>

            <FieldGrid className="mt-4 md:grid-cols-2">
              <Field
                label="Data de nascimento"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleFieldChange}
                error={fieldErrors.birthDate}
                required
              />
              {/* <Field
                label="Nova senha"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleFieldChange}
                placeholder="Preencha apenas se quiser trocar"
                error={fieldErrors.password}
                hint="Deixe em branco para manter a senha atual."
                allowPasswordToggle
              /> */}
            </FieldGrid>
          </div>
        ) : null}

        {activeSection === "address" ? (
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Endereco</p>
            <FieldGrid className="mt-4 md:grid-cols-2">
              <Field
                label="CEP"
                name="zipCode"
                value={address.zipCode}
                onChange={(event) => handleAddressChange("zipCode", event.target.value)}
                placeholder="00000-000"
                error={fieldErrors.zipCode}
                required
              />
              <Field
                label="Complemento"
                name="complement"
                value={address.complement}
                onChange={(event) => handleAddressChange("complement", event.target.value)}
                placeholder="Apartamento, bloco, casa 2..."
                error={fieldErrors.complement}
              />
            </FieldGrid>

            <FieldGrid className="mt-4 md:grid-cols-2">
              <Field
                label="Rua/Avenida"
                name="street"
                value={address.street}
                onChange={(event) => handleAddressChange("street", event.target.value)}
                placeholder="Rua ou avenida"
                error={fieldErrors.street}
                required
              />
              <Field
                label="Numero"
                name="number"
                value={address.number}
                onChange={(event) => handleAddressChange("number", event.target.value)}
                placeholder="123"
                error={fieldErrors.number}
                required
              />
            </FieldGrid>

            <FieldGrid className="mt-4 md:grid-cols-2">
              <Field
                label="Bairro"
                name="neighborhood"
                value={address.neighborhood}
                onChange={(event) => handleAddressChange("neighborhood", event.target.value)}
                placeholder="Seu bairro"
                error={fieldErrors.neighborhood}
                required
              />
              <Field
                label="Cidade"
                name="city"
                value={address.city}
                onChange={(event) => handleAddressChange("city", event.target.value)}
                placeholder="Sua cidade"
                error={fieldErrors.city}
                required
              />
            </FieldGrid>

            <FieldGrid className="mt-4 md:grid-cols-1">
              <Field
                label="Estado (UF)"
                name="state"
                value={address.state}
                onChange={(event) => handleAddressChange("state", event.target.value.toUpperCase())}
                placeholder="SP"
                maxLength={2}
                error={fieldErrors.state}
                required
              />
            </FieldGrid>
          </div>
        ) : null}

        {activeSection === "preferences" ? (
          <fieldset>
            <legend className="px-1 text-[0.82rem] font-bold uppercase tracking-[0.16em] text-[var(--color-brown)]">
              Preferencias de comunicacao
            </legend>
            <p className="mt-2 text-[0.84rem] leading-[1.45] text-[var(--color-muted)]">
              Escolha os canais autorizados para comunicados, beneficios e notificacoes do ESM.
            </p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              <ConsentOption
                name="optInEmail"
                title="E-mail"
                description="Novidades, beneficios e comunicados."
                checked={consents.optInEmail}
                handleConsentChange={handleConsentChange}
              />
              <ConsentOption
                name="optInPush"
                title="Push"
                description="Alertas rapidos sobre novidades e beneficios."
                checked={consents.optInPush}
                handleConsentChange={handleConsentChange}
              />
              <ConsentOption
                name="optInSms"
                title="SMS"
                description="Avisos curtos e confirmacoes importantes."
                checked={consents.optInSms}
                handleConsentChange={handleConsentChange}
              />
              <ConsentOption
                name="optInWhatsApp"
                title="WhatsApp"
                description="Mensagens diretas e contatos prioritarios."
                checked={consents.optInWhatsApp}
                handleConsentChange={handleConsentChange}
              />
            </div>
          </fieldset>
        ) : null}
      </div>

      <div className="sticky bottom-0 -mx-6 -mb-6 flex items-center justify-between gap-3 border-t border-[rgba(104,64,49,0.1)] bg-white/95 px-6 py-4 backdrop-blur md:-mx-8 md:-mb-8 md:px-8">
        <p className="text-[0.8rem] text-[var(--color-muted)]">{isDirty ? "Voce tem alteracoes nao salvas." : "Tudo salvo."}</p>
        <SubmitButton type="button" disabled={isSubmitting || !user} onClick={() => void handleSubmit()}>
          {isSubmitting ? "Salvando..." : "Salvar alteracoes"}
        </SubmitButton>
      </div>
    </section>
  );
}
