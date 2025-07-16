// src/contexts/AuthContext.tsx
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import type { LoginResponse } from "../types/auth";
import type { ApiResponse } from "../types/api";

interface AuthContextType {
  user: LoginResponse | null;
  refresh: () => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);

  const refresh = () => {
    axios
      .get<ApiResponse<LoginResponse>>("/api/auth/status", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.data);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  };

  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", null, {
        withCredentials: true,
      });
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    refresh(); // 초기 mount 시 로그인 상태 확인
  }, []);

  return (
    <AuthContext.Provider value={{ user, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
