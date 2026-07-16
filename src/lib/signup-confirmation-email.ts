"use server";

import { randomUUID } from "node:crypto";
import tls from "node:tls";

interface SignupConfirmationEmailParams {
  email: string;
  name: string;
  applicationUrl: string;
}

type SmtpConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  secure: boolean;
};

function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] || "cliente";
}

function buildEmailHtml(name: string, applicationUrl: string) {
  const firstName = getFirstName(name);

  return `
    <div style="font-family: Arial, sans-serif; background:#fcfaf7; color:#4d423d; padding:32px;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid rgba(104,64,49,0.12); border-radius:24px; overflow:hidden;">
        <div style="background:linear-gradient(135deg, #684031, #472a23); color:#ffffff; padding:32px;">
          <p style="margin:0; font-size:12px; letter-spacing:0.28em; text-transform:uppercase; opacity:0.76;">Circulo Santa Maria</p>
          <h1 style="margin:12px 0 0; font-size:28px; line-height:1.2;">Bem-vindo(a) ao Circulo Santa Maria</h1>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">Olá, ${firstName}.</p>
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">
            Seu cadastro foi concluído com sucesso e seu acesso já está liberado.
          </p>
          <p style="margin:0 0 24px; font-size:16px; line-height:1.7;">
            A partir de agora você pode entrar na área do cliente e aproveitar as promoções e benefícios exclusivos do Círculo Santa Maria.
          </p>
          <p style="margin:0 0 24px;">
            <a
              href="${applicationUrl}"
              style="display:inline-block; border-radius:999px; background:#684031; color:#ffffff; padding:14px 24px; font-size:14px; font-weight:700; letter-spacing:0.12em; text-decoration:none; text-transform:uppercase;"
            >
              Acessar a aplicação
            </a>
          </p>
          <p style="margin:0 0 16px; font-size:14px; line-height:1.7; color:#756962;">
            Se preferir, copie e cole este link no navegador:<br />
            <a href="${applicationUrl}" style="color:#684031; word-break:break-all;">${applicationUrl}</a>
          </p>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#756962;">
            Se você não reconhece este cadastro, responda este e-mail ou entre em contato com nosso time.
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildEmailText(name: string, applicationUrl: string) {
  const firstName = getFirstName(name);

  return [
    `Olá, ${firstName}.`,
    "",
    "Recebemos sua solicitação de cadastro na área restrita do Círculo Santa Maria.",
    "Seus dados foram enviados com sucesso e seu acesso está em processamento.",
    "",
    `Acesse a aplicação em: ${applicationUrl}`,
    "",
    "Se você não reconhece esta solicitação, responda este e-mail ou entre em contato com nosso time.",
  ].join("\n");
}

function resolveEnvValue(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();

    if (value) {
      return value;
    }
  }

  return "";
}

function resolveSmtpConfig(): SmtpConfig {
  const host = resolveEnvValue("SMTP_ENDERECO", "SMTP_HOST");
  const portValue = resolveEnvValue("SMTP_PORTA", "SMTP_PORT");
  const username = resolveEnvValue("SMTP_USUARIO", "SMTP_USER", "SENDGRID_USERNAME");
  const password = resolveEnvValue(
    "SMTP_SENDGRID_TOKEN",
    "SMTP_PASSWORD",
    "SENDGRID_API_KEY",
  );

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
    throw new Error("SMTP_PORTA/SMTP_PORT invalida.");
  }

  return {
    host,
    port,
    username,
    password,
    secure: port === 465,
  };
}

function parseMailbox(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/^(.*)<(.+)>$/);

  if (!match) {
    return {
      name: "",
      email: trimmed,
    };
  }

  return {
    name: match[1].trim().replace(/^"|"$/g, ""),
    email: match[2].trim(),
  };
}

function escapeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function toBase64(value: string) {
  return Buffer.from(value, "utf-8").toString("base64");
}

function normalizeLineBreaks(value: string) {
  return value.replace(/\r?\n/g, "\r\n");
}

function buildMimeMessage(params: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}) {
  const boundary = `boundary_${randomUUID()}`;
  const fromMailbox = parseMailbox(params.from);

  const fromHeader = fromMailbox.name
    ? `"${escapeHeader(fromMailbox.name)}" <${fromMailbox.email}>`
    : fromMailbox.email;

  return [
    `From: ${fromHeader}`,
    `To: ${escapeHeader(params.to)}`,
    `Reply-To: ${escapeHeader(params.replyTo)}`,
    `Subject: ${escapeHeader(params.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    normalizeLineBreaks(params.text),
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    normalizeLineBreaks(params.html),
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");
}

function isPositiveCompletion(reply: string) {
  return /^[23]\d{2}/m.test(reply);
}

function createSmtpConnection(config: SmtpConfig) {
  return new Promise<tls.TLSSocket>((resolve, reject) => {
    const socket = tls.connect(
      {
        host: config.host,
        port: config.port,
        servername: config.host,
      },
      () => resolve(socket),
    );

    socket.setEncoding("utf8");
    socket.setTimeout(15000, () => {
      socket.destroy(new Error("Tempo limite excedido ao conectar no SMTP."));
    });
    socket.once("error", reject);
  });
}

function readSmtpReply(socket: tls.TLSSocket) {
  return new Promise<string>((resolve, reject) => {
    let buffer = "";

    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("close", onClose);
    };

    const finalizeIfComplete = () => {
      const lines = buffer
        .split("\r\n")
        .map((line) => line.trimEnd())
        .filter(Boolean);

      if (!lines.length) {
        return;
      }

      const lastLine = lines[lines.length - 1];

      if (/^\d{3} /.test(lastLine)) {
        cleanup();
        resolve(lines.join("\n"));
      }
    };

    const onData = (chunk: string | Buffer) => {
      buffer += typeof chunk === "string" ? chunk : chunk.toString("utf8");
      finalizeIfComplete();
    };

    const onError = (error: Error) => {
      cleanup();
      reject(error);
    };

    const onClose = () => {
      cleanup();
      reject(new Error("Conexao SMTP encerrada antes da resposta."));
    };

    socket.on("data", onData);
    socket.once("error", onError);
    socket.once("close", onClose);
  });
}

async function sendSmtpCommand(
  socket: tls.TLSSocket,
  command: string,
  expectedLabel: string,
) {
  socket.write(`${command}\r\n`);
  const reply = await readSmtpReply(socket);

  if (!isPositiveCompletion(reply)) {
    throw new Error(`Falha em ${expectedLabel}: ${reply}`);
  }

  return reply;
}

async function sendSmtpData(
  socket: tls.TLSSocket,
  message: string,
) {
  const dataReply = await sendSmtpCommand(socket, "DATA", "DATA");

  if (!/^354/m.test(dataReply)) {
    throw new Error(`Servidor SMTP recusou DATA: ${dataReply}`);
  }

  const normalizedMessage = message
    .replace(/\r?\n/g, "\r\n")
    .replace(/^\./gm, "..");

  socket.write(`${normalizedMessage}\r\n.\r\n`);
  const finalReply = await readSmtpReply(socket);

  if (!isPositiveCompletion(finalReply)) {
    throw new Error(`Falha ao enviar corpo do e-mail: ${finalReply}`);
  }
}

export async function sendSignupConfirmationEmail({
  email,
  name,
  applicationUrl,
}: SignupConfirmationEmailParams) {
  const config = resolveSmtpConfig();
  const from =
    process.env.SIGNUP_CONFIRMATION_FROM_EMAIL ??
    "Santa Maria Empório <automacao@marche.com.br>";
  const replyTo =
    process.env.SIGNUP_CONFIRMATION_REPLY_TO ?? "contato@emporiosantamaria.com.br";
  const subject = "Recebemos seu cadastro no Círculo Santa Maria";
  const text = buildEmailText(name, applicationUrl);
  const html = buildEmailHtml(name, applicationUrl);
  const fromMailbox = parseMailbox(from);

  if (!fromMailbox.email) {
    throw new Error("SIGNUP_CONFIRMATION_FROM_EMAIL invalido.");
  }

  const message = buildMimeMessage({
    from,
    to: email,
    replyTo,
    subject,
    text,
    html,
  });

  const socket = await createSmtpConnection(config);

  try {
    const greeting = await readSmtpReply(socket);

    if (!isPositiveCompletion(greeting)) throw new Error(`Falha no handshake SMTP: ${greeting}`);

    await sendSmtpCommand(socket, `EHLO ${config.host}`, "EHLO");
    await sendSmtpCommand(socket, "AUTH LOGIN", "AUTH LOGIN");
    await sendSmtpCommand(socket, toBase64(config.username), "usuario SMTP");
    await sendSmtpCommand(socket, toBase64(config.password), "senha SMTP");
    await sendSmtpCommand(socket, `MAIL FROM:<${fromMailbox.email}>`, "MAIL FROM");
    await sendSmtpCommand(socket, `RCPT TO:<${email}>`, "RCPT TO");
    await sendSmtpData(socket, message);
    await sendSmtpCommand(socket, "QUIT", "QUIT");
  } finally {
    socket.end();
  }

  return { success: true };
}
