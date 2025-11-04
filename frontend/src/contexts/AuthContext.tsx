import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { LoginResponse } from "../types/auth";
import type { ApiResponse } from "../types/api";

interface AuthContextValue {
  user: LoginResponse | null;
  isChecking: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<{ ok: true } | { ok: false; message: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  const refresh = useCallback(async () => {
    setIsChecking(true);
    try {
      const res = await axios.get<ApiResponse<LoginResponse>>("/api/auth/status", {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        setUser(null);
      } else {
        console.error("Failed to check auth status", error);
      }
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback<
    AuthContextValue["login"]
  >(async (username, password) => {
    try {
      const res = await axios.post<ApiResponse<LoginResponse>>("/api/auth/login", {
        username,
        password,
      }, {
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.data);
        return { ok: true } as const;
      }

      return {
        ok: false as const,
        message: res.data.error ?? "Login failed.",
      };
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error ?? "Internal error."
        : "Internal error.";

      return { ok: false as const, message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await axios.post("/api/auth/logout", null, { withCredentials: true });
    } catch (error) {
      console.error("Failed to logout", error);
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, isChecking, login, logout, refresh }),
    [user, isChecking, login, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
