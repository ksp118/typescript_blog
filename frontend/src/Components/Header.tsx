export const Header = () => {
  return (
    <header className="bg-deep-navy ">
      <div className=" max-w-7xl mx-auto h-[var(--header-height)] px-6 py-4 bg-transparent">
        <div className="flex flex-row justify-between items-center">
          <div>
            <a
              className="text-white font-noto font-bold text-2xl tracking-tight"
              href="/"
            >
              Gyuho Lee
            </a>
          </div>
          <div className="text-white font-noto text-md tracking-tight">
            Login
          </div>
        </div>
      </div>
    </header>
  );
};
