import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import ErrorPage from "./routes/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
