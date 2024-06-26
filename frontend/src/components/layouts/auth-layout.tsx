import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex min-h-screen flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <p className="h-8 w-auto text-center font-mono text-4xl font-semibold text-indigo-600">
            CoLab
          </p>
          {children}
        </div>
      </main>
    </>
  );
}
