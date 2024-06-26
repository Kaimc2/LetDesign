import { FC, MutableRefObject, useEffect } from "react";
import * as fb from "../../../utils/fabricUtils";

interface Props {
  backCanvasRef: MutableRefObject<HTMLCanvasElement | null>;
  fabricBackCanvasRef: MutableRefObject<fabric.Canvas | null>;
}

export const ReadOnlyBackCanvas: FC<Props> = ({
  backCanvasRef,
  fabricBackCanvasRef,
}) => {
  // Initialize the canvas
  useEffect(() => {
    const handleResize = () => {
      if (!backCanvasRef.current || !fabricBackCanvasRef.current) return;

      const canvasElement = backCanvasRef.current;
      const container = canvasElement.parentElement;

      if (container) {
        canvasElement.width = container.clientWidth;
        canvasElement.height = container.clientHeight;

        fabricBackCanvasRef.current.setWidth(container.clientWidth);
        fabricBackCanvasRef.current.setHeight(container.clientHeight);

        fabricBackCanvasRef.current.renderAll();
      }
    };

    if (backCanvasRef.current) {
      const canvasElement = backCanvasRef.current;
      const container = canvasElement.parentElement;

      if (container) {
        canvasElement.width = container.clientWidth;
        canvasElement.height = container.clientHeight;

        fabricBackCanvasRef.current = fb.initializeCanvas(canvasElement.id);
        const canvas = fabricBackCanvasRef.current;

        fb.initializeFrontShirtCanvas(canvas);

        canvas.setWidth(container.clientWidth);
        canvas.setHeight(container.clientHeight);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      // Dispose the existing canvas instance
      fabricBackCanvasRef.current?.dispose();

      // Unmount event listener to avoid duplicate
      window.removeEventListener("resize", handleResize);
    };
  }, [backCanvasRef, fabricBackCanvasRef]);

  return (
    <canvas
      ref={backCanvasRef}
      className={`absolute top-0 left-0`}
      id="backCanvas"
    ></canvas>
  );
};

