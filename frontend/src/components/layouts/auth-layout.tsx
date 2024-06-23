import { Link } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { useUser } from "@/services/auth/useUser";

export default function AuthLayout() {
  const { toast } = useToast();
  const user = useUser();
  console.log(user);

  return (
    <>
      <main className="flex min-h-screen flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <p className="h-8 w-auto text-center font-mono text-4xl font-semibold text-indigo-600">
              CoLab
            </p>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="space-y-6" action="#" method="POST">
            <div className="relative -space-y-px rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                  });
                }}
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="text-center text-sm leading-6 text-gray-500">
            Not registered?{" "}
            <Link
              to="/auth/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create new account
            </Link>
          </p>
        </div>
      </main>
      <Toaster />
    </>
  );
}
