import { Toaster } from "@/components/ui/toaster";
// import { useToast } from "@/components/ui/use-toast";
import { useToken } from "@/services/auth/api/useToken";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  // const { toast } = useToast();
  const { isSuccess, isLoading, isError, data, error } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.accessToken) {
      navigate("/app");
    } else {
      navigate("/auth/login");
    }
  }, [navigate, data.accessToken]);

  if (isSuccess && data.accessToken) {
    return (
      <>
        <Outlet />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <div className="flex h-screen w-screen items-center justify-center">
          <Loader2 size={64} className="animate-spin" />
        </div>
      </>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <>
        <Outlet />
        <Toaster />
      </>
    );
  }

  return null;
}
