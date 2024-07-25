import { createBrowserRouter } from "react-router-dom";
import { authLoader } from "@/features/auth/api/useAuth";
import { QueryClient } from "@tanstack/react-query";
import { projectsLoader } from "@/features/projects/api/useProjects";
import { default as ErrorPage } from "./ErrorPage";
import { experimentsLoader } from "@/features/experiments/api/useExperiments";

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
        {
          index: true,
          lazy: async () => {
            const { HomePage } = await import("./app/Home");
            return {
              Component: HomePage,
            };
          },
        },
        {
          path: "teams",
          lazy: async () => {
            const { TeamsPage } = await import("./app/Teams");
            return {
              Component: TeamsPage,
            };
          },
        },
        {
          path: "projects",
          lazy: async () => {
            const { ProjectsPage } = await import("./app/Projects");
            return {
              Component: ProjectsPage,
            };
          },
          loader: projectsLoader(queryClient),
        },
        {
          path: "projects/:projectId",
          lazy: async () => {
            const { ProjectPage } = await import("./app/Project");
            return {
              Component: ProjectPage,
            };
          },
        },
        {
          path: "calendar",
          lazy: async () => {
            const { CalendarPage } = await import("./app/Calendar");
            return {
              Component: CalendarPage,
            };
          },
        },
        {
          path: "experiments",
          lazy: async () => {
            const { ExperimentsPage } = await import("./app/Experiments");
            return {
              Component: ExperimentsPage,
            };
          },
          loader: experimentsLoader(queryClient),
        },
        {
          path: "experiments/:experimentId",
          lazy: async () => {
            const { ExperimentPage } = await import("./app/Experiment");
            return {
              Component: ExperimentPage,
            };
          },
        },
        {
          path: "protocols",
          lazy: async () => {
            const { ProtocolsPage } = await import("./app/Protocols");
            return {
              Component: ProtocolsPage,
            };
          },
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
          lazy: async () => {
            const { LoginPage } = await import("./auth/Login");
            return {
              Component: LoginPage,
            };
          },
        },
        {
          path: "register",
          lazy: async () => {
            const { RegisterPage } = await import("./auth/Register");
            return {
              Component: RegisterPage,
            };
          },
        },
      ],
    },
  ]);

export default createRouter;
