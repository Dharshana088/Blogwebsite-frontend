import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (userData, tokenValue) => {
    setUser?.(userData);
    setToken?.(tokenValue);
    localStorage?.setItem?.("user", JSON.stringify?.(userData));
    localStorage?.setItem?.("token", tokenValue);
  };

  const logout = () => {
    setUser?.(null);
    setToken?.(null);
    localStorage?.removeItem?.("user");
    localStorage?.removeItem?.("token");
  };

  useEffect?.(() => {
    const storedUser = localStorage?.getItem?.("user");
    const storedToken = localStorage?.getItem?.("token");
    if (storedUser && storedToken) {
      setUser?.(JSON.parse?.(storedUser));
      setToken?.(storedToken);
    }
    setIsLoading?.(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
