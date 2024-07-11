import { useToken } from "@/features/auth/api/useToken";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { isSuccess, isLoading, data, error } = useToken();
  console.log(error?.response?.status);

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
    <Navigate to="/app" />
  ) : (
    <Navigate to="/auth/login" />
  );
}
