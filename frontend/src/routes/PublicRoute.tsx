import { AuthLayout } from "@/components/layouts";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/features/auth/api/useAuth";
import { Navigate, useNavigation } from "react-router-dom";

export const PublicRoute = () => {
  const auth = useAuth();
  const navigation = useNavigation();

  if (!auth.data && navigation.state === "loading") {
    return <Spinner />;
  }

  return auth.data?.isAuthenticated ? (
    <Navigate to="/" replace={true} />
  ) : (
    <AuthLayout />
  );
};
