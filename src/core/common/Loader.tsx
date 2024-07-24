import logoLoading from "../../assets/images/brands/logo.gif";

export const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center absolute">
      <img src={logoLoading} alt="loader" />
    </div>
  );
};

export const SectionLoader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img className="w-64" src={logoLoading} alt="loader" />
    </div>
  );
};

export const LayoutLoader = () => {
  return (
    <div className="w-full md:w-[calc(100vw-314px)] h-full md:h-[calc(100vh-64px)] flex justify-center items-center absolute">
      <img src={logoLoading} alt="loader" />
    </div>
  );
};
