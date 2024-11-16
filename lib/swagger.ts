import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: "app/api",
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Fintraq API Docs",
                description: "A finance tracking app built with NextJs, shadcn/ui and Vercel.",
                license: {
                    name: "MIT",
                    url: "https://github.com/hammadmajid/fintraq/blob/main/LICENSE"
                },
                version: "1.0",
            },
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT",
                    },
                },
            },
            security: [],
        },
    });
    return spec;
};