import { GL } from "../core/webgl";
import { drawFloatArrayBuffers } from "../core/buffer";
import { fillColor, randomColor } from "../core/color";
import { isVector3, Vector2, Vector3 } from "../core/types";

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

    const [x, y] = center;

    const first = (degree * TWO_PI) / triangles;

    vertexData.push(x + radius * Math.cos(first), y + radius * Math.sin(first));

    const second = ((degree + 1) * TWO_PI) / triangles;

    vertexData.push(
      x + radius * Math.cos(second),
      y + radius * Math.sin(second)
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
