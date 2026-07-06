interface SignupConfirmationEmailParams {
  email: string;
  name: string;
}

function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] || "cliente";
}

function buildEmailHtml(name: string) {
  const firstName = getFirstName(name);

  return `
    <div style="font-family: Arial, sans-serif; background:#fcfaf7; color:#4d423d; padding:32px;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid rgba(104,64,49,0.12); border-radius:24px; overflow:hidden;">
        <div style="background:linear-gradient(135deg, #684031, #472a23); color:#ffffff; padding:32px;">
          <p style="margin:0; font-size:12px; letter-spacing:0.28em; text-transform:uppercase; opacity:0.76;">Circulo Santa Maria</p>
          <h1 style="margin:12px 0 0; font-size:28px; line-height:1.2;">Cadastro recebido com sucesso</h1>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">Ola, ${firstName}.</p>
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">
            Recebemos sua solicitacao de cadastro na area restrita do Circulo Santa Maria.
          </p>
          <p style="margin:0 0 16px; font-size:16px; line-height:1.7;">
            Seus dados foram enviados com sucesso e seu acesso esta em processamento.
          </p>
          <p style="margin:0; font-size:14px; line-height:1.7; color:#756962;">
            Se voce nao reconhece esta solicitacao, responda este e-mail ou entre em contato com nosso time.
          </p>
        </div>
      </div>
    </div>
  `;
}

function buildEmailText(name: string) {
  const firstName = getFirstName(name);

  return [
    `Ola, ${firstName}.`,
    "",
    "Recebemos sua solicitacao de cadastro na area restrita do Circulo Santa Maria.",
    "Seus dados foram enviados com sucesso e seu acesso esta em processamento.",
    "",
    "Se voce nao reconhece esta solicitacao, responda este e-mail ou entre em contato com nosso time.",
  ].join("\n");
}

export async function sendSignupConfirmationEmail({
  email,
  name,
}: SignupConfirmationEmailParams) {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY nao configurada.");
  }

  const from =
    process.env.SIGNUP_CONFIRMATION_FROM_EMAIL ??
    "Santa Maria Emporio <automacao@marche.com.br>";
  const replyTo =
    process.env.SIGNUP_CONFIRMATION_REPLY_TO ?? "contato@emporiosantamaria.com.br";

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: {
        email: from.match(/<(.+)>/)?.[1] ?? from,
        name: from.match(/^(.+)\s<.+>$/)?.[1] ?? "Santa Maria Emporio",
      },
      personalizations: [
        {
          to: [{ email }],
          subject: "Recebemos seu cadastro no Circulo Santa Maria",
        },
      ],
      reply_to: {
        email: replyTo,
      },
      content: [
        {
          type: "text/plain",
          value: buildEmailText(name),
        },
        {
          type: "text/html",
          value: buildEmailHtml(name),
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Falha ao enviar e-mail de confirmacao.");
  }

  return response.json();
}
