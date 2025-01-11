import Form from "next/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

function AuthForm({
  action,
  children,
  defaultEmail = "",
  defaultName = "",
  errors,
  mode = "login",
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
  defaultName?: string;
  errors: Record<string, string[]>;
  mode?: "login" | "signup";
}) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form action={action} className="flex flex-col gap-4 px-4 sm:px-16">
      {mode === "signup" && (
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="name"
            className="text-zinc-600 font-normal dark:text-zinc-400">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            className="bg-muted text-md md:text-sm"
            type="text"
            placeholder="Ahmed Anwer"
            autoComplete="name"
            autoFocus
            defaultValue={defaultName}
          />
          {errors?.name && (
            <p className="text-red-500 text-sm">{errors.name[0]}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-zinc-600 font-normal dark:text-zinc-400">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          className="bg-muted text-md md:text-sm"
          type="email"
          placeholder="ahmed@gmail.com"
          autoComplete="email"
          defaultValue={defaultEmail}
        />
        {errors?.email && (
          <p className="text-red-500 text-sm">{errors.email[0]}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 relative">
        <Label
          htmlFor="password"
          className="text-zinc-600 font-normal dark:text-zinc-400">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          className="bg-muted text-md md:text-sm"
          type={showPassword ? "text" : "password"}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-[25px] text-gray-500 text-lg">
          {showPassword ? "🙈" : "👁️"}
        </button>

        {errors?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
              {errors.confirmPassword && <li>- {errors.confirmPassword[0]}</li>}
            </ul>
          </div>
        )}
      </div>
      {mode === "signup" && (
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="confirmPassword"
            className="text-zinc-600 font-normal dark:text-zinc-400">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            className="bg-muted text-md md:text-sm"
            type={showPassword ? "text" : "password"}
          />

          {errors?.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword[0]}</p>
          )}
        </div>
      )}

      {children}
    </Form>
  );
}

export default AuthForm;
