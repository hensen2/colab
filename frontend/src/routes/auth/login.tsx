import { useLogin } from "@/features/auth/api/useLogin";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { mutate: login } = useLogin();
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <LoginForm login={login} />
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
