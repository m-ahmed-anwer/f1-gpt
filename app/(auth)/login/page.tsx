"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import AuthForm from "@/components/auth-form";
import SubmitButton from "@/components/submit-button";

import { handleLogin, type LoginActionState } from "../actions";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<LoginActionState, FormData>(
    handleLogin,
    {
      status: "idle",
      errors: {},
    }
  );

  useEffect(() => {
    if (state.status === "failed") {
      toast.error("Invalid credentials!");
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!");
    } else if (state.status === "success") {
      setIsSuccessful(true);
      router.refresh();
    }
  }, [state.status, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    formAction(formData);
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl flex flex-col gap-12">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-zinc-100 sm:text-3xl md:text-4xl">
            Log In
          </h1>
        </div>
        <AuthForm
          action={handleSubmit}
          defaultEmail={email}
          errors={state.errors}
          mode="login">
          <SubmitButton isSuccessful={isSuccessful}>Log in</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Don't have an account? "}
            <Link
              href="/signup"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200">
              Sign up
            </Link>
            {" for free."}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}

export default Login;
