import { useEffect, useRef, useState } from "react";
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
import { Property } from "./Property";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSquare } from "@fortawesome/free-regular-svg-icons";
import { faT } from "@fortawesome/free-solid-svg-icons";
import { FrontCanvas } from "./FrontCanvas";
import { BackCanvas } from "./BackCanvas";
import CanvasViewer from "./CanvasViewer";

// TODO: Convert the file into 3D texture for use on 3D mesh (Mid Priority)
// TODO: Add support for image upload (High Priority)
// TODO: Fix the copy and paste for back canvas (Mid Priority)
// TODO: Display property for multiple objects selection (Low Priority)
// TODO: Update the radius when resizing the circle object (Low Priority)
// TODO: Fixed the x postion property when move just y also change the x value slightly (Low Priority)
// TODO: Fixed the object rotation (Low Priority)
// TODO: Style the editor page

export const Editor = () => {
  const frontCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricFrontCanvasRef = useRef<fabric.Canvas | null>(null);
  const fabricBackCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isFront, setIsFront] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [clipboard, setClipboard] = useState<fabric.Object | null>(null);
  const [showProperty, setShowProperty] = useState(true);
  const [selectedObj, setSelectedObj] = useState<SelectedObjectProperty | null>(
    null
  );
  const [objects, setObjects] = useState<fabric.Object[]>([]);
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null);

  // Apply styles to canvas wrappers
  useEffect(() => {
    const frontCanvas = fabricFrontCanvasRef.current;
    const backCanvas = fabricBackCanvasRef.current;

    applyCanvasWrapperStyle(frontCanvas, isFront);
    applyCanvasWrapperStyle(backCanvas, !isFront);
  }, [isFront]);

  const applyCanvasWrapperStyle = (
    canvas: fabric.Canvas | null,
    isVisible: boolean
  ) => {
    if (canvas) {
      const wrapper = canvas.getElement().parentNode as HTMLElement;
      if (wrapper && wrapper.className === "canvas-container") {
        wrapper.style.display = isVisible ? "block" : "none";
      }
    }
  };

  const handleSwitchView = (state: boolean) => {
    if (state) {
      const canvas = fabricFrontCanvasRef.current;

      if (canvas) {
        const canvasObjects: fabric.Object[] = [];
        canvas.getObjects().forEach((obj) => {
          if (
            obj.type === "rect" ||
            obj.type === "circle" ||
            obj.type === "i-text"
          ) {
            canvasObjects.push(obj);
          }
        });
        setObjects(canvasObjects);
      }
    } else {
      const canvas = fabricBackCanvasRef.current;

      if (canvas) {
        const canvasObjects: fabric.Object[] = [];
        canvas.getObjects().forEach((obj) => {
          if (
            obj.type === "rect" ||
            obj.type === "circle" ||
            obj.type === "i-text"
          ) {
            canvasObjects.push(obj);
          }
        });
        setObjects(canvasObjects);
      }
    }

    setIsFront(state);
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

  return (
    <section className="w-screen overflow-x-hidden flex flex-col">
      <div className="flex justify-between h-16 px-8 items-center bg-secondary">
        <div className="flex items-center gap-6">
          <Link to={"/"}>
            <img src="" alt="Logo" />
          </Link>
          <div className="flex gap-8">
            <button title="Add Rectangle" onClick={addRect}>
              <FontAwesomeIcon icon={faSquare} size="xl" />
            </button>
            <button title="Add Circle" onClick={addCircle}>
              <FontAwesomeIcon icon={faCircle} size="xl" />
            </button>
            <button title="Add Text" onClick={addText}>
              <FontAwesomeIcon icon={faT} size="xl" />
            </button>
          </div>
        </div>

        <p>Design Name</p>

        <div className="flex items-center gap-2">
          <p>Name</p>
          <img src="" alt="Profile Picture" />
        </div>
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

          <div className="flex px-8 gap-[10px] mt-[18px]">
            <button className="p-[10px] w-[128px] rounded-md text-white bg-secondary hover:bg-secondary-80">
              Save Design
            </button>
            <button className="p-[10px] w-[128px] rounded-md text-white bg-accent hover:bg-accent-80">
              Send Design
            </button>
          </div>
        </div>

        <div className="flex-grow relative h-[calc(100vh-4rem)]">
          <FrontCanvas
            frontCanvasRef={frontCanvasRef}
            fabricFrontCanvasRef={fabricFrontCanvasRef}
            clipboard={clipboard}
            setClipboard={setClipboard}
            setObjects={setObjects}
            setActiveObject={setActiveObject}
            setSelectedObj={setSelectedObj}
            setShowProperty={setShowProperty}
          />
          <BackCanvas
            backCanvasRef={backCanvasRef}
            fabricBackCanvasRef={fabricBackCanvasRef}
            clipboard={clipboard}
            setClipboard={setClipboard}
            setObjects={setObjects}
            setActiveObject={setActiveObject}
            setSelectedObj={setSelectedObj}
            setShowProperty={setShowProperty}
          />

          {/* Preview */}
          {isFront && frontCanvasRef.current && fabricFrontCanvasRef.current ? (
            <CanvasViewer canvas={frontCanvasRef.current} />
          ) : (
            <CanvasViewer canvas={backCanvasRef.current} />
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
