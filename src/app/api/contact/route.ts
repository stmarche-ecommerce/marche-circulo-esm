import { NextResponse } from "next/server";
import { z } from "zod";

import { sendContactEmail } from "@/lib/contact-email";
import { contactFormSchema, getContactFieldErrors } from "@/lib/contact-validation";

export const runtime = "nodejs";

const contactRequestSchema = contactFormSchema.extend({
  destinationEmail: z.string().trim().email("Destino de e-mail invalido."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Confira os campos obrigatorios antes de enviar.",
          fieldErrors: getContactFieldErrors(parsed.error.issues),
        },
        { status: 400 },
      );
    }

    const { destinationEmail, ...contactData } = parsed.data;

    await sendContactEmail({
      destinationEmail,
      ...contactData,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Mensagem enviada com sucesso.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[api/contact] Falha ao enviar contato", {
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      {
        success: false,
        message: "Nao foi possivel enviar sua mensagem agora. Tente novamente em instantes.",
      },
      { status: 500 },
    );
  }
}
