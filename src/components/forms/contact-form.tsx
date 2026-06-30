"use client";

import { useState } from "react";

type ContactFormProps = {
  defaultSubject?: string;
  destinationEmail: string;
};

export function ContactForm({ defaultSubject, destinationEmail }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(defaultSubject ?? "");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const body = [
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone}`,
      "",
      message,
    ].join("\n");

    const mailto = `mailto:${destinationEmail}?subject=${encodeURIComponent(
      subject || "Contato pelo site",
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <input
        className="site-input"
        placeholder="Nome completo*"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
      />
      <input
        className="site-input"
        type="email"
        placeholder="E-mail*"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <input
        className="site-input"
        placeholder="Celular*"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        required
      />
      <input
        className="site-input"
        placeholder="Assunto*"
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        required
      />
      <textarea
        className="site-input min-h-40 md:col-span-2"
        placeholder="Mensagem*"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        required
      />
      <button type="submit" className="site-button md:col-span-2 md:w-fit">
        Enviar mensagem
      </button>
    </form>
  );
}
