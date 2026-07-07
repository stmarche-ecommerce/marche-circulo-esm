import { AuthShell } from "@/components/forms/auth-shell";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Login"
      title="Acesse sua área restrita"
      description="Entre com seus dados para visualizar sua conta, acompanhar solicitações e continuar sua jornada."
      helperText="Ainda não possui cadastro?"
      helperLinkHref="/criar-conta"
      helperLinkLabel="Criar conta"
      centerPanelContent
    >
      <LoginForm />
    </AuthShell>
  );
}
