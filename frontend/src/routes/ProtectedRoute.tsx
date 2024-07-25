import { DashboardLayout } from "@/components/layouts";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/features/auth/api/useAuth";
import { useUser } from "@/features/users/api/useUser";
import { Navigate, useNavigation } from "react-router-dom";

export const ProtectedRoute = () => {
  const navigation = useNavigation();
  const auth = useAuth();

  const isAuthenticated = !!auth.data?.isAuthenticated;
  const user = useUser(isAuthenticated);

  if (user.isPending || navigation.state === "loading") {
    return <Spinner />;
  }

  return auth.data?.isAuthenticated && user.data ? (
    <DashboardLayout />
  ) : (
    <Navigate to="/auth/login" replace={true} />
  );
};
