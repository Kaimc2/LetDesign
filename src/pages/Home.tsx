import heroImg from "../assets/images/hero.svg";
import customization from "../assets/images/customization.svg";
import imageViewer from "../assets/images/image_viewer.svg";
import windowShopping from "../assets/images/window_shopping.svg";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="w-full lg:w-[1440px] mx-auto flex relative">
        <div className="ml-0 px-10 lg:ml-[80px] w-full lg:w-[40%]">
          <span className="flex flex-col lg:block mt-9 z-0 relative text-center lg:text-left">
            <h1 className="text-5xl lg:text-[64px] font-bold">Create.</h1>
            <h1 className="text-5xl lg:text-[64px] font-bold">Customize.</h1>
            <h1 className="text-5xl lg:text-[64px] font-bold">Wear.</h1>
            <p className="text-xl lg:text-[24px] mt-[24px] mb-[40px]">
              From concept to creation, make your unique fashion statements
              effortlessly.
            </p>
            <Link
              to={"/design"}
              className="px-[20px] py-[10px] bg-accent hover:bg-accent-80 text-white rounded-md"
            >
              Get Started
            </Link>
            <div
              className="absolute -top-32 md:-top-[100px] -left-[90px] -z-10 w-[794px] h-[620px]
             bg-secondary rounded-md rotate-[-6deg]"
            ></div>
          </span>
        </div>
        <div
          className="absolute hidden lg:block -mt-[40px] right-0 w-[747px] h-[650px]
         bg-white p-20 z-10 shadow-md rounded-md"
        >
          <img className="object-cover" src={heroImg} alt="hero image" />
        </div>
      </div>

      {/* Information Section */}
      <div className="flex flex-col px-10 lg:px-[160px] xl:px-[240px] gap-[165px] mt-[320px] lg:mt-[400px] mb-[120px]">
        <div className="flex flex-col lg:flex-row items-center gap-[75px]">
          <div className="w-[285px] h-[285px] bg-white rounded-md relative">
            <img
              className="object-fit w-full h-full"
              src={customization}
              alt="Cloth Customization Image"
            />
            <div
              className="absolute w-[285px] h-[285px] bg-secondary
            -rotate-[10deg] rounded-md -z-10 -left-[22px] top-[25px]"
            ></div>
          </div>
          <div className="w-auto lg:w-[550px] text-center lg:text-left">
            <h1 className="text-5xl text-[48px] font-bold">
              Cloth Customization
            </h1>
            <h2 className="text-3xl lg:text-[32px] font-semibold">
              Tailor Your Perfect Fit
            </h2>
            <p className="text-xl lg:text-[24px] mt-[24px]">
              Explore endless customization options to create clothing that
              reflects your personal style.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-end items-center gap-[75px]">
          <div className="order-1 lg:order-2 w-[285px] h-[285px] bg-white rounded-md relative">
            <img
              className="object-fit w-full h-full"
              src={imageViewer}
              alt="3D Viewer Image"
            />
            <div
              className="absolute w-[285px] h-[285px] bg-secondary 
            rotate-[10deg] rounded-md -z-10 left-[22px] top-[25px]"
            ></div>
          </div>
          <div className="order-2 lg:order-1 w-auto lg:w-[550px] text-center lg:text-right">
            <h1 className="text-5xl text-[48px] font-bold">Preview in 3D</h1>
            <h2 className="text-3xl lg:text-[32px] font-semibold">
              See Your Design Come to Life
            </h2>
            <p className="text-xl lg:text-[24px] mt-[24px]">
              Rotate, zoom, and view your creation from every angle for a
              comprehensive preview.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-[75px]">
          <div className="w-[285px] h-[285px]  bg-white rounded-md relative">
            <img
              className="object-fit w-full h-full"
              src={windowShopping}
              alt="Cloth Creation Image"
            />
            <div
              className="absolute w-[285px] h-[285px] bg-[#EEAF2F] 
            -rotate-[10deg] rounded-md -z-10 -left-[22px] top-[25px]"
            ></div>
          </div>
          <div className="w-auto lg:w-[550px] text-center lg:text-left">
            <h1 className="text-5xl text-[48px] font-bold">
              Make It Into Reality
            </h1>
            <h2 className="text-3xl lg:text-[32px] font-semibold">
              Bring Your Creation to Life
            </h2>
            <p className="text-xl lg:text-[24px] mt-[24px]">
              Transform your digital designs into real-world fashion with our
              seamless production process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
