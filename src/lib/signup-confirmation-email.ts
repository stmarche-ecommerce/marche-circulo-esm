"use server";

import { escapeHtml, getTransporter, parseMailbox, resolveEnvValue } from "@/lib/contact-node-mailer";
interface SignupConfirmationEmailParams {
  email: string;
  name: string;
  applicationUrl: string;
}

function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] || "cliente";
}

function buildEmailHtml(name: string) {
  const firstName = escapeHtml(getFirstName(name));

  return `
    <div style="font-family: Arial, sans-serif; background:#fcfaf7; color:#4d423d; padding:32px;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid rgba(104,64,49,0.12); border-radius:24px; overflow:hidden;">
        <div style="background:linear-gradient(135deg, #684031, #472a23); color:#ffffff; padding:32px;">
          <p style="margin:0; font-size:12px; letter-spacing:0.28em; text-transform:uppercase; opacity:0.76;">Círculo Santa Maria</p>
          <h1 style="margin:12px 0 0; font-size:28px; line-height:1.2;">Bem-vindo ao Círculo Santa Maria</h1>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">Olá, ${firstName}.</p>
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">
            É um prazer receber você no Círculo Santa Maria, o programa de benefícios do Empório Santa Maria.
          </p>
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">
            A partir de agora, você já pode aproveitar descontos exclusivos em produtos selecionados em nossas lojas.
          </p>
          <p style="margin:0 0 12px; font-size:16px; line-height:1.7; font-weight:700;">
            Para utilizar seus benefícios, é simples:
          </p>
          <ul style="margin:0 0 20px; padding-left:22px; font-size:16px; line-height:1.9; color:#4d423d;">
            <li>Identifique os produtos com a etiqueta do Círculo Santa Maria;</li>
            <li>Informe seu CPF no caixa;</li>
            <li>Os descontos serão aplicados ao final da compra.</li>
          </ul>
          <p style="margin:0; font-size:16px; line-height:1.7; color:#756962;">
            Este é apenas o começo. Em breve, o Círculo Santa Maria contará com novas vantagens e experiências pensadas especialmente para você.
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildEmailText(name: string) {
  const firstName = getFirstName(name);

  return [
    `Olá, ${firstName}.`,
    "",
    "É um prazer receber você no Círculo Santa Maria, o programa de benefícios do Empório Santa Maria.",
    "",
    "A partir de agora, você já pode aproveitar descontos exclusivos em produtos selecionados em nossas lojas.",
    "",
    "Para utilizar seus benefícios, é simples:",
    "- Identifique os produtos com a etiqueta do Círculo Santa Maria;",
    "- Informe seu CPF no caixa;",
    "- Os descontos serão aplicados ao final da compra.",
    "",
    "Este é apenas o começo. Em breve, o Círculo Santa Maria contará com novas vantagens e experiências pensadas especialmente para você.",
  ].join("\n");
}

function resolveCopyRecipients(email: string) {
  const fallbackRecipient = "ti.engenharia@marche.com.br";
  const configuredRecipients = resolveEnvValue("SIGNUP_CONFIRMATION_COPY_TO", "SIGNUP_CONFIRMATION_BCC");
  const recipients = (configuredRecipients || fallbackRecipient)
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);

  return Array.from(new Set(recipients)).filter(
    (recipient) => recipient.toLowerCase() !== email.toLowerCase(),
  );
}

export async function sendSignupConfirmationEmail({ email, name, applicationUrl }: SignupConfirmationEmailParams) {
  void applicationUrl;

  const from = process.env.SIGNUP_CONFIRMATION_FROM_EMAIL ?? "Santa Maria Empório <automacao@marche.com.br>";
  const replyTo = process.env.SIGNUP_CONFIRMATION_REPLY_TO ?? "contato@emporiosantamaria.com.br";
  const fromMailbox = parseMailbox(from);
  const copyRecipients = resolveCopyRecipients(email);

  if (!fromMailbox.email) {
    throw new Error("SIGNUP_CONFIRMATION_FROM_EMAIL inválido.");
  }

  const logContext = { to: email, bcc: copyRecipients, from: fromMailbox.email };
  console.info("[signup-confirmation-email] Iniciando envio", logContext);

  try {
    await getTransporter().sendMail({
      from,
      to: email,
      bcc: copyRecipients.length ? copyRecipients : undefined,
      replyTo,
      subject: "Bem-vindo ao Círculo Santa Maria",
      text: buildEmailText(name),
      html: buildEmailHtml(name),
    });

    console.info("[signup-confirmation-email] SMTP aceitou a mensagem", logContext);
  } catch (error) {
    console.error("[signup-confirmation-email] Falha no envio SMTP", {
      ...logContext,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }

  return { success: true };
}