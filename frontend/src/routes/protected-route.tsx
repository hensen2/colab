import { useToken } from "@/services/auth/api/useToken";
import { Loader2 } from "lucide-react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { isSuccess, isLoading, data } = useToken();

  if (isLoading) {
    return (
      <>
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader2 size={64} className="animate-spin" />
        </div>
      </>
    );
  }

  return isSuccess && data?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
}
