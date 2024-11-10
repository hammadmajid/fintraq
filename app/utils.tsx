import { cookies } from "next/headers";

export async function getUserId(): Promise<string> {
  const cookieParts = await splitCookie();
  return cookieParts[1];
}

export async function getSession(): Promise<string> {
  const cookieParts = await splitCookie();
  return cookieParts[1];
}

async function splitCookie(): Promise<[string, string]> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    throw new Error("Session cookie not found");
  }
  const [sessionToken, userId] = sessionCookie.split(":");
  if (!userId || !sessionToken) {
    throw new Error("Invalid session cookie format");
  }

  return [sessionToken, userId];
}
