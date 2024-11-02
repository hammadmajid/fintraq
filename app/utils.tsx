import { cookies } from "next/headers";

export function getUserId(): string {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) {
    throw new Error("Session cookie not found");
  }
  const [sessionToken, userId] = sessionCookie.split(":");
  if (!userId || !sessionToken) {
    throw new Error("Invalid session cookie format");
  }

  return userId;
}
