export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-deep-navy">
      <div className="layout-container flex justify-between items-center h-[var(--header-height)] px-6 py-4">
        <a
          href="/"
          className="text-white font-noto font-bold text-2xl tracking-tight"
        >
          Gyuho Lee
        </a>
        <div className="text-white font-noto text-md tracking-tight">
          {/* Login */}
        </div>
      </div>
    </header>
  );
};
