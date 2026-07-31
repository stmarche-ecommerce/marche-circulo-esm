import { after, NextResponse } from "next/server";
import { sendSignupConfirmationEmail } from "@/lib/signup-confirmation-email";

interface SignupConfirmationRequestBody {
  email?: string;
  name?: string;
}

export const runtime = "nodejs";

function resolveApplicationUrl(request: Request) {
  const forwardedProto = request.headers.get("x-forwarded-proto")?.trim();
  const forwardedHost = request.headers.get("x-forwarded-host")?.trim();

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost.replace(/\/+$/, "")}/emporio`;
  }

  return new URL("/emporio", request.url).toString();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupConfirmationRequestBody;
    const email = body.email?.trim();
    const name = body.name?.trim();

    if (!email || !name) {
      return NextResponse.json(
        { success: false, message: "Nome e e-mail são obrigatórios." },
        { status: 400 },
      );
    }

    const applicationUrl = resolveApplicationUrl(request);

    after(async () => {
      try {
        await sendSignupConfirmationEmail({
          email,
          name,
          applicationUrl,
        });
      } catch (error) {
        console.error("Signup confirmation email failed:", error);
      }
    });

    return NextResponse.json({ success: true }, { status: 202 });
  } catch (error) {
    console.error("Signup confirmation email failed:", error);

    const message = error instanceof Error ? error.message : "Falha ao enviar e-mail de confirmação.";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

