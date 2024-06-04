import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import * as fb from "../utils/fabricUtils";
import { IEvent, IText } from "fabric/fabric-impl";

const useFabricCanvasInit = (
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  fabricCanvasRef: MutableRefObject<fabric.Canvas | null>,
  setObjects: Dispatch<SetStateAction<fabric.Object[]>>
) => {
  const rectCounter = useRef(0);
  const circleCounter = useRef(0);

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

    if (canvasRef.current) {
      const canvasElement = canvasRef.current;
      const container = canvasElement.parentElement;

      if (container) {
        canvasElement.width = container.clientWidth;
        canvasElement.height = container.clientHeight;

        fabricCanvasRef.current = fb.initializeCanvas(canvasElement.id);
        const canvas = fabricCanvasRef.current;
        fb.initializeFrontShirtCanvas(canvas);

        canvas.setWidth(container.clientWidth);
        canvas.setHeight(container.clientHeight);

        fb.addText(canvas, "My T-shirt Design", {
          name: "My T-shirt Design",
          fontSize: 30,
          top: 500,
          left: 400,
          fill: "black",
        });

        fb.addRectangle(canvas, {
          name: `Rect ${rectCounter.current}`,
          fill: "red",
          width: 100,
          height: 50,
          rx: 5,
          ry: 5,
        });

        const handleObjectAdded = (e: IEvent<MouseEvent>) => {
          const obj = e.target;
          if (obj) {
            if (obj.type === "rect") {
              rectCounter.current += 1;
              obj.set("name", `Rect ${rectCounter.current}`);
            } else if (obj.type === "circle") {
              circleCounter.current += 1;
              obj.set("name", `Circle ${circleCounter.current}`);
            } else if (obj.type === "i-text") {
              obj.set("name", (obj as IText).text);
            }
            updateCanvasObjects();
          }
        };

        const updateCanvasObjects = () => {
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
        };

        const handleObjectModified = (e: fabric.IEvent<MouseEvent>) => {
          const obj = e.target;
          if (obj && obj.type === "i-text") {
            obj.set("name", (obj as fabric.IText).text);
          }
          updateCanvasObjects();
        };

        canvas.on("object:added", handleObjectAdded);
        canvas.on("object:removed", updateCanvasObjects);
        canvas.on("object:modified", handleObjectModified);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      // Dispose the existing canvas instance
      fabricCanvasRef.current?.dispose();

      // Unmount event listener to avoid duplicate
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, fabricCanvasRef, setObjects]);
};

export default useFabricCanvasInit;
