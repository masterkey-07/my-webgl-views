import { randomColor, type RGB } from "./color";

export const TRIANGLE_2D_POINTS = 6;

export type TriangleVertices2D = [number, number, number, number, number, number];
export type TriangleColors2D = [...RGB, ...RGB, ...RGB];

export const generate2DTriangleColors = () => {
  const color = randomColor();

  return new Float32Array([...color, ...color, ...color]);
};

export const get2DTriangleVertices = (triangle: TriangleVertices2D) => {
  return new Float32Array(triangle);
};
