import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./lib/schemas/db.ts",
    dbCredentials: {
        host: process.env.POSTGRES_HOST!,
        database: process.env.POSTGRES_DATABASE!,
        user: process.env.POSTGRES_USER!,
        password: process.env.POSTGRES_PASSWORD!,
    },
});