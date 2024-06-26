import { useLogin } from "@/services/auth/api/useLogin";
import { LoginForm } from "@/services/auth/components/login-form";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { mutate } = useLogin();
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <LoginForm onSubmit={mutate} />
      <p className="text-center text-sm leading-6 text-gray-500">
        Not registered?{" "}
        <Link
          to="/auth/register"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Create new account
        </Link>
      </p>
    </>
  );
}
