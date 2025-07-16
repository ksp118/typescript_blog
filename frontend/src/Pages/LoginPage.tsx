import { useState } from "react";
import axios from "axios";
import type { ApiResponse } from "../types/api";
import type { LoginResponse } from "../types/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { refresh } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post<ApiResponse<LoginResponse>>(
        "/api/auth/login",
        { username, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        setErrorMsg("");
        refresh();
        navigate("/");
      } else {
        setErrorMsg(res.data.error || "Login Failed.");
      }
    } catch (err: any) {
      console.error("Login Failed:", err);
      setErrorMsg(err.response?.data?.error || "Internal error.");
    }
  };

  return (
    <div
      className="
        layout-container
        h-[calc(100dvh-var(--header-height)-var(--footer-height))]
        flex justify-center items-center
        bg-[#fefbf6]                /* 전체 페이지 배경 */
        px-4                        /* 모바일 좌우 여백 */
      "
    >
      {/* 로그인 카드 */}
      <div
        className="
          w-full max-w-sm
          bg-neutral-50             /* 오프화이트: 배경과 자연스럽게 구분 */
          border border-neutral-200
          rounded-2xl shadow-md
          p-8
        "
      >
        {/* 헤더 */}
        <h1 className="text-2xl font-bold text-center mb-6 tracking-tight">
          Sign in
        </h1>

        {/* 폼 필드 */}
        <form className="space-y-5">
          {/* Username */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your@email.com"
              className="
                mt-2 w-full
                rounded-md border border-neutral-300
                bg-white placeholder-gray-400
                px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-amber-400
              "
            />
          </label>

          {/* Password */}
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="
                mt-2 w-full
                rounded-md border border-neutral-300
                bg-white placeholder-gray-400
                px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-amber-400
              "
            />
          </label>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          {/* Submit 버튼 */}
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="
              w-full
              rounded-md bg-amber-500 hover:bg-amber-600
              py-2 text-white font-semibold
              transition-colors
            "
          >
            Log&nbsp;in
          </button>
        </form>

        {/* 보조 링크 */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-amber-600 hover:underline"
          >
            Sign&nbsp;up
          </Link>
        </div>
      </div>
    </div>
  );
}
