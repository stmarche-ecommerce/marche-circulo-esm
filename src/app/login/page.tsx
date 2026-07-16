import { AuthShell } from "@/components/forms/auth-shell";
import { LoginForm } from "@/components/forms/login-form";
import { AppClientProviders } from "@/components/ui/app-client-providers";

export default function LoginPage() {
  return (
    <AppClientProviders>
      <AuthShell
        eyebrow="Login"
        title="Bem-vindo de volta"
        description="Entre com seus dados para visualizar sua conta, acompanhar solicitações e continuar sua jornada."
        helperText="Ainda não possui cadastro?"
        helperLinkHref="/criar-conta"
        helperLinkLabel="Criar conta"
        centerPanelContent
      >
        <LoginForm />
      </AuthShell>
    </AppClientProviders>
  );
}
