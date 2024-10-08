import { Lucia } from "lucia";
import { D1Adapter } from "@lucia-auth/adapter-sqlite";
import { SelectUser } from "./schema";

export function initializeLucia(D1: D1Database) {
  const adapter = new D1Adapter(D1, {
    user: "users",
    session: "sessions",
  });

  return new Lucia(adapter, {
    getUserAttributes: (attributes) => {
      return {
        name: attributes.name,
        email: attributes.email,
      };
    },
  });
}

declare module "lucia" {
  interface Register {
    Lucia: ReturnType<typeof initializeLucia>;
    DatabaseUserAttributes: SelectUser;
  }
}
