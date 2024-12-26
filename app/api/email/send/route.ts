import WelcomeEmail from "@/emails/welcome";
import { Resend } from "resend";
import { z } from "zod";

const requestData = z.object({
  email: z.string(),
  name: z.string(),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, name } = requestData.parse(await request.json());

  try {
    const { data, error } = await resend.emails.send({
      from: "Fintraq <fintraq@bine.codes>",
      to: email,
      subject: "Welcome to Fintraq!",
      react: WelcomeEmail({ name: name }),
    });

    if (error) {
      console.error(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
}
