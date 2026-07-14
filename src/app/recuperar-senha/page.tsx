import { AuthShell } from "@/components/forms/auth-shell";
import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Recuperar senha"
      title="Recuperar senha"
      description="Informe o CPF utilizado no cadastro para enviarmos o link de recuperacao para o e-mail associado a conta."
      helperText="Lembrou sua senha?"
      helperLinkHref="/login"
      helperLinkLabel="Voltar para login"
      centerPanelContent
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
