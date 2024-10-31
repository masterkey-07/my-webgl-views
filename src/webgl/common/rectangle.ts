import { GL } from "../core/webgl";
import { Vector2, Vector3, isVector3 } from "../core/types";
import { drawFloatArrayBuffers } from "../core/buffer";
import { fillColor } from "../core/color";

const RECTANGLE_NUMBER_OF_POINTS = 6;

export type Rectangle = {
  startPoint: Vector2;
  width: number;
  height: number;
};

export const getRectangleVertices = (rectangle: Rectangle) => {
  const { startPoint, height, width } = rectangle;

  const [x, y] = startPoint;

  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;

  return new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]);
};

export const drawSimpleRectangle = (
  gl: GL,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer,
  rectangle: Rectangle,
  colors: Float32Array | Vector3
) => {
  const vertices = getRectangleVertices(rectangle);

  const rectangleColors = isVector3(colors) ? fillColor(18, colors) : colors;

  drawFloatArrayBuffers(
    gl,
    positionBuffer,
    colorBuffer,
    { colors: rectangleColors, vertices },
    { count: RECTANGLE_NUMBER_OF_POINTS }
  );
};
