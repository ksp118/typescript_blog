export const Home = () => {
  return (
    <div className="layout-container">
      <div className="flex flex-row justify-between items-center min-h-[calc(100vh-var(--header-height))]">
        <div className="flex flex-col gap-4">
          <p className="text-7xl">Gyuho Lee</p>
          <p className="text-xl">
            Lost in the middle of Electrical and Computer Engineering
          </p>
        </div>
        <img className="w-72 h-fit" src="/img/main_img.jpg" alt="it's me" />
      </div>
      <div className="content-area"></div>
    </div>
  );
};
