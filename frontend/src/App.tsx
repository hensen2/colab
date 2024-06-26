import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ErrorPage from "./routes/error-page";
import { QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./components/layouts/auth-layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Root from "./routes/root";
import LoginPage from "./routes/auth/login";
import RegisterPage from "./routes/auth/register";
import { queryClient } from "./lib/query-client";

const router = createBrowserRouter([
  {
    path: "/app",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "teams",
        errorElement: <ErrorPage />,
      },
      {
        path: "projects",
        errorElement: <ErrorPage />,
      },
      {
        path: "calendar",
        errorElement: <ErrorPage />,
      },
      {
        path: "documents",
        errorElement: <ErrorPage />,
      },
      {
        path: "protocols",
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth/login",
        element: (
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "auth/register",
        element: (
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        ),
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
