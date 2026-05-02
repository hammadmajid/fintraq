import { resend } from "@/lib/resend"

interface SendPasswordResetEmailParams {
  email: string
  resetUrl: string
}

export async function sendPasswordResetEmail({
  email,
  resetUrl,
}: SendPasswordResetEmailParams) {
  try {
    await resend.emails.send({
      from: "noreply@fintraq.tech",
      to: email,
      subject: "Reset your Fintraq password",
      text: `Click the link below to reset your password. This link will expire in 1 hour.

${resetUrl}

If you didn't request a password reset, please ignore this email.`,
    })
  } catch (error) {
    console.error("Failed to send password reset email:", error)
    throw new Error("Failed to send password reset email")
  }
}
