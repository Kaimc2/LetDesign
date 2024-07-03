import logoLoading from "../../assets/images/brands/logo.gif";

export const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center absolute">
      <img src={logoLoading} alt="loader" />
    </div>
  );
};

export const LayoutLoader = () => {
  return (
    <div className="w-[calc(100vw-314px)] h-[calc(100vh-64px)] flex justify-center items-center absolute">
      <img src={logoLoading} alt="loader" />
    </div>
  );
};
