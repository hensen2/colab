import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ErrorPage from "./routes/error-page";
import { QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./components/layouts/auth-layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoute from "./routes/protected-route";
import LoginPage from "./routes/auth/login";
import RegisterPage from "./routes/auth/register";
import { queryClient } from "./lib/query-client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <DashboardLayout /> },
      {
        path: "teams",
      },
      {
        path: "projects",
      },
      {
        path: "calendar",
      },
      {
        path: "documents",
      },
      {
        path: "protocols",
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
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
