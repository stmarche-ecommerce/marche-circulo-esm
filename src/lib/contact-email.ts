"use server";

import nodemailer from "nodemailer";
import { escapeHtml, resolveSmtpConfig } from "./contact-node-mailer";
import type { ContactFormValues } from "@/lib/contact-validation";

interface ContactEmailParams extends ContactFormValues {
  destinationEmail: string;
}

function buildContactEmailText({ name, email, phone, subject, message }: ContactFormValues) {
  return [
    "Novo contato enviado pelo site Empório Santa Maria.",
    "",
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Celular: ${phone}`,
    `Contato: ${subject}`,
    "",
    "Mensagem:",
    message,
  ].join("\n");
}

function buildContactEmailHtml({ name, email, phone, subject, message }: ContactFormValues) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  return `
    <div style="font-family: Arial, sans-serif; background:#fcfaf7; color:#4d423d; padding:32px;">
      <div style="max-width:620px; margin:0 auto; background:#ffffff; border:1px solid rgba(104,64,49,0.12); border-radius:24px; overflow:hidden;">
        <div style="background:linear-gradient(135deg, #684031, #472a23); color:#ffffff; padding:28px 32px;">
          <p style="margin:0; font-size:12px; letter-spacing:0.28em; text-transform:uppercase; opacity:0.78;">Empório Santa Maria</p>
          <h1 style="margin:12px 0 0; font-size:28px; line-height:1.2;">Nova mensagem recebida</h1>
        </div>
        <div style="padding:32px;">
          <table style="width:100%; border-collapse:collapse;">
            <tbody>
              <tr>
                <td style="padding:0 0 14px; font-weight:700; width:130px;">Nome</td>
                <td style="padding:0 0 14px;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding:0 0 14px; font-weight:700; width:130px;">E-mail</td>
                <td style="padding:0 0 14px;">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding:0 0 14px; font-weight:700; width:130px;">Celular</td>
                <td style="padding:0 0 14px;">${safePhone}</td>
              </tr>
              <tr>
                <td style="padding:0 0 14px; font-weight:700; width:130px;">Contato</td>
                <td style="padding:0 0 14px;">${safeSubject}</td>
              </tr>
            </tbody>
          </table>
          <div style="margin-top:18px; padding:20px; border-radius:18px; background:#f8f4ee; border:1px solid rgba(104,64,49,0.12);">
            <p style="margin:0 0 10px; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; color:#7d7067;">Mensagem</p>
            <p style="margin:0; font-size:16px; line-height:1.7;">${safeMessage}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport(resolveSmtpConfig());
  }
  return cachedTransporter;
}

export async function sendContactEmail({
  destinationEmail,
  name,
  email,
  phone,
  subject,
  message,
}: ContactEmailParams) {
  const from = process.env.SIGNUP_CONFIRMATION_FROM_EMAIL ?? "Santa Maria Empório <automacao@marche.com.br>";

  await getTransporter().sendMail({
    from,
    to: destinationEmail,
    replyTo: email,
    subject: `Contato pelo site - ${subject}`,
    text: buildContactEmailText({ name, email, phone, subject, message }),
    html: buildContactEmailHtml({ name, email, phone, subject, message }),
  });

  return { success: true };
}