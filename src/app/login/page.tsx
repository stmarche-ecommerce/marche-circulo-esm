import { AuthShell } from "@/components/forms/auth-shell";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Login"
      title="Acesse sua area restrita"
      description="Entre com seus dados para visualizar sua conta, acompanhar solicitacoes e continuar sua jornada."
      helperText="Ainda nao possui cadastro?"
      helperLinkHref="/criar-conta"
      helperLinkLabel="Criar conta"
      centerPanelContent
    >
      <LoginForm />
    </AuthShell>
  );
}
