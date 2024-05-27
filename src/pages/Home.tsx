import heroImg from "../assets/images/hero.svg";

export const Home = () => {
  return (
    <div>
      <div className="w-[1440px] mx-auto flex relative">
        <div className="ml-[160px] w-[594px]">
          <span className="z-0 relative">
            <h1 className="text-[64px] font-bold">Create.</h1>
            <h1 className="text-[64px] font-bold">Customize.</h1>
            <h1 className="text-[64px] font-bold">Wear.</h1>
            <p className="text-[24px] mt-[24px] mb-[40px]">
              From concept to creation, make your unique fashion statements
              effortlessly.
            </p>
            <button className="px-[20px] py-[10px] bg-[#5C19EB] text-white rounded-md">
              Get Started
            </button>
            <div className="absolute -top-[60px] -left-[90px] -z-10 w-[794px] h-[620px] bg-[#EEAF2F] rounded-md rotate-[-6deg]"></div>
          </span>
        </div>
        <div className="absolute -mt-[40px] left-[800px] w-[747px] h-[650px] bg-white p-20 z-10 shadow-md rounded-md">
          <img className="object-cover" src={heroImg} alt="hero image" />
        </div>
      </div>

      <div className="mt-[320px]">Content</div>
    </div>
  );
};
