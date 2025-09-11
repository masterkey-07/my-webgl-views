import { bindBufferFloatArray } from "./buffer";
import { fillColor, randomColor, type RGB } from "./color";
import type { Vector2 } from "./vector";

export const TRIANGLE_2D_VERTICE_POINTS = 6;
export const TRIANGLE_2D_COLOR_POINTS = 9;

export type TriangleVertices2D = [...Vector2, ...Vector2, ...Vector2];
export type TriangleColors2D = [...RGB, ...RGB, ...RGB];

export const generate2DTriangleColors = (colors?: TriangleColors2D) => {
  if (colors) return new Float32Array(colors);

  return fillColor(TRIANGLE_2D_COLOR_POINTS, randomColor());
};

export const get2DTriangleVertices = (triangle: TriangleVertices2D) => {
  return new Float32Array(triangle);
};

export const draw2DTriangule = (
  gl: WebGLRenderingContext,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer,
  vertices: Float32Array,
  color: Float32Array = generate2DTriangleColors()
) => {
  bindBufferFloatArray(gl, positionBuffer, vertices);
  bindBufferFloatArray(gl, colorBuffer, color);
  gl.drawArrays(gl.TRIANGLES, 0, TRIANGLE_2D_VERTICE_POINTS);
};
