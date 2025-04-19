import React, { ReactNode, useEffect } from "react";
import { setPermissionChecker } from "@/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Permission } from "@/types/permissions";

interface PermissionProviderProps {
  children: ReactNode;
}

export const PermissionProvider: React.FC<PermissionProviderProps> = ({ children }) => {
  const { hasPermission, user } = useAuth();

  useEffect(() => {
    if (!hasPermission) return;
    setPermissionChecker((permissions) => {
      if (!permissions) return true;
      return hasPermission(permissions as Permission[]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>{children}</>;
};

export default PermissionProvider;
