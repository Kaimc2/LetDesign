import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import shirtFrontView from "../../../assets/images/canvas/shirtTemplateFront.png";
import shirtBackView from "../../../assets/images/canvas/shirtTemplateBack.png";
import logo from "../../../assets/images/brands/logo_white.png";
import { AuthContext } from "../../../context/AuthContext";
import { Store } from "../../../types/store.types";
import { loadCanvas } from "../../../utils/fabricUtils";
import CanvasViewer from "../../editor/components/CanvasViewer";
import { ReadOnlyBackCanvas } from "../../editor/components/ReadOnlyBackCanvas";
import { ReadOnlyFrontCanvas } from "../../editor/components/ReadOnlyFrontCanvas";
import { NavbarDropdown } from "../../../core/common/NavbarDropdown";
import api from "../../../utils/api";

export const Preview = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { id } = useParams();
  const frontCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricFrontCanvasRef = useRef<fabric.Canvas | null>(null);
  const fabricBackCanvasRef = useRef<fabric.Canvas | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [commissionType, setCommissionType] = useState<
    "individual" | "team" | "bulk"
  >("individual");
  const [options, setOptions] = useState<{
    material: string;
    color: string;
    sizes: {
      size: string;
      qty: number;
    }[];
  }>();
  const [total, setTotal] = useState(0);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const selectedMaterial = store?.materials.find(
    (material) => material.name === options?.material
  );
  const selectedColor = store?.colors.find(
    (color) => color.name === options?.color
  );
  const selectedSizes = (currentSize: string) => {
    return store?.sizes.find((size) => size.name === currentSize);
  };
  const [is2D, setIs2D] = useState(true);
  const [isFront, setIsFront] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`commissions/${id}`)
      .then((res) => {
        console.log(res);
        const fetchData = res.data.data;
        setStore(fetchData.store);
        setCommissionType(fetchData.type);
        setOptions(JSON.parse(fetchData.options));
        setTotal(fetchData.total);
        loadCanvas(
          fabricFrontCanvasRef.current,
          fetchData.design.front_content
        );
        loadCanvas(fabricBackCanvasRef.current, fetchData.design.back_content);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

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

  const goBack = () => {
    navigate("/dashboard/commissions");
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
              src={user?.profilePicture ?? "/placeholder/pf.png"}
              alt="profile picture"
            />

            {/* Dropdown Menu */}
            {toggleDropdown && (
              <NavbarDropdown setToggleDropdown={setToggleDropdown} />
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to={"/login"}
              className="hidden md:block px-[20px] py-[10px] text-lg hover:text-accent-80"
            >
              Sign In
            </Link>
            <Link
              to={"/register"}
              className="hidden md:block px-[20px] py-[10px] text-lg bg-accent hover:bg-accent-80 text-white rounded-md "
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <div className="flex">
        <div className="w-[314px] border border-r-gray-300 shadow-md">
          <h1 className="py-4 px-8 font-bold border border-b-brand-gray">
            Commission Preview
          </h1>

          <div className="h-[517px] overflow-y-auto">
            <div className="flex flex-col gap-2 p-6">
              <div className="flex gap-2">
                <p className="font-semibold">Commission Type:</p>
                <p>
                  {commissionType.slice(0, 1).toUpperCase() +
                    commissionType.slice(1)}
                </p>
              </div>
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <p className="font-semibold">Material Type:</p>
                  <p>{options?.material}</p>
                </div>
                <p>${selectedMaterial?.price}</p>
              </div>
              <div className="flex gap-2 justify-between mb-2">
                <div className="flex gap-2">
                  <p className="font-semibold">Color Type:</p>
                  <p>{options?.color}</p>
                </div>
                <p>${selectedColor?.price}</p>
              </div>
              <div className="border border-t-gray-400 border-l-0 border-r-0 border-b-0 p-2">
                <div className="flex">
                  <p className="w-[30%]">Size</p>
                  <p className="w-[30%]">Price</p>
                  <p className="w-[40%] text-right">Quantity</p>
                </div>
                {options?.sizes.map((size, index) => {
                  return (
                    <div key={index} className="flex gap-2">
                      <p className="w-[30%]">{size.size}</p>
                      <p className="w-[30%]">
                        ${selectedSizes(size.size)?.price}
                      </p>
                      <p className="w-[40%] text-right">{size.qty}</p>
                    </div>
                  );
                })}
              </div>
              <div className="border flex justify-end border-t-gray-400 border-l-0 border-r-0 border-b-0 py-2">
                <p>Total: ${total}</p>
              </div>
            </div>
          </div>

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
            <button
              onClick={goBack}
              className="p-[10px] w-full rounded-md text-white bg-secondary hover:bg-secondary-80"
            >
              Go Back
            </button>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center relative h-[calc(100vh-4rem)]">
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
      </div>
    </section>
  );
};
