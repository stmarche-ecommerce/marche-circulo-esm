import { z } from "zod";

export const contactFormSchema = z
  .object({
    name: z.string().trim().min(3, "Informe seu nome completo.").max(120, "Nome muito longo."),
    email: z.string().trim().email("Informe um e-mail valido.").max(160, "E-mail muito longo."),
    phone: z.string().trim().min(10, "Informe seu celular com DDD.").max(20, "Celular muito longo."),
    subject: z.string().trim().min(2, "Informe o motivo do contato.").max(120, "Contato muito longo."),
    message: z
      .string()
      .trim()
      .min(10, "Escreva uma mensagem com pelo menos 10 caracteres.")
      .max(3000, "Mensagem muito longa."),
  })
  .superRefine((data, ctx) => {
    const digits = data.phone.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["phone"],
        message: "Informe um celular valido com DDD.",
      });
    }
  });

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactFormFieldErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

export function getContactFieldErrors(
  issues: z.core.$ZodIssue[],
): ContactFormFieldErrors {
  const fieldErrors: ContactFormFieldErrors = {};

  for (const issue of issues) {
    const field = issue.path[0];

    if (
      typeof field === "string" &&
      field in contactFormSchema.shape &&
      !fieldErrors[field as keyof ContactFormValues]
    ) {
      fieldErrors[field as keyof ContactFormValues] = issue.message;
    }
  }

  return fieldErrors;
}