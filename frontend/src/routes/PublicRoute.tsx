import { AuthLayout } from "@/components/layouts";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/features/auth/api/useAuth";
import { Navigate, useNavigation } from "react-router-dom";

export const PublicRoute = () => {
  const { data } = useAuth();
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <Spinner />;
  }

  return data?.isAuthenticated ? <Navigate to="/" /> : <AuthLayout />;
};
