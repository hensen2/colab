import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DashboardLayout, AuthLayout } from "@/components/layouts";
import {
  HomePage,
  DocumentsPage,
  TeamsPage,
  ProjectsPage,
  CalendarPage,
  ProtocolsPage,
  ErrorPage,
  ProtectedRoute,
  LoginPage,
  RegisterPage,
} from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/query-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "teams",
        element: <TeamsPage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "calendar",
        element: <CalendarPage />,
      },
      {
        path: "documents",
        element: <DocumentsPage />,
      },
      {
        path: "protocols",
        element: <ProtocolsPage />,
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
