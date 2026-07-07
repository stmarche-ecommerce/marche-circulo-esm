"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/auth-context";
import {
  ConsentOption,
  Field,
  FieldGrid,
  SubmitButton,
} from "@/components/forms";
import { profileSchema, type ProfileFormValues } from "@/lib/profile-validation";
import { formatCpf } from "@/lib/sign-up-validation";
import { ApiService } from "@/services/api-service";

type AddressFields = {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement: string;
};

type ConsentState = {
  optInEmail: boolean;
  optInPush: boolean;
  optInSms: boolean;
  optInWhatsApp: boolean;
};

type ProfileFieldErrors = Partial<Record<keyof ProfileFormValues, string>>;


type SectionId = "identification" | "contact" | "address" | "preferences";

const SECTION_FIELDS: Record<SectionId, Array<keyof ProfileFormValues>> = {
  identification: ["name", "cpf"],
  contact: ["email", "phone", "birthDate", "password"],
  address: ["zipCode", "street", "number", "neighborhood", "city", "state", "complement"],
  preferences: ["optInEmail", "optInPush", "optInSms", "optInWhatsApp"],
};

type ProfileApiResponse = {
  username?: string;
  email?: string;
  birth_date?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  telephone?: string;
  allow_communications?: boolean;
  address?: {
    street?: string;
    number?: string;
    district?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    complement?: string;
  };
  data?: {
    allow_communications?: boolean;
    zip_code?: string;
    address?: {
      street?: string;
      number?: string;
      district?: string;
      city?: string;
      state?: string;
      complement?: string;
    };
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
      whatsapp?: boolean;
    };
  };
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  complement?: string;
};

const EMPTY_ADDRESS: AddressFields = {
  street: "",
  number: "",
  neighborhood: "",
  city: "",
  state: "",
  zipCode: "",
  complement: "",
};

const INITIAL_CONSENTS: ConsentState = {
  optInEmail: false,
  optInPush: false,
  optInSms: false,
  optInWhatsApp: false,
};

const ADDRESS_FIELD_NAMES = new Set<keyof ProfileFormValues>([
  "zipCode",
  "street",
  "number",
  "neighborhood",
  "city",
  "state",
  "complement",
]);

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const formatPhone = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

const formatZipCode = (value: string) => {
  const digits = onlyDigits(value).slice(0, 8);

  return digits.replace(/^(\d{5})(\d)/, "$1-$2");
};

const splitName = (name: string) => {
  const trimmedName = name.trim();
  const [firstName = "", ...lastNameParts] = trimmedName.split(/\s+/);

  return {
    firstName,
    lastName: lastNameParts.join(" "),
  };
};

const buildFullName = (profile: ProfileApiResponse) => {
  if (profile.name?.trim()) {
    return profile.name.trim();
  }

  return [profile.first_name?.trim(), profile.last_name?.trim()]
    .filter(Boolean)
    .join(" ");
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const responseData =
      error.response?.data && typeof error.response.data === "object"
        ? (error.response.data as Record<string, unknown>)
        : undefined;

    return (
      (typeof responseData?.message === "string" && responseData.message) ||
      (typeof responseData?.error === "string" && responseData.error) ||
      error.message ||
      fallback
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

/** Finds the first section (in declaration order) that contains an error field. */
const findFirstSectionWithErrors = (errors: ProfileFieldErrors): SectionId | null => {
  const sectionIds = Object.keys(SECTION_FIELDS) as SectionId[];
  const section = sectionIds.find((id) =>
    SECTION_FIELDS[id].some((field) => Boolean(errors[field])),
  );

  return section ?? null;
};

const sectionHasErrors = (sectionId: SectionId, errors: ProfileFieldErrors) =>
  SECTION_FIELDS[sectionId].some((field) => Boolean(errors[field]));

const sectionIsComplete = (
  sectionId: SectionId,
  formData: { name: string; cpf: string; email: string; phone: string; birthDate: string },
  address: AddressFields,
) => {
  switch (sectionId) {
    case "identification":
      return Boolean(formData.name.trim() && formData.cpf.trim());
    case "contact":
      return Boolean(formData.email.trim() && formData.phone.trim() && formData.birthDate.trim());
    case "address":
      return Boolean(
        address.zipCode.trim() &&
        address.street.trim() &&
        address.number.trim() &&
        address.neighborhood.trim() &&
        address.city.trim() &&
        address.state.trim(),
      );
    case "preferences":
      // Preferences are optional by nature — never flagged as incomplete.
      return true;
    default:
      return false;
  }
};

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
  const api = useMemo(() => new ApiService(), []);
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    cpf: user?.cpf ? formatCpf(user.cpf) : "",
    email: user?.email ?? "",
    phone: "",
    birthDate: "",
    password: "",
  });
  const [address, setAddress] = useState<AddressFields>(EMPTY_ADDRESS);
  const [consents, setConsents] = useState<ConsentState>(INITIAL_CONSENTS);
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("identification");

  const formTopRef = useRef<HTMLDivElement | null>(null);

  const userRef = useRef(user);
  // eslint-disable-next-line react-hooks/refs
  userRef.current = user;

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {

      if (!user) {
        throw new Error(`Houve um erro ao tentar obter os dados do cliente. ID: ${user}`)
      }

      try {
        setIsLoadingProfile(true);
        const response = await api.get(`/users-v2?id=${user.id}`);
        const profile = response.data as ProfileApiResponse;
        const notifications = profile.data?.notifications;
        const nestedAddress = profile.data?.address;
        const fullName = buildFullName(profile);
        const currentUser = userRef.current;
        const resolvedCpf = onlyDigits(profile.username ?? currentUser?.cpf ?? "");

        if (cancelled) {
          return;
        }

        setFormData({
          name: fullName || currentUser?.name || "",
          cpf: resolvedCpf
            ? formatCpf(resolvedCpf)
            : currentUser?.cpf
              ? formatCpf(currentUser.cpf)
              : "",
          email: profile.email?.trim() ?? currentUser?.email ?? "",
          phone: formatPhone(profile.telephone ?? ""),
          birthDate: profile.birth_date ?? "",
          password: "",
        });

        setAddress({
          street:
            nestedAddress?.street?.trim() ??
            profile.address?.street?.trim() ??
            profile.street?.trim() ??
            "",
          number:
            nestedAddress?.number?.trim() ??
            profile.address?.number?.trim() ??
            profile.number?.trim() ??
            "",
          neighborhood:
            nestedAddress?.district?.trim() ??
            profile.address?.district?.trim() ??
            profile.district?.trim() ??
            "",
          city:
            nestedAddress?.city?.trim() ??
            profile.address?.city?.trim() ??
            profile.city?.trim() ??
            "",
          state:
            nestedAddress?.state?.trim() ??
            profile.address?.state?.trim() ??
            profile.state?.trim() ??
            "",
          zipCode: formatZipCode(
            profile.data?.zip_code ??
            profile.address?.zip_code ??
            profile.zip_code ??
            "",
          ),
          complement:
            nestedAddress?.complement?.trim() ??
            profile.address?.complement?.trim() ??
            profile.complement?.trim() ??
            "",
        });

        setConsents({
          optInEmail:
            typeof notifications?.email === "boolean"
              ? notifications.email
              : Boolean(profile.data?.allow_communications ?? profile.allow_communications),
          optInPush: Boolean(notifications?.push),
          optInSms:
            typeof notifications?.sms === "boolean"
              ? notifications.sms
              : Boolean(profile.data?.allow_communications ?? profile.allow_communications),
          optInWhatsApp:
            typeof notifications?.whatsapp === "boolean"
              ? notifications.whatsapp
              : Boolean(profile.data?.allow_communications ?? profile.allow_communications),
        });

        const nextName = fullName || currentUser?.name || "";
        const nextEmail = profile.email?.trim() ?? currentUser?.email ?? "";
        const nextCpf = resolvedCpf || currentUser?.cpf;

        if (
          nextName !== currentUser?.name ||
          nextEmail !== currentUser?.email ||
          nextCpf !== currentUser?.cpf
        ) {
          updateUser({ name: nextName, email: nextEmail, cpf: nextCpf });
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(getApiErrorMessage(error, "Nao foi possivel carregar os dados do perfil."));
        }
      } finally {
        if (!cancelled) {
          setIsLoadingProfile(false);
        }
      }
    }

    void loadProfile();

    return () => {
      cancelled = true;
    };
    // Runs once on mount: `api` is a stable useMemo instance and the latest
    // `user` is read via `userRef` to avoid re-triggering this fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const clearFieldError = useCallback((fieldName: keyof ProfileFormValues) => {
    setFieldErrors((current) => {
      if (!current[fieldName]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[fieldName];
      return nextErrors;
    });
  }, []);

  const getValidationValues = useCallback(
    (): ProfileFormValues => ({
      name: formData.name,
      cpf: formData.cpf,
      email: formData.email,
      phone: formData.phone,
      birthDate: formData.birthDate,
      zipCode: address.zipCode,
      street: address.street,
      number: address.number,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      complement: address.complement,
      password: formData.password,
      optInEmail: consents.optInEmail,
      optInPush: consents.optInPush,
      optInSms: consents.optInSms,
      optInWhatsApp: consents.optInWhatsApp,
    }),
    [formData, address, consents],
  );

  const markDirty = useCallback(() => setIsDirty(true), []);

  const handleFieldChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      let nextValue = value;

      if (name === "phone") {
        nextValue = formatPhone(value);
      }

      if (name === "cpf") {
        nextValue = formatCpf(value);
      }

      setFormData((current) => ({
        ...current,
        [name]: nextValue,
      }));
      clearFieldError(name as keyof ProfileFormValues);
      markDirty();
    },
    [clearFieldError, markDirty],
  );

  const handleAddressChange = useCallback(
    (field: keyof AddressFields, value: string) => {
      setAddress((current) => ({
        ...current,
        [field]: field === "zipCode" ? formatZipCode(value) : value,
      }));

      // Address field names map 1:1 onto ProfileFormValues field names.
      if (ADDRESS_FIELD_NAMES.has(field as keyof ProfileFormValues)) {
        clearFieldError(field as keyof ProfileFormValues);
      }
      markDirty();
    },
    [clearFieldError, markDirty],
  );

  const handleConsentChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;

      setConsents((current) => ({
        ...current,
        [name]: checked,
      }));
      clearFieldError(name as keyof ProfileFormValues);
      markDirty();
    },
    [clearFieldError, markDirty],
  );

  const goToSection = useCallback((sectionId: SectionId) => {
    setActiveSection(sectionId);
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSubmit = useCallback(async () => {
    const validationResult = profileSchema.safeParse(getValidationValues());

    if (!validationResult.success) {
      const nextErrors: ProfileFieldErrors = {};

      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof ProfileFormValues | undefined;

        if (fieldName && !nextErrors[fieldName]) {
          nextErrors[fieldName] = issue.message;
        }
      }

      setFieldErrors(nextErrors);

      const sectionWithErrors = findFirstSectionWithErrors(nextErrors);
      if (sectionWithErrors) {
        goToSection(sectionWithErrors);
      }

      toast.error("Revise os campos destacados antes de salvar.");
      return;
    }

    const cpf = onlyDigits(formData.cpf);

    if (!cpf) {
      toast.error("Nao foi possivel identificar o CPF do cadastro.");
      return;
    }

    const { firstName, lastName } = splitName(formData.name);

    try {
      setIsSubmitting(true);
      setFieldErrors({});

      const payload: Record<string, unknown> = {
        email: formData.email.trim(),
        birth_date: formData.birthDate,
        first_name: firstName,
        last_name: lastName,
        telephone: onlyDigits(formData.phone),
        allow_communications:
          consents.optInEmail || consents.optInPush || consents.optInSms || consents.optInWhatsApp,
        address: {
          street: address.street.trim(),
          number: address.number.trim(),
          district: address.neighborhood.trim(),
          city: address.city.trim(),
          state: address.state.trim().toUpperCase(),
          zip_code: onlyDigits(address.zipCode),
          complement: address.complement.trim(),
        },
        data: {
          notifications: {
            email: consents.optInEmail,
            push: consents.optInPush,
            sms: consents.optInSms,
            whatsapp: consents.optInWhatsApp,
          },
        },
      };

      if (formData.password.trim()) {
        payload.password = formData.password.trim();
      }

      await api.put(`/users-v2/${cpf}`, payload);

      updateUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        cpf,
      });

      setFormData((current) => ({
        ...current,
        password: "",
      }));

      setIsDirty(false);
      toast.success("Cadastro atualizado com sucesso.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Nao foi possivel atualizar o cadastro."));
    } finally {
      setIsSubmitting(false);
    }
  }, [address, api, consents, formData, getValidationValues, goToSection, updateUser]);

  if (isLoadingProfile) {
    return (
      <section className="rounded-[1.9rem] border border-[rgba(104,64,49,0.08)] bg-white p-6 shadow-[0_18px_40px_rgba(71,42,35,0.06)] md:p-8">
        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent)]">
          Meu cadastro
        </p>
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-[0.08em] text-[var(--color-brown)]">
          Atualize seus dados
        </h1>
        <p className="mt-6 text-sm leading-7 text-[var(--color-muted)]">
          Carregando seus dados cadastrais...
        </p>
      </section>
    );
  }

  return (
    <section
      ref={formTopRef}
      className="rounded-[1.9rem] border border-[rgba(104,64,49,0.08)] bg-white p-6 shadow-[0_18px_40px_rgba(71,42,35,0.06)] md:p-8"
    >
      <div className="max-w-3xl">
        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-accent)]">
          Meu cadastro
        </p>
        <h1 className="mt-3 text-3xl font-bold uppercase tracking-[0.08em] text-[var(--color-brown)]">
          Atualize seus dados
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)] md:text-base">
          Edite seus dados cadastrais e as preferencias de comunicacao do Circulo Santa Maria.
        </p>
      </div>

      {/* Tab nav: scrolls horizontally on narrow screens instead of wrapping,
          so it never eats vertical space that pushes fields further down. */}
      <div
        role="tablist"
        aria-label="Secoes do cadastro"
        className="mt-8 -mx-1 flex gap-2 overflow-x-auto border-b border-[rgba(104,64,49,0.1)] px-1 pb-3"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeSection;
          const hasError = sectionHasErrors(tab.id, fieldErrors);
          const isComplete =
            !hasError && sectionIsComplete(tab.id, formData, address) && tab.id !== "preferences";

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveSection(tab.id)}
              className={`relative flex shrink-0 items-center gap-2 rounded-full py-2 pr-4 text-[0.82rem] font-bold uppercase tracking-[0.08em] transition-colors ${isComplete ? "pl-8" : "pl-4"} ${isActive
                ? "bg-[var(--color-brown)] text-white"
                : "bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-[var(--color-brown)]"
                }`}
            >
              <span className={isActive ? "text-[var(--color-gold,#d4a94a)]" : ""}>
                {TAB_ICONS[tab.id]}
              </span>
              {tab.label}
              {hasError ? (
                <span
                  aria-label="Esta secão tem campos com erro"
                  className="absolute left-3 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500"
                />
              ) : isComplete ? (
                <span
                  aria-label="Secao preenchida"
                  className="absolute left-3 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_4px_10px_rgba(16,185,129,0.28)]"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.5 8.5 6.5 11.5 12.5 5.5" />
                  </svg>
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* No nested scroll here on purpose: each tab only shows its own fields,
          so the section is always short enough to fit without an inner
          scrollbar — the page itself scrolls if needed. */}
      <div className="mt-6 rounded-[1.5rem] bg-[var(--color-surface)] p-5 pb-8">
        {activeSection === "identification" ? (
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Identificacao
            </p>
            <FieldGrid className="mt-4 md:grid-cols-2">
              <Field
                label="Nome completo"
                name="name"
                value={formData.name}
                onChange={handleFieldChange}
                placeholder="Seu nome completo"
                error={fieldErrors.name}
                required
              />
              <Field
                label="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleFieldChange}
                placeholder="000.000.000-00"
                error={fieldErrors.cpf}
                disabled
              // hint="O CPF identifica seu cadastro e nao pode ser alterado aqui."
              />
            </FieldGrid>
          </div>
        ) : null}

        {activeSection === "contact" ? (
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Contato
            </p>
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
              <Field
                label="Nova senha"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleFieldChange}
                placeholder="Preencha apenas se quiser trocar"
                error={fieldErrors.password}
                hint="Deixe em branco para manter a senha atual."
              />
            </FieldGrid>
          </div>
        ) : null}

        {activeSection === "address" ? (
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Endereco
            </p>
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

      {/* Sticky save bar stays at the bottom of the viewport regardless of tab. */}
      <div className="sticky bottom-0 -mx-6 -mb-6 flex items-center justify-between gap-3 border-t border-[rgba(104,64,49,0.1)] bg-white/95 px-6 py-4 backdrop-blur md:-mx-8 md:-mb-8 md:px-8">
        <p className="text-[0.8rem] text-[var(--color-muted)]">
          {isDirty ? "Voce tem alteracoes nao salvas." : "Tudo salvo."}
        </p>
        <SubmitButton
          type="button"
          disabled={isSubmitting || !user}
          onClick={() => void handleSubmit()}
        >
          {isSubmitting ? "Salvando..." : "Salvar alteracoes"}
        </SubmitButton>
      </div>
    </section>
  );
}
