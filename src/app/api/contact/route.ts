import { NextResponse } from "next/server";
import { z } from "zod";

import { CONTACT_DESTINATION_KEYS, CONTACT_DESTINATIONS } from "@/lib/contact-destinations";
import { sendContactEmail } from "@/lib/contact-email";
import { contactFormSchema, getContactFieldErrors } from "@/lib/contact-validation";
import { guardRequest, jsonError, readJsonBody } from "@/lib/server/request-guards";

export const runtime = "nodejs";

const contactRequestSchema = contactFormSchema.safeExtend({
  destination: z.enum(CONTACT_DESTINATION_KEYS),
  // Honeypot: campo oculto que apenas robos preenchem.
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const blocked = guardRequest(request, { scope: "contact", limit: 5, windowMs: 10 * 60_000 });
  if (blocked) return blocked;

  const body = await readJsonBody(request);
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

  const { destination, website, ...contactData } = parsed.data;

  if (website) {
    // Finge sucesso para nao dar feedback ao robo.
    return NextResponse.json({ success: true, message: "Mensagem enviada com sucesso." });
  }

  try {
    await sendContactEmail({
      destinationEmail: CONTACT_DESTINATIONS[destination],
      ...contactData,
    });

    return NextResponse.json({ success: true, message: "Mensagem enviada com sucesso." });
  } catch (error) {
    console.error("[api/contact] Falha ao enviar contato", {
      error: error instanceof Error ? error.message : String(error),
    });

    return jsonError("Nao foi possivel enviar sua mensagem agora. Tente novamente em instantes.", 500);
  }
}
