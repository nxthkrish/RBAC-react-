import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";

interface PermissionProps {
  allowedRoles: string[];
  children: ReactNode;
}

const Permission = ({ allowedRoles, children }: PermissionProps) => {
  const { user } = useAuth();
  if (!user) return null;
  if (allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }
  return null;
};

export default Permission;
