"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import AuthForm from "@/components/auth-form";
import SubmitButton from "@/components/submit-button";

import { handleSignup, type RegisterActionState } from "../actions";

function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    handleSignup,
    {
      status: "idle",
      errors: {},
    }
  );

  useEffect(() => {
    if (state.status === "user_exists") {
      toast.error("Account already exists");
    } else if (state.status === "failed") {
      toast.error("Failed to create account");
    } else if (state.status === "invalid_data") {
      toast.error("Failed validating your submission!");
    } else if (state.status === "success") {
      toast.success("Account created successfully");
      setIsSuccessful(true);
      router.refresh();
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get("email") as string);
    setName(formData.get("name") as string);
    formAction(formData);
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-zinc-100 sm:text-3xl md:text-4xl">
            Sign Up
          </h1>
        </div>
        <AuthForm
          action={handleSubmit}
          defaultEmail={email}
          defaultName={name}
          errors={state.errors}
          mode="signup">
          <SubmitButton isSuccessful={isSuccessful}>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {"Already have an account? "}
            <Link
              href="/login"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200">
              Log in
            </Link>
            {" instead."}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}

export default Signup;
