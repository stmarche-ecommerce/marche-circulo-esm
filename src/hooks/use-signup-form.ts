import { useCallback, useState, type ChangeEvent } from "react";
import { formatCpf } from "@/lib/sign-up-validation";

interface SignUpFormData {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
}

interface SignUpConsents {
  optInEmail: boolean;
  optInWhatsApp: boolean;
  optInSms: boolean;
}

interface UseSignUpFormReturn {
  formData: SignUpFormData;
  consents: SignUpConsents;
  handleFieldChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleConsentChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  setConsents: React.Dispatch<React.SetStateAction<SignUpConsents>>;
}

const INITIAL_FORM_DATA: SignUpFormData = {
  name: "",
  cpf: "",
  email: "",
  phone: "",
  birthDate: "",
  password: "",
  confirmPassword: "",
};

const INITIAL_CONSENTS: SignUpConsents = {
  optInEmail: false,
  optInWhatsApp: false,
  optInSms: false,
};

export function useSignUpForm(): UseSignUpFormReturn {
  const [formData, setFormData] = useState<SignUpFormData>(INITIAL_FORM_DATA);
  const [consents, setConsents] = useState<SignUpConsents>(INITIAL_CONSENTS);

  const handleFieldChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const nextValue = name === "cpf" ? formatCpf(value) : value;

    setFormData((current) => ({
      ...current,
      [name]: nextValue,
    }));
  }, []);

  const handleConsentChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setConsents((current) => ({
      ...current,
      [name]: checked,
    }));
  }, []);

  return {
    formData,
    consents,
    handleFieldChange,
    handleConsentChange,
    setFormData,
    setConsents,
  };
}
