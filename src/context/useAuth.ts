import { useContext } from "react";
import { AuthContext, AuthContextType } from "./AuthContextValue";

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
