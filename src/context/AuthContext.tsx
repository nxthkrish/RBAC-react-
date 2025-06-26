import { createContext } from "react";
import { AuthUser } from "../types/user";

export interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
