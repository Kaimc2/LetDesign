import { FC, MutableRefObject, useEffect } from "react";
import * as fb from "../../../utils/fabricUtils";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../types/common.types";

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
      }
    }

    return () => {
      // Dispose the existing canvas instance
      fabricFrontCanvasRef.current?.dispose();
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
