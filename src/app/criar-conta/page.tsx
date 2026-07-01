import { AuthShell } from "@/components/forms/auth-shell";
import { SignUpForm } from "@/components/forms/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Cadastro"
      title="Crie seu acesso"
      description="Informe seus dados cadastrais e defina seus consentimentos de comunicacao para solicitar acesso a area restrita."
      helperText="Ja possui uma conta?"
      helperLinkHref="/login"
      helperLinkLabel="Fazer login"
    >
      <SignUpForm />
    </AuthShell>
  );
}
