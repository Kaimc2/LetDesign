import { useEffect, useRef } from "react";
import { fabric } from "fabric"; // v5

export const Editor = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const options = {};
    const canvas = new fabric.Canvas(canvasEl.current, options);

    // make the fabric.Canvas instance available to your app
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "red",
      width: 20,
      height: 20,
    });

    canvas.add(rect);
  }, []);

  return <canvas className="border border-black" width="300" height="300" ref={canvasEl} />;
};
