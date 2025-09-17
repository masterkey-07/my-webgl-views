import { bindBufferFloatArray } from "./buffer";
import { fillColor, randomColor } from "./color";
import type { Vector2, Vector3 } from "./vector";

const POINT_VERTICES = 1;

export const draw2DPoint = (
  gl: WebGLRenderingContext,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer | undefined,
  vertices: Float32Array,
  color: Float32Array = new Float32Array(randomColor())
) => {
  bindBufferFloatArray(gl, positionBuffer, vertices);

  if (colorBuffer) bindBufferFloatArray(gl, colorBuffer, color);

  gl.drawArrays(gl.POINTS, 0, POINT_VERTICES);
};

const buildPointsBetweenTwoPoints = (pointA: Vector2, pointB: Vector2) => {
  let [x, y] = pointA;
  const [x2, y2] = pointB;

  const dx = Math.abs(x2 - x);
  const dy = Math.abs(y2 - y);

  const sx = x < x2 ? 1 : -1;
  const sy = y < y2 ? 1 : -1;

  let err = dx - dy;

  const vertices: Vector2[] = [[x, y]];

  while (true) {
    if (x === x2 && y === y2) break;

    const e2 = 2 * err;

    if (e2 > -dy) {
      err -= dy;
      x += sx;
    } else {
      err += dx;
      y += sy;
    }

    vertices.push([x, y]);
  }

  return vertices.flat();
};

export const draw2DLineWithPoints = (
  gl: WebGLRenderingContext,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer | undefined,
  points: [Vector2, Vector2],
  color: Vector3 | undefined
) => {
  const vertices = buildPointsBetweenTwoPoints(...points);

  const pointColor = fillColor(3, color || randomColor());

  bindBufferFloatArray(gl, positionBuffer, new Float32Array(vertices));

  if (colorBuffer) bindBufferFloatArray(gl, colorBuffer, new Float32Array(pointColor));

  gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
};

export const drawTriangleWithPoints = (
  gl: WebGLRenderingContext,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer | undefined,
  points: [Vector2, Vector2, Vector2],
  color: Vector3 | undefined
) => {
  const first = buildPointsBetweenTwoPoints(points[0], points[1]);
  const second = buildPointsBetweenTwoPoints(points[1], points[2]);
  const third = buildPointsBetweenTwoPoints(points[2], points[0]);

  const pointColor = fillColor(3, color || randomColor());

  const vertices = [first, second, third].flat();

  bindBufferFloatArray(gl, positionBuffer, new Float32Array(vertices));

  if (colorBuffer) bindBufferFloatArray(gl, colorBuffer, new Float32Array(pointColor));

  gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
};
