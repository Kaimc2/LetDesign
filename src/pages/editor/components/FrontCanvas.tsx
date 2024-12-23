import {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import * as fb from "../../../utils/fabricUtils";
import { SelectedObjectProperty } from "../../../types/editor.types";
import { IEvent, IText } from "fabric/fabric-impl";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../types/common.types";

interface Props {
  frontCanvasRef: MutableRefObject<HTMLCanvasElement | null>;
  fabricFrontCanvasRef: MutableRefObject<fabric.Canvas | null>;
  setObjects: Dispatch<SetStateAction<fabric.Object[]>>;
  setSelectedObj: Dispatch<SetStateAction<SelectedObjectProperty | null>>;
  setActiveObject: Dispatch<SetStateAction<fabric.Object | null>>;
  setShowProperty: Dispatch<SetStateAction<boolean>>;
  isFront: boolean;
}

export const FrontCanvas: FC<Props> = ({
  frontCanvasRef,
  fabricFrontCanvasRef,
  setObjects,
  setSelectedObj,
  setActiveObject,
  setShowProperty,
  isFront,
}) => {
  const [clipboard, setClipboard] = useState<fabric.Object | null>(null);
  const rectCounter = useRef(0);
  const circleCounter = useRef(0);

  // Initialize the canvas
  useEffect(() => {
    rectCounter.current = 0;
    circleCounter.current = 0;

    if (frontCanvasRef.current) {
      const canvasElement = frontCanvasRef.current;
      const container = canvasElement.parentElement;

      if (container) {
        canvasElement.width = CANVAS_WIDTH;
        canvasElement.height = CANVAS_HEIGHT;

        fabricFrontCanvasRef.current = fb.initializeCanvas(canvasElement.id);
        const canvas = fabricFrontCanvasRef.current;

        fb.initializeFrontShirtCanvas(canvas);

        canvas.setWidth(CANVAS_WIDTH);
        canvas.setHeight(CANVAS_HEIGHT);

        fb.addText(canvas, "My Front Design", {
          name: "My Front Design",
          fontSize: 30,
          top: 500,
          left: 400,
          fill: "#000000",
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

    return () => {
      // Dispose the existing canvas instance
      fabricFrontCanvasRef.current?.dispose();
    };
  }, [fabricFrontCanvasRef, frontCanvasRef, setObjects]);

  // Handle canvas event logic
  useEffect(() => {
    const canvas = fabricFrontCanvasRef.current;
    if (!canvas) return;

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
          fb.removeObject(canvas);
        }
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "z" && isFront) {
        console.log("undo");
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "y" && isFront) {
        console.log("redo");
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "c" && isFront) {
        fb.copyObject(canvas, setClipboard);
      }

      if (keyboardEvent.ctrlKey && keyboardEvent.key == "v" && isFront) {
        fb.pasteObject(canvas, clipboard, setClipboard);
      }
    };

    canvas.on("selection:created", () => {
      fb.displaySelectedObj(canvas, setShowProperty, setSelectedObj);
      setActiveObject(canvas.getActiveObject());
    });
    canvas.on("selection:updated", () => {
      fb.updateSelectedObj(canvas, setSelectedObj);
      setActiveObject(canvas.getActiveObject());
    });
    canvas.on("selection:cleared", () => {
      setSelectedObj(null);
      setActiveObject(null);
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
      canvas.off("selection:created");
      canvas.off("selection:updated");
      canvas.off("selection:cleared");
      canvas.off("object:cleared");
      canvas.off("object:moving");
      canvas.off("object:rotating");
      canvas.off("object:scaling");
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [
    clipboard,
    fabricFrontCanvasRef,
    isFront,
    setActiveObject,
    setClipboard,
    setSelectedObj,
    setShowProperty,
  ]);

  return (
    <canvas
      ref={frontCanvasRef}
      className={`absolute top-0 left-0`}
      id="frontCanvas"
    ></canvas>
  );
};
