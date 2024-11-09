import { cookies, type UnsafeUnwrappedCookies } from "next/headers";

export function getUserId(): string {
  return splitCookie()[1];
}

export function getSession(): string {
  return splitCookie()[0];
}

function splitCookie(): [string, string] {
  const sessionCookie = (cookies() as unknown as UnsafeUnwrappedCookies).get("session")?.value;
  if (!sessionCookie) {
    throw new Error("Session cookie not found");
  }
  const [sessionToken, userId] = sessionCookie.split(":");
  if (!userId || !sessionToken) {
    throw new Error("Invalid session cookie format");
  }

  return [sessionToken, userId];
}
