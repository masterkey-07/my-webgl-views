import { GL } from "../core/webgl";
import { Vector2, Vector3, isVector3 } from "../core/types";
import { drawFloatArrayBuffers } from "../core/buffer";
import { fillColor } from "../core/color";

const RECTANGLE_NUMBER_OF_POINTS = 6;

export type Triangle = {
  pointA: Vector2;
  pointB: Vector2;
  pointC: Vector2;
};

export const getRectangleVertices = (rectangle: Triangle) => {
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
