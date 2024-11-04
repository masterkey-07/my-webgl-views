import { GL } from "../core/webgl";
import { fillColor } from "../core/color";
import { Vector2, Vector3 } from "../core/types";
import { drawFloatArrayBuffers } from "../core/buffer";

export type Triangle = {
  pointA: Vector2;
  pointB: Vector2;
  pointC: Vector2;
};

export const drawSimplePoint = (
  gl: GL,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer | undefined,
  point: Vector2,
  colors: Vector3 | undefined
) => {
  const vertices = new Float32Array(point);

  const pointColor = colors ? fillColor(3, colors) : undefined;

  drawFloatArrayBuffers(
    gl,
    positionBuffer,
    colorBuffer,
    { colors: pointColor, vertices },
    { count: 1, mode: gl.POINTS }
  );
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

  return vertices;
};

const toFloats = (arr: Vector2[]) => {
  const output = [];

  for (let index = 0; index < arr.length; index++) {
    const point = arr[index];

    output.push(...point);
  }

  return output;
};

export const drawLineWithPoints = (
  gl: GL,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer | undefined,
  points: [Vector2, Vector2],
  colors: Vector3 | undefined
) => {
  const vertices = toFloats(buildPointsBetweenTwoPoints(...points));

  const pointColor = colors ? fillColor(3, colors) : undefined;

  drawFloatArrayBuffers(
    gl,
    positionBuffer,
    colorBuffer,
    { colors: pointColor, vertices: new Float32Array(vertices) },
    { count: vertices.length / 2, mode: gl.POINTS }
  );
};

export const drawTriangleWithPoints = (
  gl: GL,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer | undefined,
  points: [Vector2, Vector2, Vector2],
  colors: Vector3 | undefined
) => {
  const first = buildPointsBetweenTwoPoints(points[0], points[1]);
  const second = buildPointsBetweenTwoPoints(points[1], points[2]);
  const third = buildPointsBetweenTwoPoints(points[2], points[0]);

  const pointColor = colors ? fillColor(3, colors) : undefined;

  const vertices = [
    ...toFloats(first),
    ...toFloats(second),
    ...toFloats(third),
  ];

  drawFloatArrayBuffers(
    gl,
    positionBuffer,
    colorBuffer,
    { colors: pointColor, vertices: new Float32Array(vertices) },
    { count: vertices.length / 2, mode: gl.POINTS }
  );
};
