import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LuSquareMenu } from "react-icons/lu";
import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { user, logout } = useAuth();

  //detect outer area of menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });

  return (
    <header className="sticky top-0 z-50 bg-deep-navy">
      <div className="layout-container relative flex justify-between items-center h-[var(--header-height)] px-6 py-4">
        <Link
          to="/"
          className="text-white font-noto font-bold text-2xl tracking-tight"
        >
          Gyuho Lee
        </Link>
        <div className="flex items-center space-x-4">
          {/* 로그인 유저 인사말 */}
          {user && (
            <span className="text-white">
              안녕하세요, <b>{user.nickname}</b>님
            </span>
          )}

          {/* 메뉴 버튼 및 드롭다운 */}
          <div ref={menuRef} className="font-noto text-md tracking-tight mx-0">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="align-middle cursor-pointer text-white"
            >
              <LuSquareMenu className="w-8 h-8" />
            </button>

            <div
              className={`
                absolute right-[1.5rem] top-[var(--header-height)] w-32 rounded-xl 
                bg-sky-100 p-2 text-center shadow-lg transition-all duration-300 ease-in-out
                origin-top-right transform
                ${
                  isMenuOpen
                    ? "opacity-100 translate-y-4 visible"
                    : "opacity-0 translate-y-0 invisible"
                }
              `}
            >
              <ul className="space-y-1">
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
