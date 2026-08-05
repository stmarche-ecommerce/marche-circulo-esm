import { z } from "zod";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const COMMON_EMAIL_TYPO_SUFFIXES = [
  ".cim",
  ".cm",
  ".cn",
  ".co",
  ".comb",
  ".combr",
  ".comm",
  ".comn",
  ".con",
  ".cpm",
  ".nee",
  ".netb",
  ".netn",
  ".ogr",
  ".orgb",
  ".vom",
];

export const formatCpf = (value: string) => {
  const digits = onlyDigits(value).slice(0, 11);

  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
};

export const isValidCpf = (value: string) => {
  const digits = onlyDigits(value);

  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
    return false;
  }

  let sum = 0;

  for (let index = 0; index < 9; index += 1) {
    sum += Number(digits[index]) * (10 - index);
  }

  let remainder = (sum * 10) % 11;
  if (remainder === 10) {
    remainder = 0;
  }

  if (remainder !== Number(digits[9])) {
    return false;
  }

  sum = 0;

  for (let index = 0; index < 10; index += 1) {
    sum += Number(digits[index]) * (11 - index);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10) {
    remainder = 0;
  }

  return remainder === Number(digits[10]);
};

const isPastOrToday = (value: string) => {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date <= today;
};

const isLikelyValidEmail = (value: string) => {
  const normalized = value.trim().toLowerCase();

  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/.test(normalized)) {
    return false;
  }

  if (normalized.includes("..")) {
    return false;
  }

  const [, domain = ""] = normalized.split("@");

  if (!domain || domain.startsWith(".") || domain.endsWith(".")) {
    return false;
  }

  if (COMMON_EMAIL_TYPO_SUFFIXES.some((suffix) => domain.endsWith(suffix))) {
    return false;
  }

  const labels = domain.split(".");
  const topLevelDomain = labels.at(-1) ?? "";

  if (topLevelDomain.length < 2 || topLevelDomain.length > 12 || !/^[a-z]{2,12}$/.test(topLevelDomain)) {
    return false;
  }

  return labels.every((label) => label.length > 0 && !label.startsWith("-") && !label.endsWith("-"));
};

const isLikelyValidBrazilianMobile = (value: string) => {
  const digits = onlyDigits(value);

  if (digits.length !== 11) {
    return false;
  }

  const ddd = digits.slice(0, 2);
  const firstSubscriberDigit = digits[2];

  if (!/^[1-9]{2}$/.test(ddd)) {
    return false;
  }

  return firstSubscriberDigit === "9";
};

export const signUpSchema = z.object({
  firstName: z.string().trim().min(1, "Informe seu nome."),
  lastName: z.string().trim().min(1, "Informe seu sobrenome."),
  cpf: z
    .string()
    .trim()
    .min(1, "Informe seu CPF.")
    .refine(isValidCpf, "Informe um CPF valido."),
  email: z
    .string()
    .trim()
    .min(1, "Informe seu e-mail.")
    .refine(isLikelyValidEmail, "Informe um e-mail valido."),
  phone: z
    .string()
    .trim()
    .min(1, "Informe seu telefone.")
    .refine(isLikelyValidBrazilianMobile, "Informe um WhatsApp valido com DDD e 9 digitos."),
  birthDate: z
    .string()
    .min(1, "Informe sua data de nascimento.")
    .refine(isPastOrToday, "Informe uma data de nascimento valida."),
  zipCode: z
    .string()
    .trim()
    .min(1, "Informe seu CEP.")
    .refine((value) => onlyDigits(value).length === 8, "Informe um CEP valido."),
  street: z.string().trim().min(1, "Informe a rua ou avenida."),
  number: z.string().trim().min(1, "Informe o numero."),
  neighborhood: z.string().trim().min(1, "Informe o bairro."),
  city: z.string().trim().min(1, "Informe a cidade."),
  state: z
    .string()
    .trim()
    .length(2, "Informe a UF com 2 letras.")
    .refine((value) => /^[A-Za-z]{2}$/.test(value), "Informe uma UF valida."),
  privacyConsent: z.boolean().refine((value) => value, "Voce precisa concordar com a Política de privacidade."),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;