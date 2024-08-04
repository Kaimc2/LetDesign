import { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/brands/logo_white.png";
import { fabric } from "fabric";
import * as fb from "../../utils/fabricUtils";
import {
  CircleProperty,
  RectangleProperty,
  SelectedObjectProperty,
  TextProperty,
} from "../../types/editor.types";
import useTextPropertyChange from "../../hooks/useTextPropertyChange";
import shirtFrontView from "../../assets/images/canvas/shirtTemplateFront.png";
import shirtBackView from "../../assets/images/canvas/shirtTemplateBack.png";
import { Property } from "./components/Property";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSquare } from "@fortawesome/free-regular-svg-icons";
import { faT, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FrontCanvas } from "./components/FrontCanvas";
import { BackCanvas } from "./components/BackCanvas";
import CanvasViewer from "./components/CanvasViewer";
import { AuthContext } from "../../context/AuthContext";
import { NavbarDropdown } from "../../core/common/NavbarDropdown";
import api from "../../utils/api";
import { displayNotification } from "../../utils/helper";
import { DesignInput } from "../../types/design.types";

export const Editor = () => {
  const frontCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricFrontCanvasRef = useRef<fabric.Canvas | null>(null);
  const fabricBackCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isFront, setIsFront] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [showProperty, setShowProperty] = useState(true);
  const [selectedObj, setSelectedObj] = useState<SelectedObjectProperty | null>(
    null
  );
  const [objects, setObjects] = useState<fabric.Object[]>([]);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);
  const [designName, setDesignName] = useState<string>("My Design");
  const [isSaved, setIsSaved] = useState(false);
  const [designId, setDesignId] = useState("");
  const fileUpload = useRef<HTMLInputElement>(null);
  const { user, isAuthenticated } = useContext(AuthContext);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const navigate = useNavigate();

  // Apply styles to canvas wrappers
  useEffect(() => {
    const frontCanvas = fabricFrontCanvasRef.current;
    const backCanvas = fabricBackCanvasRef.current;

    applyCanvasWrapperStyle(frontCanvas, isFront, isEdit);
    applyCanvasWrapperStyle(backCanvas, !isFront, isEdit);
  }, [isEdit, isFront]);

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

  const handleSwitchView = (state: boolean) => {
    if (state) {
      const canvas = fabricFrontCanvasRef.current;
      if (canvas) initializeCanvasObjects(canvas);
    } else {
      const canvas = fabricBackCanvasRef.current;
      if (canvas) initializeCanvasObjects(canvas);
    }

    setIsFront(state);
  };

  const initializeCanvasObjects = (canvas: fabric.Canvas) => {
    const canvasObjects: fabric.Object[] = [];
    canvas.getObjects().forEach((obj) => {
      const imgObj = obj as fabric.Image;
      if (
        obj.type === "rect" ||
        obj.type === "circle" ||
        obj.type === "i-text" ||
        (obj.type === "image" &&
          obj.name !== "canvasTemplate" &&
          !imgObj.getSrc().includes("shirtTemplateFront") &&
          !imgObj.getSrc().includes("shirtTemplateBack"))
      ) {
        canvasObjects.push(obj);
      }
    });
    setObjects(canvasObjects);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    acceptString: boolean = false
  ) => {
    const { name, value } = e.target;

    setSelectedObj((prev) => ({
      ...prev,
      [name]: acceptString ? value : Number(value),
    }));

    if (name === "fill") {
      handleInputBlur();
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setSelectedObj((prev) => ({
      ...prev,
      [name]: value,
    }));

    handleInputBlur();
  };

  const handleInputBlur = () => {
    const canvas = isFront
      ? fabricFrontCanvasRef.current
      : fabricBackCanvasRef.current;

    if (canvas && selectedObj) {
      const activeObject = canvas.getActiveObject();

      const commonProp = {
        left: selectedObj.x,
        top: selectedObj.y,
        width: selectedObj.width,
        height: selectedObj.height,
        angle: selectedObj.angle,
        fill: selectedObj.fill,
        scaleX: 1,
        scaleY: 1,
      };

      if (activeObject?.type === "rect") {
        activeObject.set({
          ...commonProp,
          rx: (selectedObj as RectangleProperty).cornerRadius,
          ry: (selectedObj as RectangleProperty).cornerRadius,
        } as fabric.Rect);
      } else if (activeObject?.type === "circle") {
        activeObject.set({
          ...commonProp,
          radius: (selectedObj as CircleProperty).radius,
        } as fabric.Circle);
      } else if (activeObject?.type === "i-text") {
        (activeObject as fabric.IText).set({
          ...commonProp,
          fontFamily: (selectedObj as TextProperty).fontFamily,
          fontSize: (selectedObj as TextProperty).fontSize,
          fontWeight: (selectedObj as TextProperty).fontWeight,
          underline: (selectedObj as TextProperty).textDecoration?.underline,
          linethrough: (selectedObj as TextProperty).textDecoration
            ?.strikethrough,
          overline: (selectedObj as TextProperty).textDecoration?.overline,
          fontStyle: (selectedObj as TextProperty).fontStyle,
          stroke: (selectedObj as TextProperty).stroke,
          strokeWidth: (selectedObj as TextProperty).strokeWidth,
          textAlign: (selectedObj as TextProperty).textAlign,
          lineHeight: (selectedObj as TextProperty).lineHeight,
        });
      } else if (
        activeObject?.type === "image" &&
        activeObject?.name !== "canvasTemplate"
      ) {
        (activeObject as fabric.Image).set({
          ...commonProp,
          scaleX: 0.2,
          scaleY: 0.2,
        });
      }

      canvas.requestRenderAll();
    }
  };

  const setActive = (obj: fabric.Object) => {
    const canvas = isFront
      ? fabricFrontCanvasRef.current
      : fabricBackCanvasRef.current;

    if (canvas) {
      canvas.setActiveObject(obj);
      canvas.requestRenderAll();
    }
  };

  useTextPropertyChange(
    isFront ? fabricFrontCanvasRef.current : fabricBackCanvasRef.current,
    selectedObj
  );

  const addRect = () => {
    const canvas = isFront
      ? fabricFrontCanvasRef.current
      : fabricBackCanvasRef.current;

    if (canvas) fb.addRectangle(canvas);
  };

  const addCircle = () => {
    const canvas = isFront
      ? fabricFrontCanvasRef.current
      : fabricBackCanvasRef.current;

    if (canvas) fb.addCircle(canvas);
  };

  const addText = () => {
    const canvas = isFront
      ? fabricFrontCanvasRef.current
      : fabricBackCanvasRef.current;

    if (canvas) fb.addText(canvas);
  };

  const handleUpload = () => {
    const canvas = isFront
      ? fabricFrontCanvasRef.current
      : fabricBackCanvasRef.current;
    const files = fileUpload.current?.files;

    if (files && canvas) {
      const uploadedImg = URL.createObjectURL(files[0]);
      fabric.Image.fromURL(uploadedImg, (oImg) => {
        oImg.scale(0.2);
        oImg.name = files[0].name;
        canvas.add(oImg);
        canvas.centerObject(oImg);
      });
    }
  };

  const handleSave = async () => {
    const inputs: DesignInput = {
      name: designName,
      user_id: String(user?.id),
      design_thumbnail: String(
        fb.getDesignThumbnail(fabricFrontCanvasRef.current)
      ),
      front_content: JSON.stringify(
        await fb.saveCanvas(fabricFrontCanvasRef.current, 0.5)
      ),
      back_content: JSON.stringify(
        await fb.saveCanvas(fabricBackCanvasRef.current, 0.5)
      ),
      status: "draft",
    };

    if (isSaved) {
      api
        .put(
          `designs/${designId}`,
          { ...inputs },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } }
        )
        .then(() => {
          displayNotification("Design save successfully", "success");
        })
        .catch((err) => {
          console.error(err);
          displayNotification("Failed to save design", "error");
        });
    } else {
      api
        .post(
          "designs",
          { ...inputs },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } }
        )
        .then((res) => {
          console.log(res);
          setIsSaved(true);
          setDesignId(res.data.data.id);
          displayNotification("Design save successfully", "success");
        })
        .catch((err) => {
          console.error(err);
          displayNotification("Failed to save design", "error");
        });
    }
  };

  const handleSend = async () => {
    const inputs: DesignInput = {
      name: designName,
      user_id: String(user?.id),
      design_thumbnail: String(
        fb.getDesignThumbnail(fabricFrontCanvasRef.current)
      ),
      front_content: JSON.stringify(
        await fb.saveCanvas(fabricFrontCanvasRef.current, 0.5)
      ),
      back_content: JSON.stringify(
        await fb.saveCanvas(fabricBackCanvasRef.current, 0.5)
      ),
      status: "draft",
    };

    if (isSaved) {
      api
        .put(
          `designs/${designId}`,
          { ...inputs },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } }
        )
        .then((res) => {
          navigate("/design/commission/create", {
            state: {
              id: res.data.data.id,
              frontCanvas: inputs.front_content,
              backCanvas: inputs.back_content,
            },
          });
        })
        .catch((err) => {
          console.error(err);
          displayNotification("Failed to save design", "error");
        });
    } else {
      api
        .post(
          "designs",
          { ...inputs },
          { headers: { Authorization: `Bearer ${user?.accessToken}` } }
        )
        .then((res) => {
          navigate("/design/commission/create", {
            state: {
              id: res.data.data.id,
              frontCanvas: inputs.front_content,
              backCanvas: inputs.back_content,
            },
          });
        })
        .catch((err) => {
          console.error(err);
          displayNotification("Failed to save design", "error");
        });
    }
  };

  return (
    <section className="w-screen overflow-x-hidden flex flex-col">
      <div className="flex justify-between h-16 px-8 items-center bg-secondary shadow-sm">
        <div className="flex items-center gap-6">
          <Link to={"/"}>
            <img className="w-12 h-12 rounded-md" src={logo} alt="Logo" />
          </Link>

          <div className="flex gap-8">
            <button
              className="hover:-translate-y-1 transition-transform ease-in-out duration-300"
              title="Add Rectangle"
              onClick={addRect}
            >
              <FontAwesomeIcon icon={faSquare} size="xl" />
            </button>
            <button
              className="hover:-translate-y-1 transition-transform ease-in-out duration-300"
              title="Add Circle"
              onClick={addCircle}
            >
              <FontAwesomeIcon icon={faCircle} size="xl" />
            </button>
            <button
              className="hover:-translate-y-1 transition-transform ease-in-out duration-300"
              title="Add Text"
              onClick={addText}
            >
              <FontAwesomeIcon icon={faT} size="xl" />
            </button>
            <button
              className="hover:-translate-y-1 transition-transform ease-in-out duration-300"
              onClick={() => fileUpload.current?.click()}
              title="Upload Picture"
            >
              <input
                className="hidden"
                type="file"
                accept="image/*"
                ref={fileUpload}
                onInput={handleUpload}
                name="upload"
                id="upload"
              />
              <FontAwesomeIcon icon={faUpload} size="xl" />
            </button>
          </div>
        </div>

        <input
          className="bg-transparent text-center focus:bg-white py-1"
          value={designName}
          onChange={(e) => setDesignName(e.target.value)}
          type="text"
        />

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
            Layers
          </h1>

          <ul className="h-[517px] overflow-y-auto">
            {objects.map((obj, index) => (
              <li
                onClick={() => setActive(obj)}
                className={`py-4 px-9 border border-b-brand-gray hover:bg-[#DADADA]/80 hover:cursor-pointer ${
                  activeObject === obj && "bg-[#DADADA]/80"
                }`}
                key={index}
              >
                {obj.name}
              </li>
            ))}
          </ul>

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

          <div className="flex justify-center px-8 gap-[10px] mt-[18px]">
            <button
              onClick={handleSave}
              className="p-[10px] w-[128px] rounded-md text-white bg-secondary hover:bg-secondary-80"
            >
              Save Design
            </button>
            <button
              onClick={handleSend}
              className="p-[10px] w-[128px] text-center rounded-md text-white bg-accent hover:bg-accent-80"
            >
              Commission
            </button>
          </div>
        </div>

        <div className="flex-grow flex justify-center items-center relative h-[calc(100vh-4rem)]">
          <FrontCanvas
            frontCanvasRef={frontCanvasRef}
            fabricFrontCanvasRef={fabricFrontCanvasRef}
            setObjects={setObjects}
            setActiveObject={setActiveObject}
            setSelectedObj={setSelectedObj}
            setShowProperty={setShowProperty}
            isFront={isFront}
          />
          <BackCanvas
            backCanvasRef={backCanvasRef}
            fabricBackCanvasRef={fabricBackCanvasRef}
            setObjects={setObjects}
            setActiveObject={setActiveObject}
            setSelectedObj={setSelectedObj}
            setShowProperty={setShowProperty}
            isFront={isFront}
          />

          {!isEdit && (
            <CanvasViewer
              frontCanvas={frontCanvasRef.current}
              backCanvas={backCanvasRef.current}
            />
          )}

          <div className="absolute flex top-8 right-8">
            <div
              onClick={() => {
                setIsEdit(true);
              }}
              className={`border ${
                isEdit && "bg-[#DADADA]/80"
              } border-black hover:bg-[#DADADA]/80 hover:cursor-pointer px-4 py-2 rounded-tl-md rounded-bl-md`}
            >
              Edit
            </div>
            <div
              onClick={() => setIsEdit(false)}
              className={`border ${
                !isEdit && "bg-[#DADADA]/80"
              } border-l-0 border-black hover:bg-[#DADADA]/80 hover:cursor-pointer px-4 py-2 rounded-tr-md rounded-br-md`}
            >
              Preview
            </div>
          </div>
        </div>

        <Property
          selectedObj={selectedObj}
          showProperty={showProperty}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleInputBlur={handleInputBlur}
        />
      </div>
    </section>
  );
};
