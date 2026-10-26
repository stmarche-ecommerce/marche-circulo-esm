// O destinatario do formulario de contato e decidido no servidor; o cliente
// envia apenas a chave, nunca um endereco de e-mail.
export const CONTACT_DESTINATIONS = {
  sac: "sac@emporiosantamaria.com.br",
  contato: "contato@emporiosantamaria.com.br",
} as const;

export type ContactDestinationKey = keyof typeof CONTACT_DESTINATIONS;

export const CONTACT_DESTINATION_KEYS = Object.keys(CONTACT_DESTINATIONS) as [
  ContactDestinationKey,
  ...ContactDestinationKey[],
];
