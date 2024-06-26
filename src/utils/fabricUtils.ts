import { fabric } from "fabric";
import shirtTemplateFront from "../assets/images/canvas/shirtTemplateFront.png";
import shirtTemplateBack from "../assets/images/canvas/shirtTemplateBack.png";
import { SetStateAction } from "react";
import {
  CircleProperty,
  ObjectProperty,
  RectangleProperty,
  SelectedObjectProperty,
  TextProperty,
} from "../types/editor.types";

const snapZone = 15;

/**
 * Initialize a Fabric canvas
 * @param canvasId Reference id to canvas element
 * @returns Canvas object
 */
export const initializeCanvas = (canvasId: string): fabric.Canvas => {
  return new fabric.Canvas(canvasId);
};

/**
 * Initialize the canvas to a shirt shape for front side
 * @param canvas Reference to a canvas
 */
export const initializeFrontShirtCanvas = (canvas: fabric.Canvas) => {
  canvas.controlsAboveOverlay = true;

  fabric.Image.fromURL(shirtTemplateFront, (img) => {
    img.scaleToWidth(700);
    img.set({
      name: "canvasTemplate",
      selectable: false,
      evented: false,
    });

    canvas.add(img);
    canvas.centerObject(img);
    canvas.sendToBack(img);

    canvas.clipPath = img;
  });
};

/**
 * Initialize the canvas to a shirt shape for back side
 * @param canvas Reference to a canvas
 */
export const initializeBackShirtCanvas = (canvas: fabric.Canvas) => {
  canvas.controlsAboveOverlay = true;

  fabric.Image.fromURL(shirtTemplateBack, (img) => {
    img.scaleToWidth(700);
    img.set({
      name: "canvasTemplate",
      selectable: false,
      evented: false,
    });

    canvas.add(img);
    canvas.centerObject(img);
    canvas.sendToBack(img);

    canvas.clipPath = img;
  });
};

/**
 * Create a horizontal line in the middle of the canvas
 * @param canvas Reference to a canvas
 * @returns Line object
 */
export const initializeHorizontalLine = (canvas: fabric.Canvas) => {
  return new fabric.Line(
    [(canvas.width ?? 0) / 2, 0, (canvas.width ?? 0) / 2, canvas.width ?? 0],
    {
      stroke: "red",
      evented: false,
      selectable: false,
    }
  );
};

/**
 * Create a vertical line in the middle of the canvas
 * @param canvas Reference to a canvas
 * @returns Line object
 */
export const initializeVerticalLine = (canvas: fabric.Canvas) => {
  return new fabric.Line(
    [0, (canvas.height ?? 0) / 2, canvas.width ?? 0, (canvas.height ?? 0) / 2],
    {
      stroke: "red",
      evented: false,
      selectable: false,
    }
  );
};

/**
 * Add a rectangle to the canvas
 * @param canvas Reference to a canvas
 * @param options Rectangle options
 */
export const addRectangle = (
  canvas: fabric.Canvas,
  options?: fabric.IRectOptions
) => {
  let rect: fabric.Rect;

  if (options) {
    rect = new fabric.Rect({
      ...options,
    });
  } else {
    rect = new fabric.Rect({
      width: 100,
      height: 50,
      fill: "red",
    });
  }

  canvas.add(rect);
  canvas.centerObject(rect);
};

/**
 * Add a circle to the canvas
 * @param canvas Reference to a canvas
 * @param options Circle options
 */
export const addCircle = (
  canvas: fabric.Canvas,
  options?: fabric.ICircleOptions
) => {
  let circle: fabric.Circle;

  if (options) {
    circle = new fabric.Circle(options);
  } else {
    circle = new fabric.Circle({
      fill: "blue",
      radius: 30,
    });
  }

  canvas.add(circle);
  canvas.centerObject(circle);
};

/**
 * Add a custom text to the canvas
 * @param canvas Reference to a canvas
 * @param text String text
 * @param options Text options
 */
export const addText = (
  canvas: fabric.Canvas,
  text?: string,
  options?: fabric.ITextOptions
) => {
  let fabricText: fabric.IText;

  if (text || options) {
    fabricText = new fabric.IText(text ?? "Text", options);
  } else {
    fabricText = new fabric.IText("Text", {});
  }
  canvas.add(fabricText);
  canvas.centerObject(fabricText);
};

/**
 * Toggle into draw mode in the canvas
 * @param canvas Reference to a canvas
 */
export const toggleDrawMode = (canvas: fabric.Canvas) => {
  canvas.isDrawingMode = !canvas.isDrawingMode;
};

/**
 * Display the active object properties
 * @param canvas Reference to a canvas
 * @param setShowProperty A setter function for showProperty state
 * @param setSelectedObj A setter function for selectedObject
 */
export const displaySelectedObj = (
  canvas: fabric.Canvas,
  setShowProperty: (value: SetStateAction<boolean>) => void,
  setSelectedObj: (value: SetStateAction<SelectedObjectProperty | null>) => void
) => {
  const selectedObj = canvas.getActiveObject();
  if (selectedObj) {
    setShowProperty(true);
    const actualWidth = (selectedObj.width! * selectedObj.scaleX!).toFixed(2);
    const actualHeight = (selectedObj.height! * selectedObj.scaleY!).toFixed(2);
    const left = selectedObj.left!.toFixed(2);
    const top = selectedObj.top!.toFixed(2);
    const angle = selectedObj.angle!.toFixed(2);

    const commonProp: ObjectProperty = {
      width: parseFloat(actualWidth),
      height: parseFloat(actualHeight),
      x: parseFloat(left),
      y: parseFloat(top),
      angle: parseFloat(angle),
      fill: selectedObj.fill,
    };

    if (selectedObj.type === "rect") {
      setSelectedObj({
        ...commonProp,
        cornerRadius: (selectedObj as fabric.Rect).rx,
      } as RectangleProperty);
    } else if (selectedObj.type === "circle") {
      setSelectedObj({
        ...commonProp,
        radius: (selectedObj as fabric.Circle).radius,
      } as CircleProperty);
    } else if (selectedObj.type === "i-text") {
      setSelectedObj({
        ...commonProp,
        fontFamily: (selectedObj as fabric.IText).fontFamily,
        fontWeight: (selectedObj as fabric.IText).fontWeight,
        fontSize: (selectedObj as fabric.IText).fontSize,
        textDecoration: {
          underline: (selectedObj as fabric.IText).underline,
          strikethrough: (selectedObj as fabric.IText).linethrough,
          overline: (selectedObj as fabric.IText).overline,
        },
        fontStyle: (selectedObj as fabric.IText).fontStyle,
        stroke: (selectedObj as fabric.IText).stroke,
        strokeWidth: (selectedObj as fabric.IText).strokeWidth,
        textAlign: (selectedObj as fabric.IText).textAlign,
        lineHeight: (selectedObj as fabric.IText).lineHeight,
      } as TextProperty);
    } else if (
      selectedObj.type === "image" &&
      selectedObj.name !== "canvasTemplate"
    ) {
      setSelectedObj({ ...commonProp });
    }
  }
};

/**
 * Update the display of an active object properties
 * @param canvas Reference to a canvas
 * @param setSelectedObj A setter function for selectedObject
 */
export const updateSelectedObj = (
  canvas: fabric.Canvas,
  setSelectedObj: (value: SetStateAction<SelectedObjectProperty | null>) => void
) => {
  const selectedObj = canvas.getActiveObject();
  if (selectedObj) {
    const actualWidth = (selectedObj.width! * selectedObj.scaleX!).toFixed(2);
    const actualHeight = (selectedObj.height! * selectedObj.scaleY!).toFixed(2);
    const left = selectedObj.left!.toFixed(2);
    const top = selectedObj.top!.toFixed(2);
    const angle = selectedObj.angle!.toFixed(2);

    const commonProp: ObjectProperty = {
      width: parseFloat(actualWidth),
      height: parseFloat(actualHeight),
      x: parseFloat(left),
      y: parseFloat(top),
      angle: parseFloat(angle),
      fill: selectedObj.fill,
    };

    if (selectedObj.type === "rect") {
      setSelectedObj({
        ...commonProp,
        cornerRadius: (selectedObj as fabric.Rect).rx,
      } as RectangleProperty);
    } else if (selectedObj.type === "circle") {
      setSelectedObj({
        ...commonProp,
        radius: (selectedObj as fabric.Circle).radius,
      } as CircleProperty);
    } else if (selectedObj.type === "i-text") {
      setSelectedObj({
        ...commonProp,
        fontFamily: (selectedObj as fabric.IText).fontFamily,
        fontWeight: (selectedObj as fabric.IText).fontWeight,
        fontSize: (selectedObj as fabric.IText).fontSize,
        textDecoration: {
          underline: (selectedObj as fabric.IText).underline,
          strikethrough: (selectedObj as fabric.IText).linethrough,
          overline: (selectedObj as fabric.IText).overline,
        },
        fontStyle: (selectedObj as fabric.IText).fontStyle,
        stroke: (selectedObj as fabric.IText).stroke,
        strokeWidth: (selectedObj as fabric.IText).strokeWidth,
        textAlign: (selectedObj as fabric.IText).textAlign,
        lineHeight: (selectedObj as fabric.IText).lineHeight,
      } as TextProperty);
    } else if (
      selectedObj.type === "image" &&
      selectedObj.name !== "canvasTemplate"
    ) {
      setSelectedObj({ ...commonProp });
    }
  }
};

/**
 * Function to enable snapping to middle point for both horizontally and vertically
 * @param options Reference to the selected object
 * @param canvas Reference to a canvas
 * @param setSelectedObj A setter for selected object
 * @param horizontalLine A horizontal line object
 * @param verticalLine A vertical line object
 */
export const handleObjectSnap = (
  options: fabric.IEvent<MouseEvent>,
  canvas: fabric.Canvas,
  setSelectedObj: (
    value: SetStateAction<SelectedObjectProperty | null>
  ) => void,
  horizontalLine: fabric.Line,
  verticalLine: fabric.Line
) => {
  updateSelectedObj(canvas, setSelectedObj);

  const objectMiddleHorizontal =
    (options.target?.left ?? 0) +
    ((options.target?.width ?? 0) * (options.target?.scaleX ?? 1)) / 2;

  if (
    objectMiddleHorizontal > (canvas.width ?? 0) / 2 - snapZone &&
    objectMiddleHorizontal < (canvas.width ?? 0) / 2 + snapZone
  ) {
    options.target
      ?.set({
        left:
          (canvas.width ?? 0) / 2 -
          ((options.target.width ?? 0) * (options.target.scaleX ?? 0)) / 2,
      })
      .setCoords();

    canvas.add(horizontalLine);

    document.addEventListener("mouseup", () => {
      canvas.remove(horizontalLine);
    });
  } else {
    canvas.remove(horizontalLine);
  }

  const objectMiddleVertical =
    (options.target?.top ?? 0) +
    ((options.target?.height ?? 0) * (options.target?.scaleY ?? 1)) / 2;

  if (
    objectMiddleVertical > (canvas.height ?? 0) / 2 - snapZone &&
    objectMiddleVertical < (canvas.height ?? 0) / 2 + snapZone
  ) {
    options.target
      ?.set({
        top:
          (canvas.height ?? 0) / 2 -
          ((options.target.height ?? 0) * (options.target.scaleY ?? 0)) / 2,
      })
      .setCoords();

    canvas.add(verticalLine);

    document.addEventListener("mouseup", () => {
      canvas.remove(verticalLine);
    });
  } else {
    canvas.remove(verticalLine);
  }
};

/**
 * Remove the current selected object from the canvas
 * @param canvas reference to a canvas
 * @returns
 */
export const removeObject = (canvas: fabric.Canvas | null): void => {
  const activeObject = canvas?.getActiveObject();

  if (!canvas || !activeObject) return;

  // If text object is editing don't delete
  if (activeObject.type == "i-text") {
    const textObj = activeObject as fabric.IText;
    if (textObj.isEditing) {
      return;
    }
  }

  // Handle object group delete
  if (activeObject.type == "activeSelection") {
    const objGroup = activeObject as fabric.Group;
    objGroup.forEachObject((obj) => {
      canvas.remove(obj);
    });
    canvas.discardActiveObject();
  } else {
    // Handle single object delete
    canvas.remove(activeObject);
  }
};

/**
 * Function to enable the ability to copy object
 * @param canvas Reference to a canvas
 * @param setClipboard A setter function for clipboard object
 */
export const copyObject = (
  canvas: fabric.Canvas,
  setClipboard: (value: SetStateAction<fabric.Object | null>) => void
) => {
  if (canvas) {
    const selectedObj = canvas.getActiveObject();
    if (selectedObj) {
      selectedObj.clone((cloned: fabric.Object) => {
        setClipboard(cloned);
      });
    }
  }
};

/**
 * Function to enable the ability to paste object
 * @param canvas Reference to a canvas
 * @param clipboard A clipboard object to keep track of copy object
 * @param setClipboard A setter function for clipboard object
 */
export const pasteObject = (
  canvas: fabric.Canvas,
  clipboard: fabric.Object | null,
  setClipboard: (value: SetStateAction<fabric.Object | null>) => void
) => {
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
        (clonedObj as fabric.Group).forEachObject((obj) => {
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

/**
 * Save the canvas objects into a JSON format for storing
 * @param canvas Reference to a canvas
 * @returns An JSON object of canvas data
 */
export const saveCanvas = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;
  return canvas.toJSON();
};

/**
 * Load the canvas objects from a JSON format
 * @param canvas Reference to a canvas
 * @param canvasData Reference to canvas json data
 */
export const loadCanvas = (
  canvas: fabric.Canvas | null,
  canvasData: string
) => {
  if (!canvas) return;
  canvas.loadFromJSON(JSON.parse(canvasData), canvas.renderAll.bind(canvas));
};

/**
 * Clear out the entire canvas
 * @param canvas reference to a canvas
 */
export const clearCanvas = (canvas: fabric.Canvas): void => {
  canvas.clear();
};
