"use client";

import { ChangeEvent, FocusEvent, useState } from "react";
import { ConsentOption, ConsentSection, Field, FieldGrid, SubmitButton } from ".";

export function SignUpForm() {
  const [zipCode, setZipCode] = useState("");
  const [addressFields, setAddressFields] = useState({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    number: "",
  });
  const [cepStatus, setCepStatus] = useState<{
    tone: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    tone: "idle",
    message: "",
  });

  async function handleZipCodeBlur(event: FocusEvent<HTMLInputElement>) {
    const digits = event.target.value.replace(/\D/g, "");

    if (!digits) {
      setCepStatus({ tone: "idle", message: "" });
      return;
    }

    if (digits.length !== 8) {
      setCepStatus({ tone: "error", message: "Informe um CEP valido com 8 digitos." });
      return;
    }

    setCepStatus({ tone: "loading", message: "Buscando endereco..." });

    try {
      const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);

      if (!response.ok) {
        throw new Error("request_failed");
      }

      const data = (await response.json()) as ViaCepResponse;

      if (data.erro) {
        setCepStatus({ tone: "error", message: "CEP nao encontrado." });
        return;
      }

      setAddressFields((current) => ({
        ...current,
        street: data.logradouro?.trim() ?? "",
        neighborhood: data.bairro?.trim() ?? "",
        city: data.localidade?.trim() ?? "",
        state: data.uf?.trim() ?? "",
      }));
      setCepStatus({
        tone: "success",
        message: "",
      });
    } catch {
      setCepStatus({ tone: "error", message: "Nao foi possivel consultar o CEP agora." });
    }
  }

  function handleZipCodeChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value;
    setZipCode(nextValue);

    if (cepStatus.tone !== "idle") {
      setCepStatus({ tone: "idle", message: "" });
    }
  }

  return (
    <form className="mt-5 grid gap-[0.95rem]">
      <FieldGrid>
        <Field label="Nome completo" name="name" placeholder="Seu nome completo" required />
        <Field label="CPF" name="cpf" placeholder="000.000.000-00" required />
      </FieldGrid>

      <FieldGrid>
        <Field label="E-mail" name="email" type="email" placeholder="seunome@email.com" required />
        <Field label="Telefone" name="phone" type="tel" placeholder="(11) 99999-9999" required />
      </FieldGrid>

      <FieldGrid>
        <Field label="Data de nascimento" name="birthDate" type="date" required />
        <div className="grid gap-[0.46rem]">
          <Field
            label="CEP"
            name="zipCode"
            placeholder="00000-000"
            value={zipCode}
            onChange={handleZipCodeChange}
            onBlur={handleZipCodeBlur}
            required
          />
          {cepStatus.message ? (
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
          onChange={(event) => handleAddressFieldChange("street", event.target.value)}
          required
        />
        <Field
          label="Numero"
          name="number"
          placeholder="123"
          value={addressFields.number}
          onChange={(event) => handleAddressFieldChange("number", event.target.value)}
          required
        />
      </FieldGrid>

      <FieldGrid>
        <Field
          label="Bairro"
          name="neighborhood"
          placeholder="Seu bairro"
          value={addressFields.neighborhood}
          onChange={(event) => handleAddressFieldChange("neighborhood", event.target.value)}
          required
        />
        <Field
          label="Cidade"
          name="city"
          placeholder="Sua cidade"
          value={addressFields.city}
          onChange={(event) => handleAddressFieldChange("city", event.target.value)}
          required
        />
      </FieldGrid>

      <Field
        label="Estado (UF)"
        name="state"
        placeholder="SP"
        maxLength={2}
        value={addressFields.state}
        onChange={(event) => handleAddressFieldChange("state", event.target.value.toUpperCase())}
        required
      />

      <FieldGrid className="md:grid-cols-2">
        <Field label="Senha" name="password" type="password" placeholder="Crie uma senha" required />
        <Field label="Confirmar senha" name="confirmPassword" type="password" placeholder="Repita a senha" required />
      </FieldGrid>

      <ConsentSection>
        <ConsentOption
          name="optInEmail"
          title="E-mail"
          description="Novidades, beneficios e comunicados."
        />
        <ConsentOption
          name="optInWhatsApp"
          title="WhatsApp"
          description="Alertas e mensagens diretas no celular."
        />
        <ConsentOption
          name="optInSms"
          title="SMS"
          description="Avisos curtos e confirmacoes importantes."
        />
      </ConsentSection>

      <SubmitButton>Criar conta</SubmitButton>
    </form>
  );

  function handleAddressFieldChange(field: keyof typeof addressFields, value: string) {
    setAddressFields((current) => ({
      ...current,
      [field]: value,
    }));
  }
}

type ViaCepResponse = {
  bairro?: string;
  complemento?: string;
  erro?: boolean;
  localidade?: string;
  logradouro?: string;
  uf?: string;
};
