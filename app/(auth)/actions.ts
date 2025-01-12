"use server";

import { z } from "zod";

import { createUser, getUser } from "@/lib/queries";
import { signIn } from "@/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Be at least 6 characters long")
    .regex(/[0-9]/, "Contain at least one number"),
});
const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Be at least 6 characters long")
      .regex(/[0-9]/, "Contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export interface LoginActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
  errors?: Record<string, string[]>;
}

export const handleLogin = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const rawFormData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = loginSchema.safeParse(rawFormData);

    if (!result.success) {
      return {
        status: "invalid_data",
        errors: result.error.flatten().fieldErrors,
      };
    }

    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    return { status: "failed" };
  }
};

export interface RegisterActionState {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
  errors?: Record<string, string[]>;
}

export const handleSignup = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    const validatedData = signUpSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!validatedData.success) {
      return {
        status: "invalid_data",
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const existingUser = await getUser(validatedData.data.email);

    if (existingUser) {
      return { status: "user_exists" };
    }

    await createUser(
      validatedData.data.name,
      validatedData.data.email,
      validatedData.data.password
    );

    await signIn("credentials", {
      email: validatedData.data.email,
      password: validatedData.data.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    return { status: "failed" };
  }
};
