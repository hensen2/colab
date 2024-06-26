import { useRegister } from "@/services/auth/api/useRegister";
import { RegisterForm } from "@/services/auth/components/register-form";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const { mutate } = useRegister();
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign up for new account
      </h2>
      <RegisterForm onSubmit={mutate} />
      <p className="text-center text-sm leading-6 text-gray-500">
        Have an account?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign in here
        </Link>
      </p>
    </>
  );
}
