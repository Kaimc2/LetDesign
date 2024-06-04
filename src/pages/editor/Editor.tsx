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
import useFabricCanvasInit from "../../hooks/useFabricCanvasInit";
import shirtFrontView from "../../assets/images/canvas/shirtTemplateFront.png";
import shirtBackView from "../../assets/images/canvas/shirtTemplateBack.png";
import { Property } from "./Property";

// TODO: manage layers by drag and drop object (High Priority)
// TODO: add support for image upload (High Priority)
// TODO: create canvas for back view and handle the switch between (High Priority)
// TODO: convert the file into 3D texture for use on 3D mesh (Mid Priority)
// TODO: Style the editor page
// TODO: Display property for multiple objects selection (Low Priority)
// TODO: Update the radius when resizing the circle object (Low Priority)
// TODO: Fixed the x postion property when move just y also change the x value slightly (Low Priority)
// TODO: Fixed the object rotation (Low Priority)

export const Editor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isFront, setIsFront] = useState<boolean>(true);
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [clipboard, setClipboard] = useState<fabric.Object | null>(null);
  const [showProperty, setShowProperty] = useState(true);
  const [selectedObj, setSelectedObj] = useState<SelectedObjectProperty | null>(
    null
  );
  const [objects, setObjects] = useState<fabric.Object[]>([]);

  useFabricCanvasInit(canvasRef, fabricCanvasRef, setObjects);

  // Handle canvas event logic
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) throw new Error("Canvas not initialize");

    const horizontalLine = fb.initializeHorizontalLine(canvas);
    const verticalLine = fb.initializeVerticalLine(canvas);

    const handleKeydown = (keyboardEvent: KeyboardEvent) => {
      // Check if the active element is an input, textarea, or other focusable element
      const activeElement = document.activeElement;
      const isInputActive =
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA");

      if (!isInputActive) {
        if (keyboardEvent.key == "Backspace") {
          fb.removeObject(fabricCanvasRef.current);
        }
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "z") {
        console.log("undo");
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "y") {
        console.log("redo");
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "c") {
        fb.copyObject(canvas, setClipboard);
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "v") {
        fb.pasteObject(canvas, clipboard, setClipboard);
      }
    };

    canvas.on("selection:created", () =>
      fb.displaySelectedObj(canvas, setShowProperty, setSelectedObj)
    );
    canvas.on("selection:updated", () =>
      fb.updateSelectedObj(canvas, setSelectedObj)
    );
    canvas.on("selection:cleared", () => {
      // setShowProperty(false);
      setSelectedObj(null);
    });
    canvas.on("object:moving", (e) =>
      fb.handleObjectSnap(
        e,
        canvas,
        setSelectedObj,
        horizontalLine,
        verticalLine
      )
    );
    canvas.on("object:rotating", () =>
      fb.updateSelectedObj(canvas, setSelectedObj)
    );
    canvas.on("object:scaling", () =>
      fb.updateSelectedObj(canvas, setSelectedObj)
    );

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [clipboard]);

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
    if (fabricCanvasRef.current && selectedObj) {
      const activeObject = fabricCanvasRef.current.getActiveObject();

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

      fabricCanvasRef.current.renderAll();
    }
  };

  const setActiveObject = (obj: fabric.Object) => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setActiveObject(obj);
      fabricCanvasRef.current.requestRenderAll();
    }
  };

  useTextPropertyChange(fabricCanvasRef.current, selectedObj);

  const addRect = () => {
    if (fabricCanvasRef.current) fb.addRectangle(fabricCanvasRef.current);
  };

  const addCircle = () => {
    if (fabricCanvasRef.current) fb.addCircle(fabricCanvasRef.current);
  };

  const addText = () => {
    if (fabricCanvasRef.current) fb.addText(fabricCanvasRef.current);
  };

  const enterPenMode = () => {
    if (fabricCanvasRef.current) fb.toggleDrawMode(fabricCanvasRef.current);
  };

  return (
    <section className="w-screen overflow-x-hidden flex flex-col">
      <div className="flex justify-between h-16 px-8 items-center bg-secondary">
        <div className="flex items-center gap-2">
          <img src="" alt="Logo" />
          <div className="flex gap-2">
            <button onClick={addRect}>Add Rectangle</button>
            <button onClick={addCircle}>Add Circle</button>
            <button onClick={addText}>Text</button>
            <button onClick={enterPenMode}>Pen</button>
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
                onClick={() => setActiveObject(obj)}
                className="py-4 px-9 border border-b-brand-gray hover:bg-[#DADADA]/80 hover:cursor-pointer"
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
                onClick={() => setIsFront(true)}
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
                onClick={() => setIsFront(false)}
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
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            id="myCanvas"
          ></canvas>

          <div className="absolute flex top-8 right-8">
            <div
              onClick={() => setIsEdit(true)}
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
