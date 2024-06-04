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
import { Property } from "./Property";

// TODO: add display property support for text should have fontFamily, fontSize, and more (High Priority)
// TODO: add display property support for circle should have radius (High Priority)
// TODO: add support for image upload (High Priority)
// TODO: display layers object in the sidebar (High Priority)
// TODO: manage layers by drag and drop object (High Priority)
// TODO: create canvas for back view and handle the switch between (High Priority)
// TODO: convert the file into 3D texture for use on 3D mesh (Mid Priority)
// TODO: Style the editor page
// TODO: Fixed the x postion property when move just y also change the x value slightly (Low Priority)
// TODO: Fixed the object rotation (Low Priority)

export const Editor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  // const [isFront, setIsFront] = useState<boolean>(false);
  const [clipboard, setClipboard] = useState<fabric.Object | null>(null);
  const [showProperty, setShowProperty] = useState(false);
  const [selectedObj, setSelectedObj] = useState<SelectedObjectProperty>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    angle: 0,
    fill: "",
  });

  useFabricCanvasInit(canvasRef, fabricCanvasRef);

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
    canvas.on("selection:cleared", () => {
      setShowProperty(false);
      setSelectedObj({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        angle: 0,
        fill: "",
      });
    });

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
        <div className="w-[314px] border border-r-gray-300 shadow-md ">
          Sidebar
        </div>

        <div className="flex-grow relative h-[calc(100vh-4rem)]">
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            id="myCanvas"
          ></canvas>
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
