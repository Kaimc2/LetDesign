import { FC, MutableRefObject, useEffect } from "react";
import * as fb from "../../../utils/fabricUtils";

interface Props {
  frontCanvasRef: MutableRefObject<HTMLCanvasElement | null>;
  fabricFrontCanvasRef: MutableRefObject<fabric.Canvas | null>;
}

export const ReadOnlyFrontCanvas: FC<Props> = ({
  frontCanvasRef,
  fabricFrontCanvasRef,
}) => {
  // Initialize the canvas
  useEffect(() => {
    const handleResize = () => {
      if (!frontCanvasRef.current || !fabricFrontCanvasRef.current) return;

      const canvasElement = frontCanvasRef.current;
      const container = canvasElement.parentElement;

      if (container) {
        canvasElement.width = container.clientWidth;
        canvasElement.height = container.clientHeight;

        fabricFrontCanvasRef.current.setWidth(container.clientWidth);
        fabricFrontCanvasRef.current.setHeight(container.clientHeight);

        fabricFrontCanvasRef.current.renderAll();
      }
    };

    if (frontCanvasRef.current) {
      const canvasElement = frontCanvasRef.current;
      const container = canvasElement.parentElement;

      if (container) {
        canvasElement.width = container.clientWidth;
        canvasElement.height = container.clientHeight;

        fabricFrontCanvasRef.current = fb.initializeCanvas(canvasElement.id);
        const canvas = fabricFrontCanvasRef.current;

        fb.initializeFrontShirtCanvas(canvas);

        canvas.setWidth(container.clientWidth);
        canvas.setHeight(container.clientHeight);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      // Dispose the existing canvas instance
      fabricFrontCanvasRef.current?.dispose();

      // Unmount event listener to avoid duplicate
      window.removeEventListener("resize", handleResize);
    };
  }, [fabricFrontCanvasRef, frontCanvasRef]);

  return (
    <canvas
      ref={frontCanvasRef}
      className={`absolute top-0 left-0`}
      id="frontCanvas"
    ></canvas>
  );
};
