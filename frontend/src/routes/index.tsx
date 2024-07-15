import { authLoader } from "@/features/auth/api/useAuth";
import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";

// Root Routes
import { default as ErrorPage } from "./ErrorPage";

// Auth Routes
import { default as LoginPage } from "./auth/Login";
import { default as RegisterPage } from "./auth/Register";

// App Routes
import { default as HomePage } from "./app/Home";
import { default as TeamsPage } from "./app/Teams";
import { default as CalendarPage } from "./app/Calendar";
import { default as ProjectsPage } from "./app/Projects";
import { default as ProtocolsPage } from "./app/Protocols";
import { default as DocumentsPage } from "./app/Documents";

const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: "/",
      lazy: async () => {
        const { ProtectedRoute } = await import("./ProtectedRoute");
        return {
          Component: ProtectedRoute,
        };
      },
      loader: authLoader(queryClient),
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
      lazy: async () => {
        const { PublicRoute } = await import("./PublicRoute");
        return {
          Component: PublicRoute,
        };
      },
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

export default createRouter;
