import nodemailer from "nodemailer";

export function resolveEnvValue(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }

  return "";
}

export function resolveSmtpConfig() {
  const host = resolveEnvValue("SMTP_ENDERECO", "SMTP_HOST");
  const portValue = resolveEnvValue("SMTP_PORTA", "SMTP_PORT");
  const username = resolveEnvValue("SMTP_USUARIO", "SMTP_USER", "SENDGRID_USERNAME");
  const password = resolveEnvValue("SMTP_SENDGRID_TOKEN", "SMTP_PASSWORD", "SENDGRID_API_KEY");

  const missingVariables = [
    !host && "SMTP_ENDERECO/SMTP_HOST",
    !portValue && "SMTP_PORTA/SMTP_PORT",
    !username && "SMTP_USUARIO/SMTP_USER/SENDGRID_USERNAME",
    !password && "SMTP_SENDGRID_TOKEN/SMTP_PASSWORD/SENDGRID_API_KEY",
  ].filter(Boolean);

  if (missingVariables.length > 0) {
    throw new Error(
      `Configuração SMTP incompleta para envio de e-mail. Variáveis ausentes: ${missingVariables.join(", ")}.`,
    );
  }

  const port = Number(portValue);

  if (!Number.isFinite(port) || port <= 0) {
    throw new Error("SMTP_PORTA/SMTP_PORT inválida.");
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user: username, pass: password },
  };
}

let cachedTransporter: nodemailer.Transporter | null = null;

export function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport(resolveSmtpConfig());
  }

  return cachedTransporter;
}

export function parseMailbox(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/^(.*)<(.+)>$/);

  if (!match) {
    return { name: "", email: trimmed };
  }

  return {
    name: match[1].trim().replace(/^"|"$/g, ""),
    email: match[2].trim(),
  };
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}