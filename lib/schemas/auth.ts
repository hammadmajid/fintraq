import { z } from "zod";

export interface Session {
    userId: string,
    token: string,
    createdAt: Date,
    expiresAt: Date,
}

export interface User {
    id: string,
    fullName: string,
    email: string,
    createdAt: Date,
}

export const signUpForm = z.object({
    firstName: z.string().min(1, {
        message: "Please enter at least 1 chracacter",
    }),
    lastName: z.string().min(1, {
        message: "Please enter at least 1 chracacter",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

export const signInForm = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});
