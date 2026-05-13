import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authStorage } from "@/utils/storage";
import { authService } from "@/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(authStorage.getToken());
  const [user, setUser] = useState(authStorage.getUser());

  useEffect(() => {
    if (token) {
      authStorage.setToken(token);
    } else {
      authStorage.clearToken();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      authStorage.setUser(user);
    } else {
      authStorage.clearUser();
    }
  }, [user]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login: async (payload) => {
        const data = await authService.login(payload);
        setToken(data.token);
        setUser(data);
        return data;
      },
      register: async (payload) => {
        const data = await authService.register(payload);
        setToken(data.token);
        setUser(data);
        return data;
      },
      logout: () => {
        setToken(null);
        setUser(null);
        authStorage.clear();
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
