import { GL } from "./webgl";
import { Point, Vector3, isVector3 } from "./types";
import { drawFloatArrayBuffers } from "./buffer";
import { fillColor } from "./color";

const RECTANGLE_NUMBER_OF_POINTS = 6;

export type Triangle = {
  pointA: Point;
  pointB: Point;
  pointC: Point;
};

const getRectangleVertices = (rectangle: Triangle) => {
  const { pointA, pointB, pointC } = rectangle;

  return new Float32Array([...pointA, ...pointB, ...pointC]);
};

export const drawSimpleTriangle = (
  gl: GL,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer,
  rectangle: Triangle,
  colors: Float32Array | Vector3
) => {
  const vertices = getRectangleVertices(rectangle);

  const triangleColors = isVector3(colors) ? fillColor(9, colors) : colors;

  drawFloatArrayBuffers(
    gl,
    positionBuffer,
    colorBuffer,
    { colors: triangleColors, vertices },
    { count: RECTANGLE_NUMBER_OF_POINTS }
  );
};
