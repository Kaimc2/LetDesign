import { MutableRefObject, useEffect } from "react";
import * as fb from "../utils/fabricUtils";

const useFabricCanvasInit = (
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  fabricCanvasRef: MutableRefObject<fabric.Canvas | null>
) => {
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
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      // Dispose the existing canvas instance
      fabricCanvasRef.current?.dispose();

      // Unmount event listener to avoid duplicate
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef, fabricCanvasRef]);
};

export default useFabricCanvasInit;
