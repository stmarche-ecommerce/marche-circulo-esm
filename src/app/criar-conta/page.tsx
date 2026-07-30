import { AuthShell } from "@/components/forms/auth-shell";
import { SignUpForm } from "@/components/forms/sign-up-form";
import { AppClientProviders } from "@/components/ui/app-client-providers";

export default function SignUpPage() {
  return (
    <AppClientProviders>
      <AuthShell
        eyebrow=""
        title="Crie seu acesso"
        description="Crie seu cadastro e aproveite as ofertas do Círculo Santa Maria"
        helperText="Já possui uma conta?"
        helperLinkHref="/login"
        helperLinkLabel="Fazer login"
      >
        <SignUpForm />
      </AuthShell>
    </AppClientProviders>
  );
}
