import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Permission } from "@/types/permissions";

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: Permission[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, permissions }) => {
  const { isLoggedIn, isLoading, hasPermission, user } = useAuth();

  if (isLoading) {
    return <div>Checking authentication...</div>;
  }

  if (!isLoggedIn) {
    console.log("User not logged in, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(permissions)) {
    console.log("User does not have required permissions, redirecting to /403");
    console.log("Required:", permissions, "User has:", user?.permissions);
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
