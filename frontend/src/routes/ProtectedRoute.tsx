import { DashboardLayout } from "@/components/layouts";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/features/auth/api/useAuth";
import { Navigate, useNavigation } from "react-router-dom";

export const ProtectedRoute = () => {
  const navigation = useNavigation();
  const { data, isPending } = useAuth();

  if ((!data && isPending) || navigation.state === "loading") {
    return <Spinner />;
  }

  return data?.isAuthenticated ? (
    <DashboardLayout />
  ) : (
    <Navigate to="/auth/login" replace={true} />
  );
};
