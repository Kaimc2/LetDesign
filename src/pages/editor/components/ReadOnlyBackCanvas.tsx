import { FC, MutableRefObject, useEffect } from "react";
import * as fb from "../../../utils/fabricUtils";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../types/common.types";

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
    if (backCanvasRef.current) {
      const canvasElement = backCanvasRef.current;
      const container = canvasElement.parentElement;

      if (container) {
        canvasElement.width = CANVAS_WIDTH;
        canvasElement.height = CANVAS_HEIGHT;

        fabricBackCanvasRef.current = fb.initializeCanvas(canvasElement.id);
        const canvas = fabricBackCanvasRef.current;

        fb.initializeFrontShirtCanvas(canvas);

        canvas.setWidth(CANVAS_WIDTH);
        canvas.setHeight(CANVAS_HEIGHT);
     }
    }

    return () => {
      // Dispose the existing canvas instance
      fabricBackCanvasRef.current?.dispose();
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
