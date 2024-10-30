import { Vector3 } from "./types";

export const randomColor = (): Vector3 => [
  Math.random(),
  Math.random(),
  Math.random(),
];

export const fillColor = (length: number, color: Vector3) => {
  return new Float32Array(
    Array(length)
      .fill(0)
      .map((_, i) => color[i % 3])
  );
};
