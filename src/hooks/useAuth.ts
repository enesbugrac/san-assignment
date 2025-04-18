import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Permission } from "../routes.tsx";

export interface User {
  name: string;
  permissions: Permission[];
}

const userQueryKey = ["user"];

const DUMMY_USER: User = {
  name: "John Doe",
  permissions: [Permission.VIEW_POSTS, Permission.VIEW_COMMENTS],
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: userQueryKey,
    queryFn: async () => {
      const cachedUser = queryClient.getQueryData<User>(userQueryKey);
      return cachedUser ?? null;
    },
    staleTime: Infinity,
    gcTime: Infinity,
    retry: false,
  });

  const login = () => {
    queryClient.setQueryData<User>(userQueryKey, DUMMY_USER);
    navigate("/");
  };

  const logout = () => {
    queryClient.removeQueries({ queryKey: userQueryKey, exact: true });
    navigate("/login");
  };

  const hasPermission = (requiredPermissions?: Permission[]): boolean => {
    if (!user) return false;
    if (!requiredPermissions || requiredPermissions.length === 0) return true;

    return requiredPermissions.every((reqPermission) =>
      user.permissions.includes(reqPermission)
    );
  };

  return {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    logout,
    hasPermission,
  };
};
