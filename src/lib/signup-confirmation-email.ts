"use server";

import { randomUUID } from "node:crypto";
import net from "node:net";
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

type SmtpSocket = net.Socket | tls.TLSSocket;

function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] || "cliente";
}

function buildEmailHtml(name: string) {
  const firstName = getFirstName(name);

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

function resolveEnvValue(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }

  return "";
}

function resolveSmtpConfig(): SmtpConfig {
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
    username,
    password,
    secure: port === 465,
  };
}

function parseMailbox(value: string) {
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

function escapeHeader(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function toBase64(value: string) {
  return Buffer.from(value, "utf-8").toString("base64");
}

function normalizeLineBreaks(value: string) {
  return value.replace(/\r?\n/g, "\r\n");
}

function resolveCopyRecipients() {
  const fallbackRecipient = "ti.engenharia@marche.com.br";
  const configuredRecipients = resolveEnvValue("SIGNUP_CONFIRMATION_COPY_TO", "SIGNUP_CONFIRMATION_BCC");
  const recipients = (configuredRecipients || fallbackRecipient)
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);

  return Array.from(new Set(recipients));
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

function setCommonSocketOptions(socket: SmtpSocket) {
  socket.setEncoding("utf8");
  socket.setTimeout(15000, () => {
    socket.destroy(new Error("Tempo limite excedido na conexão SMTP."));
  });
}

function createTlsConnection(config: SmtpConfig) {
  return new Promise<tls.TLSSocket>((resolve, reject) => {
    const socket = tls.connect(
      {
        host: config.host,
        port: config.port,
        servername: config.host,
      },
      () => resolve(socket),
    );

    setCommonSocketOptions(socket);
    socket.once("error", reject);
  });
}

function createPlainConnection(config: SmtpConfig) {
  return new Promise<net.Socket>((resolve, reject) => {
    const socket = net.createConnection(
      {
        host: config.host,
        port: config.port,
      },
      () => resolve(socket),
    );

    setCommonSocketOptions(socket);
    socket.once("error", reject);
  });
}

function upgradeToTls(socket: net.Socket, config: SmtpConfig) {
  return new Promise<tls.TLSSocket>((resolve, reject) => {
    const securedSocket = tls.connect(
      {
        socket,
        servername: config.host,
      },
      () => resolve(securedSocket),
    );

    setCommonSocketOptions(securedSocket);
    securedSocket.once("error", reject);
  });
}

function readSmtpReply(socket: SmtpSocket) {
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

      if (!lines.length) return;

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
      reject(new Error("Conexão SMTP encerrada antes da resposta."));
    };

    socket.on("data", onData);
    socket.once("error", onError);
    socket.once("close", onClose);
  });
}

async function sendSmtpCommand(socket: SmtpSocket, command: string, expectedLabel: string) {
  socket.write(`${command}\r\n`);
  const reply = await readSmtpReply(socket);

  if (!isPositiveCompletion(reply)) {
    throw new Error(`Falha em ${expectedLabel}: ${reply}`);
  }

  return reply;
}

async function expectStartTls(socket: SmtpSocket) {
  socket.write("STARTTLS\r\n");
  const reply = await readSmtpReply(socket);

  if (!/^220/m.test(reply)) {
    throw new Error(`Servidor SMTP recusou STARTTLS: ${reply}`);
  }
}

async function sendSmtpData(socket: SmtpSocket, message: string) {
  socket.write("DATA\r\n");
  const dataReply = await readSmtpReply(socket);

  if (!/^354/m.test(dataReply)) {
    throw new Error(`Servidor SMTP recusou DATA: ${dataReply}`);
  }

  const normalizedMessage = message.replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");

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
  const from = process.env.SIGNUP_CONFIRMATION_FROM_EMAIL ?? "Santa Maria Empório <automacao@marche.com.br>";
  const replyTo = process.env.SIGNUP_CONFIRMATION_REPLY_TO ?? "contato@emporiosantamaria.com.br";
  const subject = "Bem-vindo ao Círculo Santa Maria";
  void applicationUrl;
  const text = buildEmailText(name);
  const html = buildEmailHtml(name);
  const fromMailbox = parseMailbox(from);
  const copyRecipients = resolveCopyRecipients().filter((recipient) => recipient.toLowerCase() !== email.toLowerCase());

  if (!fromMailbox.email) {
    throw new Error("SIGNUP_CONFIRMATION_FROM_EMAIL inválido.");
  }

  const message = buildMimeMessage({
    from,
    to: email,
    replyTo,
    subject,
    text,
    html,
  });

  console.info("[signup-confirmation-email] Iniciando envio", {
    to: email,
    bcc: copyRecipients,
    host: config.host,
    port: config.port,
    secure: config.secure,
    from: fromMailbox.email,
  });

  let socket: SmtpSocket = config.secure
    ? await createTlsConnection(config)
    : await createPlainConnection(config);

  try {
    const greeting = await readSmtpReply(socket);

    if (!isPositiveCompletion(greeting)) {
      throw new Error(`Falha no handshake SMTP: ${greeting}`);
    }

    await sendSmtpCommand(socket, `EHLO ${config.host}`, "EHLO");

    if (!config.secure) {
      await expectStartTls(socket);
      socket = await upgradeToTls(socket as net.Socket, config);
      await sendSmtpCommand(socket, `EHLO ${config.host}`, "EHLO após STARTTLS");
    }

    await sendSmtpCommand(socket, "AUTH LOGIN", "AUTH LOGIN");
    await sendSmtpCommand(socket, toBase64(config.username), "usuário SMTP");
    await sendSmtpCommand(socket, toBase64(config.password), "senha SMTP");
    await sendSmtpCommand(socket, `MAIL FROM:<${fromMailbox.email}>`, "MAIL FROM");
    await sendSmtpCommand(socket, `RCPT TO:<${email}>`, "RCPT TO");
    for (const copyRecipient of copyRecipients) {
      await sendSmtpCommand(socket, `RCPT TO:<${copyRecipient}>`, "RCPT TO copia");
    }
    await sendSmtpData(socket, message);
    await sendSmtpCommand(socket, "QUIT", "QUIT");

    console.info("[signup-confirmation-email] SMTP aceitou a mensagem", {
      to: email,
      bcc: copyRecipients,
      host: config.host,
      port: config.port,
    });
  } catch (error) {
    console.error("[signup-confirmation-email] Falha no envio SMTP", {
      to: email,
      bcc: copyRecipients,
      host: config.host,
      port: config.port,
      secure: config.secure,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  } finally {
    socket.end();
  }

  return { success: true };
}
