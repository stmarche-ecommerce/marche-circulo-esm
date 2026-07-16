import { z } from "zod";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const isPastOrToday = (value: string) => {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date <= today;
};

export const profileSchema = z.object({
  firstName: z.string().trim().min(1, "Informe seu nome."),
  lastName: z.string().trim().min(1, "Informe seu sobrenome."),
  cpf: z.string().trim().min(11, "CPF não disponível para atualização."),
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
  complement: z.string().trim().optional(),
  password: z
    .string()
    .trim()
    .refine((value) => value.length === 0 || value.length >= 8, "A nova senha deve ter pelo menos 8 caracteres."),
  optInEmail: z.boolean(),
  optInPush: z.boolean(),
  optInSms: z.boolean(),
  optInWhatsApp: z.boolean(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
