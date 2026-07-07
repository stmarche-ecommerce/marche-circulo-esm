import { useState, useCallback, type ChangeEvent, type FocusEvent } from "react";

interface ViaCepResponse {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
}

interface AddressFields {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  number: string;
  complement: string;
}

type CepTone = "idle" | "loading" | "success" | "error";

interface CepStatus {
  tone: CepTone;
  message: string;
}

interface UseZipCodeLookupReturn {
  zipCode: string;
  addressFields: AddressFields;
  cepStatus: CepStatus;
  setAddressFields: React.Dispatch<React.SetStateAction<AddressFields>>;
  handleZipCodeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleZipCodeBlur: (event: FocusEvent<HTMLInputElement>) => Promise<void>;
  handleAddressFieldChange: (field: keyof AddressFields, value: string) => void;
}

const INITIAL_ADDRESS_FIELDS: AddressFields = {
  street: "",
  neighborhood: "",
  city: "",
  state: "",
  number: "",
  complement: "",
};

export function useZipCodeLookup(): UseZipCodeLookupReturn {
  const [zipCode, setZipCode] = useState("");
  const [addressFields, setAddressFields] = useState<AddressFields>(INITIAL_ADDRESS_FIELDS);
  const [cepStatus, setCepStatus] = useState<CepStatus>({
    tone: "idle",
    message: "",
  });

  const handleZipCodeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      setZipCode(nextValue);

      setCepStatus((current) =>
        current.tone !== "idle" ? { tone: "idle", message: "" } : current
      );
    },
    []
  );

  const handleZipCodeBlur = useCallback(
    async (event: FocusEvent<HTMLInputElement>) => {
      const digits = event.target.value.replace(/\D/g, "");

      if (!digits) {
        setCepStatus({ tone: "idle", message: "" });
        return;
      }

      if (digits.length !== 8) {
        setCepStatus({
          tone: "error",
          message: "Informe um CEP válido com 8 dígitos.",
        });
        return;
      }

      setCepStatus({ tone: "loading", message: "Buscando endereço..." });

      try {
        const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);

        if (!response.ok) throw new Error("request_failed");

        const data = (await response.json()) as ViaCepResponse;

        if (data.erro) {
          setCepStatus({ tone: "error", message: "CEP não encontrado." });
          return;
        }

        setAddressFields((current) => ({
          ...current,
          street: data.logradouro?.trim() ?? "",
          neighborhood: data.bairro?.trim() ?? "",
          city: data.localidade?.trim() ?? "",
          state: data.uf?.trim() ?? "",
        }));

        setCepStatus({ tone: "success", message: "" });
      } catch {
        setCepStatus({
          tone: "error",
          message: "Não foi possível consultar o CEP agora.",
        });
      }
    },
    []
  );

  const handleAddressFieldChange = useCallback(
    (field: keyof AddressFields, value: string) => {
      setAddressFields((current) => ({
        ...current,
        [field]: value,
      }));
    },
    []
  );

  return {
    zipCode,
    addressFields,
    cepStatus,
    setAddressFields,
    handleZipCodeChange,
    handleZipCodeBlur,
    handleAddressFieldChange
  };
}
