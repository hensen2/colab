import { useToken } from "@/features/auth/api/useToken";
import { Loader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { isPending, isSuccess, data } = useToken();

  if (isPending) {
    return (
      <>
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader2 size={64} className="animate-spin" />
        </div>
      </>
    );
  }

  return isSuccess && data.accessToken && data.user ? (
    <Navigate to="/app" />
  ) : (
    <Navigate to="/auth/login" />
  );
}
