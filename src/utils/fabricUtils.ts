import { fabric } from "fabric";

// Initialize a Fabric canvas
export const initializeCanvas = (canvasId: string): fabric.Canvas => {
  return new fabric.Canvas(canvasId);
};

// Add a rectangle to the canvas
export const addRectangle = (
  canvas: fabric.Canvas,
  options: fabric.IRectOptions
): fabric.Rect => {
  const rect = new fabric.Rect(options);
  canvas.add(rect);
  return rect;
};

// Add a circle to the canvas
export const addCircle = (
  canvas: fabric.Canvas,
  options: fabric.ICircleOptions
): fabric.Circle => {
  const circle = new fabric.Circle(options);
  canvas.add(circle);
  return circle;
};

// Add a custom text to the canvas
export const addText = (
  canvas: fabric.Canvas,
  text: string,
  options: fabric.ITextOptions
): fabric.Text => {
  const fabricText = new fabric.Text(text, options);
  canvas.add(fabricText);
  return fabricText;
};

// Clear the canvas
export const clearCanvas = (canvas: fabric.Canvas): void => {
  canvas.clear();
};
