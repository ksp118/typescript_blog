import { useState } from "react";
import axios from "axios";
import type { ApiResponse } from "../types/api";
import { useNavigate } from "react-router-dom";

export function SignUpPage() {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post<ApiResponse<null>>("/api/auth/register", {
        username,
        nickname,
        email,
        password,
      });

      if (res.data.success) {
        setSuccessMsg("Registration successful!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setErrorMsg(res.data.error || "Registration failed.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.error || "Internal server error.");
    }
  };

  return (
    <div className="layout-container flex justify-center items-center min-h-screen bg-[#fefbf6] px-4">
      <div className="w-full max-w-md bg-white border border-neutral-200 rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Sign up</h1>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Nickname</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </label>

          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-green-600 text-sm text-center">{successMsg}</p>
          )}

          <button
            type="submit"
            onClick={handleRegister}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-md font-semibold"
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-amber-600 hover:underline">
            Log&nbsp;in
          </a>
        </div>
      </div>
    </div>
  );
}
