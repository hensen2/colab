import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ErrorPage from "./routes/error-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from "./components/layouts/auth-layout";

const queryClient = new QueryClient();

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
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth/login",
        errorElement: <ErrorPage />,
      },
      {
        path: "auth/register",
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
