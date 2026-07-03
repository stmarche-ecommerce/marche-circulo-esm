import { z } from "zod";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

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

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, "Informe seu nome completo."),
    cpf: z
      .string()
      .trim()
      .min(1, "Informe seu CPF.")
      .refine(isValidCpf, "Informe um CPF valido."),
    email: z.string().trim().min(1, "Informe seu e-mail.").email("Informe um e-mail valido."),
    phone: z
      .string()
      .trim()
      .min(1, "Informe seu telefone.")
      .refine((value) => {
        const digits = onlyDigits(value);
        return digits.length >= 10 && digits.length <= 11;
      }, "Informe um telefone valido."),
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
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
    privacyConsent: z.boolean().refine((value) => value, "Voce precisa concordar com a politica de privacidade."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas nao coincidem.",
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
