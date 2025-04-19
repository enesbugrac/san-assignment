import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Permission } from "@/types/permissions";

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: Permission[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, permissions }) => {
  const { isLoggedIn, isLoading, hasPermission } = useAuth();

  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(permissions)) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
