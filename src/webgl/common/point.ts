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

export const drawLineWithPoints = (
  gl: GL,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer | undefined,
  points: [Vector2, Vector2],
  colors: Vector3 | undefined
) => {
  let x = points[0][0];
  let y = points[0][1];

  const x2 = points[1][0];
  const y2 = points[1][1];

  const dx = Math.abs(x2 - x);
  const dy = Math.abs(y2 - y);

  const sx = x < x2 ? 1 : -1;
  const sy = y < y2 ? 1 : -1;

  let err = dx - dy;

  const vertices = [x, y];

  while (true) {
    if (x === points[1][0] && y === points[1][1]) break;

    const e2 = 2 * err;

    if (e2 > -dy) {
      err -= dy;
      x += sx;
    } else {
      err += dx;
      y += sy;
    }

    vertices.push(x, y);
  }

  const pointColor = colors ? fillColor(3, colors) : undefined;

  drawFloatArrayBuffers(
    gl,
    positionBuffer,
    colorBuffer,
    { colors: pointColor, vertices: new Float32Array(vertices) },
    { count: vertices.length / 2, mode: gl.POINTS }
  );
};
