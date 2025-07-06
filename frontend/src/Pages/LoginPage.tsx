export function LoginPage() {
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
              id="username"
              type="text"
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
              id="password"
              type="password"
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

          {/* Submit 버튼 (동작은 없음) */}
          <button
            type="button"
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
          <a href="#" className="font-medium text-amber-600 hover:underline">
            Sign&nbsp;up
          </a>
        </div>
      </div>
    </div>
  );
}
