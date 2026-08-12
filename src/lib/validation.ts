
export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  // regex simples e permissiva o suficiente para validação de formulário
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidPhone(phone: string): boolean {
  const digits = onlyDigits(phone);
  // celular BR: DDD (2) + 9 + 8 dígitos = 11 dígitos
  // aceita também fixo (10 dígitos) se seu caso de uso permitir
  if (digits.length !== 11) return false;

  const ddd = Number(digits.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;

  // celular deve começar com 9 após o DDD
  if (digits[2] !== "9") return false;

  return true;
}

export function formatPhone(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}