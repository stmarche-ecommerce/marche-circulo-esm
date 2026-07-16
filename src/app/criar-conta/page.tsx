import { AuthShell } from "@/components/forms/auth-shell";
import { SignUpForm } from "@/components/forms/sign-up-form";
import { AppClientProviders } from "@/components/ui/app-client-providers";

export default function SignUpPage() {
  return (
    <AppClientProviders>
      <AuthShell
        eyebrow="Cadastro"
        title="Crie seu acesso"
        description="Informe seus dados cadastrais e defina seus consentimentos de comunicação para solicitar acesso a área restrita."
        helperText="Já possui uma conta?"
        helperLinkHref="/login"
        helperLinkLabel="Fazer login"
      >
        <SignUpForm />
      </AuthShell>
    </AppClientProviders>
  );
}
