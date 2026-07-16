"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/auth-context";
import { profileSchema, type ProfileFormValues } from "@/lib/profile-validation";
import { formatCpf } from "@/lib/sign-up-validation";
import { ApiService } from "@/services/api-service";

export type AddressFields = {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement: string;
};

export type ConsentState = {
  optInEmail: boolean;
  optInPush: boolean;
  optInSms: boolean;
  optInWhatsApp: boolean;
};

export type ProfileFieldErrors = Partial<Record<keyof ProfileFormValues, string>>;

export type SectionId = "identification" | "contact" | "address" | "preferences";

const SECTION_FIELDS: Record<SectionId, Array<keyof ProfileFormValues>> = {
  identification: ["firstName", "lastName", "cpf"],
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

const splitDisplayName = (value: string) => {
  const trimmedValue = value.trim();
  const [firstName = "", ...lastNameParts] = trimmedValue.split(/\s+/);

  return {
    firstName,
    lastName: lastNameParts.join(" "),
  };
};

const buildProfileNames = (profile: ProfileApiResponse, fallbackName?: string) => {
  const firstName = profile.first_name?.trim();
  const lastName = profile.last_name?.trim();

  if (firstName || lastName) {
    return {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
    };
  }

  if (profile.name?.trim()) {
    return splitDisplayName(profile.name);
  }

  return splitDisplayName(fallbackName ?? "");
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

const findFirstSectionWithErrors = (errors: ProfileFieldErrors): SectionId | null => {
  const sectionIds = Object.keys(SECTION_FIELDS) as SectionId[];
  const section = sectionIds.find((id) => SECTION_FIELDS[id].some((field) => Boolean(errors[field])));

  return section ?? null;
};

export function useProfileForm() {
  const api = useMemo(() => new ApiService(), []);
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.name ? splitDisplayName(user.name).firstName : "",
    lastName: user?.name ? splitDisplayName(user.name).lastName : "",
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
      if (!user?.id) {
        setIsLoadingProfile(false);
        return;
      }

      try {
        setIsLoadingProfile(true);
        const response = await api.get(`/users-v2?id=${user.id}`);
        const profile = response.data as ProfileApiResponse;
        const notifications = profile.data?.notifications;
        const nestedAddress = profile.data?.address;
        const currentUser = userRef.current;
        const profileNames = buildProfileNames(profile, currentUser?.name);
        const resolvedCpf = onlyDigits(profile.username ?? currentUser?.cpf ?? "");

        if (cancelled) {
          return;
        }

        setFormData({
          firstName: profileNames.firstName,
          lastName: profileNames.lastName,
          cpf: resolvedCpf ? formatCpf(resolvedCpf) : currentUser?.cpf ? formatCpf(currentUser.cpf) : "",
          email: profile.email?.trim() ?? currentUser?.email ?? "",
          phone: formatPhone(profile.telephone ?? ""),
          birthDate: profile.birth_date ?? "",
          password: "",
        });

        setAddress({
          street: nestedAddress?.street?.trim() ?? profile.address?.street?.trim() ?? profile.street?.trim() ?? "",
          number: nestedAddress?.number?.trim() ?? profile.address?.number?.trim() ?? profile.number?.trim() ?? "",
          neighborhood:
            nestedAddress?.district?.trim() ?? profile.address?.district?.trim() ?? profile.district?.trim() ?? "",
          city: nestedAddress?.city?.trim() ?? profile.address?.city?.trim() ?? profile.city?.trim() ?? "",
          state: nestedAddress?.state?.trim() ?? profile.address?.state?.trim() ?? profile.state?.trim() ?? "",
          zipCode: formatZipCode(profile.data?.zip_code ?? profile.address?.zip_code ?? profile.zip_code ?? ""),
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

        const nextName = `${profileNames.firstName} ${profileNames.lastName}`.trim();
        const nextEmail = profile.email?.trim() ?? currentUser?.email ?? "";
        const nextCpf = resolvedCpf || currentUser?.cpf;

        if (nextName !== currentUser?.name || nextEmail !== currentUser?.email || nextCpf !== currentUser?.cpf) {
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
  }, [api, updateUser, user?.id]);

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
      firstName: formData.firstName,
      lastName: formData.lastName,
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
    [address, consents, formData],
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

    try {
      setIsSubmitting(true);
      setFieldErrors({});

      const payload: Record<string, unknown> = {
        email: formData.email.trim(),
        birth_date: formData.birthDate,
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
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
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
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

  const sectionHasErrors = useCallback(
    (sectionId: SectionId) => SECTION_FIELDS[sectionId].some((field) => Boolean(fieldErrors[field])),
    [fieldErrors],
  );

  const sectionIsComplete = useCallback(
    (sectionId: SectionId) => {
      switch (sectionId) {
        case "identification":
          return Boolean(formData.firstName.trim() && formData.lastName.trim() && formData.cpf.trim());
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
          return true;
        default:
          return false;
      }
    },
    [address, formData],
  );

  return {
    user,
    formData,
    setFormData,
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
  };
}


