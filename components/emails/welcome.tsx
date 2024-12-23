interface EmailTemplateProps {
  name: string;
}

export default function WelcomeEmail({ name }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {name}!</h1>
    </div>
  );
}
