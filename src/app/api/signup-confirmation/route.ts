import { NextResponse } from "next/server";
import { sendSignupConfirmationEmail } from "@/lib/signup-confirmation-email";

interface SignupConfirmationRequestBody {
  email?: string;
  name?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupConfirmationRequestBody;

    if (!body.email || !body.name) {
      return NextResponse.json(
        { success: false, message: "Nome e e-mail sao obrigatorios." },
        { status: 400 },
      );
    }

    await sendSignupConfirmationEmail({
      email: body.email,
      name: body.name,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Falha ao enviar e-mail de confirmacao.";

    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    );
  }
}
