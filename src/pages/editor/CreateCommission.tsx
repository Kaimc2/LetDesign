import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import shirtFrontView from "../../assets/images/canvas/shirtTemplateFront.png";
import shirtBackView from "../../assets/images/canvas/shirtTemplateBack.png";
import logo from "../../assets/images/brands/logo_white.png";
import { ReadOnlyFrontCanvas } from "./components/ReadOnlyFrontCanvas";
import { NavbarDropdown } from "../../core/common/NavbarDropdown";
import CanvasViewer from "./components/CanvasViewer";
import { loadCanvas } from "../../utils/fabricUtils";
import { ReadOnlyBackCanvas } from "./components/ReadOnlyBackCanvas";

export const CreateCommission = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { state } = useLocation();
  const {
    frontCanvas,
    backCanvas,
  }: { frontCanvas: string; backCanvas: string } = state;
  const frontCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricFrontCanvasRef = useRef<fabric.Canvas | null>(null);
  const fabricBackCanvasRef = useRef<fabric.Canvas | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [is2D, setIs2D] = useState(true);
  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    if (frontCanvas && backCanvas) {
      loadCanvas(fabricFrontCanvasRef.current, frontCanvas);
      loadCanvas(fabricBackCanvasRef.current, backCanvas);
    }
  }, [backCanvas, fabricBackCanvasRef, fabricFrontCanvasRef, frontCanvas]);

  const handleSwitchView = (state: boolean) => {
    setIsFront(state);
  };

  // Apply styles to canvas wrappers
  useEffect(() => {
    const frontCanvas = fabricFrontCanvasRef.current;
    const backCanvas = fabricBackCanvasRef.current;

    applyCanvasWrapperStyle(frontCanvas, isFront, is2D);
    applyCanvasWrapperStyle(backCanvas, !isFront, is2D);
  }, [is2D, isFront]);

  const applyCanvasWrapperStyle = (
    canvas: fabric.Canvas | null,
    isVisible: boolean,
    isEdit: boolean
  ) => {
    if (canvas) {
      const wrapper = canvas.getElement().parentNode as HTMLElement;
      if (wrapper && wrapper.className === "canvas-container") {
        wrapper.style.display = isVisible && isEdit ? "block" : "none";
      }
    }
  };

  return (
    <section className="w-screen overflow-x-hidden flex flex-col">
      <div className="flex justify-between h-16 px-8 items-center bg-secondary shadow-sm">
        <div className="flex items-center gap-6">
          <Link to={"/"}>
            <img className="w-12 h-12 rounded-md" src={logo} alt="Logo" />
          </Link>
        </div>

        {isAuthenticated ? (
          <div
            onClick={() => setToggleDropdown(!toggleDropdown)}
            className="hidden md:flex relative items-center gap-4 hover:cursor-pointer"
          >
            <img
              className="w-10 h-10 rounded-full"
              src="/placeholder/pf.png"
              alt="profile picture"
            />

            {/* Dropdown Menu */}
            {toggleDropdown && <NavbarDropdown />}
          </div>
        ) : (
          <Link
            to={"/register"}
            className="hidden md:block px-[20px] py-[10px] text-lg bg-accent hover:bg-accent-80 text-white rounded-md "
          >
            Sign Up
          </Link>
        )}
      </div>

      <div className="flex">
        <div className="w-[314px] border border-r-gray-300 shadow-md">
          <h1 className="py-4 px-8 font-bold border border-b-brand-gray">
            Commission
          </h1>

          <div className="h-[517px] overflow-y-auto">something</div>

          <div className="px-8 border border-y-brand-gray">
            <h1 className="py-4 font-bold">View</h1>
            <div className="flex pb-4 justify-evenly gap-9">
              <div
                onClick={() => handleSwitchView(true)}
                className="group flex flex-col gap-4 items-center hover:cursor-pointer"
              >
                <div
                  className={`flex w-[100px] h-[100px] rounded-md border ${
                    isFront
                      ? "border-black"
                      : "border-brand-gray group-hover:border-black"
                  } `}
                >
                  <img
                    className="p-2"
                    src={shirtFrontView}
                    alt="Shirt Front View"
                  />
                </div>
                <p
                  className={`${
                    isFront
                      ? "text-black"
                      : "text-brand-gray group-hover:text-black"
                  }`}
                >
                  Front
                </p>
              </div>

              <div
                onClick={() => handleSwitchView(false)}
                className="group flex flex-col gap-4 items-center hover:cursor-pointer"
              >
                <div
                  className={`flex w-[100px] h-[100px] rounded-md border ${
                    isFront
                      ? "border-brand-gray group-hover:border-black"
                      : "border-black"
                  } `}
                >
                  <img
                    className="p-2"
                    src={shirtBackView}
                    alt="Shirt Back View"
                  />
                </div>
                <p
                  className={`${
                    isFront
                      ? "text-brand-gray group-hover:text-black"
                      : "text-black"
                  }`}
                >
                  Back
                </p>
              </div>
            </div>
          </div>

          <div className="flex px-8 gap-[10px] mt-[18px]">
            <button className="p-[10px] w-[128px] rounded-md text-white bg-secondary hover:bg-secondary-80">
              Save Design
            </button>
            <Link
              to={"/design/commission/create"}
              className="p-[10px] w-[128px] text-center rounded-md text-white bg-accent hover:bg-accent-80"
            >
              Send Design
            </Link>
          </div>
        </div>

        <div className="flex-grow relative h-[calc(100vh-4rem)]">
          <ReadOnlyFrontCanvas
            frontCanvasRef={frontCanvasRef}
            fabricFrontCanvasRef={fabricFrontCanvasRef}
          />
          <ReadOnlyBackCanvas
            backCanvasRef={backCanvasRef}
            fabricBackCanvasRef={fabricBackCanvasRef}
          />

          {!is2D && (
            <CanvasViewer
              frontCanvas={frontCanvasRef.current}
              backCanvas={backCanvasRef.current}
            />
          )}

          <div className="absolute flex top-8 right-8">
            <div
              onClick={() => {
                setIs2D(true);
              }}
              className={`border ${
                is2D && "bg-[#DADADA]/80"
              } border-black hover:bg-[#DADADA]/80 hover:cursor-pointer px-4 py-2 rounded-tl-md rounded-bl-md`}
            >
              2D
            </div>
            <div
              onClick={() => setIs2D(false)}
              className={`border ${
                !is2D && "bg-[#DADADA]/80"
              } border-l-0 border-black hover:bg-[#DADADA]/80 hover:cursor-pointer px-4 py-2 rounded-tr-md rounded-br-md`}
            >
              3D
            </div>
          </div>
        </div>

        <div className="w-[314px]">a</div>
      </div>
    </section>
  );
};