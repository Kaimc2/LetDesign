import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import * as fb from "../utils/fabricUtils";

export const Editor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [clipboard, setClipboard] = useState<fabric.Object | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && fabricCanvasRef.current) {
        const canvasElement = canvasRef.current;
        const container = canvasElement.parentElement;

        if (container) {
          canvasElement.width = container.clientWidth;
          canvasElement.height = container.clientHeight;

          fabricCanvasRef.current.setWidth(container.clientWidth);
          fabricCanvasRef.current.setHeight(container.clientHeight);

          fabricCanvasRef.current.renderAll();
        }
      }
    };

    const removeObject = () => {
      const canvas = fabricCanvasRef.current;
      const activeObject = canvas?.getActiveObject();

      if (canvas && activeObject) {
        canvas.remove(activeObject);
      }
    };

    const copyObject = () => {
      console.log("copy");
      const canvas = fabricCanvasRef.current;

      if (canvas) {
        const selectedObj = canvas.getActiveObject();
        if (selectedObj) {
          selectedObj.clone((cloned: fabric.Object) => {
            setClipboard(cloned);
          });
        }
      }
    };

    const pasteObject = () => {
      console.log("paste");
      const canvas = fabricCanvasRef.current;
      if (canvas && clipboard) {
        clipboard.clone((clonedObj: fabric.Object) => {
          canvas.discardActiveObject();

          clonedObj.set({
            left: clonedObj.left! + 10,
            top: clonedObj.top! + 10,
            evented: true,
          });

          if (clonedObj.type === "activeSelection") {
            clonedObj.canvas = canvas;
            clonedObj.forEachObject((obj) => {
              canvas.add(obj);
            });
            clonedObj.setCoords();
          } else {
            canvas.add(clonedObj);
          }

          setClipboard(clonedObj);
          canvas.setActiveObject(clonedObj);
          canvas.requestRenderAll();
        });
      }
    };

    const handleKeydown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key == "Backspace") {
        const canvas = fabricCanvasRef.current;
        const activeObject = canvas?.getActiveObject();

        if (canvas && activeObject?.type == "i-text") {
          const textObj = activeObject as fabric.IText;
          if (textObj.isEditing) {
            return;
          }
        }

        removeObject();
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "z") {
        console.log("undo");
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "y") {
        console.log("redo");
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "c") {
        copyObject();
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "v") {
        pasteObject();
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

        canvas.setWidth(container.clientWidth);
        canvas.setHeight(container.clientHeight);

        fb.addText(canvas, "My T-shirt Design", {
          fontSize: 30,
          top: 500,
          left: 400,
          fill: "red",
        });

        fb.addRectangle(canvas, {
          fill: "red",
          width: 100,
          height: 50,
        });

        canvas.on("mouse:dblclick", (event) => {
          const target = event.target;
          if (target && target.type == "text") {
            const textObj = target as fabric.IText;
            textObj.enterEditing();
            textObj.selectAll();
          }
        });

        const displaySelectedObj = () => {
          const selectedObj = canvas.getActiveObject();

          if (selectedObj) {
            console.log("Selected Object:", selectedObj);
            console.log("Type:", selectedObj.type);
            console.log("Coords:", selectedObj.getCoords());
            console.log("Width:", selectedObj.getScaledWidth());
            console.log("Height:", selectedObj.getScaledHeight());
            console.log("Fill:", selectedObj.get("fill"));
          }
        };

        canvas.on("selection:created", displaySelectedObj);
        canvas.on("selection:updated", displaySelectedObj);
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

  const addRect = () => {
    if (fabricCanvasRef.current) {
      fb.addRectangle(fabricCanvasRef.current, {
        fill: "red",
        width: 100,
        height: 50,
      });
    }
  };

  const addCircle = () => {
    if (fabricCanvasRef.current) {
      fb.addCircle(fabricCanvasRef.current, {
        fill: "blue",
        radius: 50,
      });
    }
  };

  const addText = () => {
    if (fabricCanvasRef.current) {
      fb.addText(fabricCanvasRef.current, "Text", {});
    }
  };

  return (
    <section className="flex flex-col">
      <div className="flex justify-between h-16 px-8 items-center bg-secondary">
        <div className="flex items-center gap-2">
          <img src="" alt="Logo" />
          <div className="flex gap-2">
            <button onClick={addRect}>Add Rectangle</button>
            <button onClick={addCircle}>Add Circle</button>
            <button>Pen</button>
            <button onClick={addText}>Text</button>
            <button>Move</button>
          </div>
        </div>

        <p>Design Name</p>

        <div className="flex items-center gap-2">
          <p>Name</p>
          <img src="" alt="Profile Picture" />
        </div>
      </div>

      <div className="flex">
        <div className="w-[17%] border-2 border-r-gray-300">Sidebar</div>
        <div className="flex-grow relative h-[calc(100vh-4rem)]">
          <canvas
            ref={canvasRef}
            className="absolute border border-black top-0 left-0 w-full h-full"
            id="myCanvas"
          ></canvas>
        </div>
      </div>
    </section>
  );
};
