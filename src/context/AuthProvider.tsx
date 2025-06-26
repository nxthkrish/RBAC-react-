import { ReactNode, useState } from "react";
import { AuthContext, AuthContextType } from "./AuthContext";
import { AuthUser } from "../types/user";
import { login as apiLogin } from "../api/userService";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Restore user from localStorage if present (for demo convenience)
  const [user, setUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials: { email: string; password: string }) => {
    // Always clear previous user before login to avoid stale state
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    try {
      const authUser = await apiLogin(credentials);
      setUser(authUser);
      localStorage.setItem("user", JSON.stringify(authUser));
      localStorage.setItem("authToken", "mock-token");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
