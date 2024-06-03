import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import * as fb from "../utils/fabricUtils";

export interface SelectedObj {
  id?: null;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  radius?: number;
  angle?: number;
}

export const Editor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [clipboard, setClipboard] = useState<fabric.Object | null>(null);
  const [showProperty, setShowProperty] = useState(false);
  const [selectedObj, setSelectedObj] = useState<SelectedObj>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    radius: 0,
    angle: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !fabricCanvasRef.current) return;

      const canvasElement = canvasRef.current;
      const container = canvasElement.parentElement;

      if (container) {
        canvasElement.width = container.clientWidth;
        canvasElement.height = container.clientHeight;

        fabricCanvasRef.current.setWidth(container.clientWidth);
        fabricCanvasRef.current.setHeight(container.clientHeight);

        fabricCanvasRef.current.renderAll();
      }
    };

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

        if (keyboardEvent.ctrlKey && keyboardEvent.key == "z") {
          console.log("undo");
        }

        if (keyboardEvent.ctrlKey && keyboardEvent.key == "y") {
          console.log("redo");
        }
      }
    };

    if (canvasRef.current) {
      const canvasElement = canvasRef.current;
      const container = canvasElement.parentElement;

      if (container) {
        canvasElement.width = container.clientWidth;
        canvasElement.height = container.clientHeight;

        fabricCanvasRef.current = fb.initializeCanvas(canvasElement.id);
        const canvas = fabricCanvasRef.current;
        fb.initializeShirtCanvas(canvas);

        const horizontalLine = fb.initializeHorizontalLine(canvas);
        const verticalLine = fb.initializeVerticalLine(canvas);

        canvas.setWidth(container.clientWidth);
        canvas.setHeight(container.clientHeight);

        fb.addText(canvas, "My T-shirt Design", {
          fontSize: 30,
          top: 500,
          left: 400,
          fill: "black",
        });

        fb.addRectangle(canvas, {
          fill: "red",
          width: 100,
          height: 50,
          rx: 5,
          ry: 5,
        });

        canvas.on("selection:created", () =>
          fb.displaySelectedObj(canvas, setShowProperty, setSelectedObj)
        );
        canvas.on("selection:updated", () =>
          fb.updateSelectedObj(canvas, setSelectedObj)
        );
        canvas.on("object:moving", (e) =>
          fb.handleObjectMove(
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
            radius: 0,
            angle: 0,
          });
        });
      }
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      // Dispose the existing canvas instance
      fabricCanvasRef.current?.dispose();

      // Unmount event listener to avoid duplicate
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  // Handle copy and paste logic
  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const handleKeydown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.ctrlKey && keyboardEvent.key == "c") {
        fb.copyObject(canvas, setClipboard);
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "v") {
        fb.pasteObject(canvas, clipboard, setClipboard);
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [clipboard]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSelectedObj((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleInputBlur = () => {
    if (fabricCanvasRef.current && selectedObj) {
      const activeObject = fabricCanvasRef.current.getActiveObject();
      if (activeObject) {
        activeObject.set({
          left: selectedObj.x,
          top: selectedObj.y,
          width: selectedObj.width,
          height: selectedObj.height,
          angle: selectedObj.angle,
          scaleX: 1,
          scaleY: 1,
        });
        fabricCanvasRef.current.renderAll();
      }
    }
  };

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

        <div
          className={`w-[314px] border border-l-gray-300 shadow-md ${
            showProperty
              ? "translate-x-0 visible transition ease-in-out duration-300 motion-reduce:transition-none"
              : "translate-x-full invisible ease-in-out duration-300 motion-reduce:transition-none"
          }`}
        >
          <h1>Property</h1>
          <p>
            X:
            <input
              type="number"
              name="x"
              value={selectedObj?.x}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputBlur();
              }}
            />
          </p>
          <p>
            Y:
            <input
              type="number"
              name="y"
              value={selectedObj?.y}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputBlur();
              }}
            />
          </p>
          <p>
            Width:
            <input
              type="number"
              name="width"
              value={selectedObj?.width}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputBlur();
              }}
            />
          </p>
          <p>
            Height:
            <input
              type="number"
              name="height"
              value={selectedObj?.height}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputBlur();
              }}
            />
          </p>
          <p>
            Rotation:
            <input
              type="number"
              name="angle"
              value={selectedObj?.angle}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInputBlur();
              }}
            />
          </p>
        </div>
      </div>
    </section>
  );
};
