import { drawFloatArrayBuffers } from "./buffer";
import { fillColor, randomColor } from "./color";
import { isVector3, Vector2, Vector3 } from "./types";
import { GL } from "./webgl";

const TWO_PI = 2 * Math.PI;

export type Circle = {
  center?: Vector2;
  triangles: number;
  radius: number;
};

export const getCircleVertices = (
  triangles: number,
  radius: number,
  center = [0, 0]
) => {
  const vertexData = [];

  for (let degree = 0; degree < triangles; degree++) {
    vertexData.push(...center);

    const first = (degree * TWO_PI) / triangles;

    vertexData.push(
      center[0] + radius * Math.cos(first),
      center[1] + radius * Math.sin(first)
    );

    const second = ((degree + 1) * TWO_PI) / triangles;

    vertexData.push(
      center[0] + radius * Math.cos(second),
      center[1] + radius * Math.sin(second)
    );
  }

  return new Float32Array(vertexData);
};

export const drawSimpleCircle = (
  gl: GL,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer,
  circle: Circle,
  color: Vector3 | Float32Array = randomColor()
) => {
  const vertices = getCircleVertices(
    circle.triangles,
    circle.radius,
    circle.center
  );

  const colors = isVector3(color)
    ? fillColor(circle.triangles * 9, color)
    : color;

  drawFloatArrayBuffers(
    gl,
    positionBuffer,
    colorBuffer,
    { colors, vertices },
    { count: circle.triangles * 3 }
  );
};
