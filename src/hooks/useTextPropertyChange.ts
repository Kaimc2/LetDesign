import { useEffect } from "react";
import { SelectedObjectProperty, TextProperty } from "../types/editor.types";

const useTextPropertyChange = (
  canvas: fabric.Canvas | null,
  selectedObj: SelectedObjectProperty
) => {
  // Handle the text property change
  useEffect(() => {
    if (selectedObj) {
      (() => {
        if (canvas && selectedObj) {
          const activeObject = canvas.getActiveObject();

          if (activeObject?.type === "i-text") {
            (activeObject as fabric.IText).set({
              fontFamily: (selectedObj as TextProperty).fontFamily,
              fontWeight: (selectedObj as TextProperty).fontWeight,
              underline: (selectedObj as TextProperty).textDecoration
                ?.underline,
              linethrough: (selectedObj as TextProperty).textDecoration
                ?.strikethrough,
              overline: (selectedObj as TextProperty).textDecoration?.overline,
              fontStyle: (selectedObj as TextProperty).fontStyle,
              stroke: (selectedObj as TextProperty).stroke,
              // strokeWidth: (selectedObj as TextProperty).strokeWidth,
              textAlign: (selectedObj as TextProperty).textAlign,
              // lineHeight: (selectedObj as TextProperty).lineHeight,
            });
          }
          canvas.requestRenderAll();
        }
      })();
    }
  }, [canvas, selectedObj]);
};

export default useTextPropertyChange;
