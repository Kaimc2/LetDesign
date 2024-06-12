import { Gradient, Pattern } from "fabric/fabric-impl";

export interface ObjectProperty {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  angle?: number;
  fill?: string | Pattern | Gradient;
}

export interface TextProperty extends ObjectProperty {
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: number;
  textDecoration?: {
    underline: boolean;
    strikethrough: boolean;
    overline: true;
  };
  fontStyle?: "" | "normal" | "italic" | "oblique";
  stroke?: string;
  strokeWidth?: number;
  textAlign?: string;
  lineHeight?: number;
}

export interface RectangleProperty extends ObjectProperty {
  cornerRadius?: number;
}

export interface CircleProperty extends ObjectProperty {
  radius?: number;
}

export type SelectedObjectProperty =
  | RectangleProperty
  | CircleProperty
  | TextProperty;
