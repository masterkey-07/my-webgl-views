import type { Vector3, Vector4 } from "./vector";

export type RGB = Vector3;
export type RGBA = Vector4;

export const randomColor = (): RGB => [Math.random(), Math.random(), Math.random()];

export const fillColor = (length: number, color: Vector3) => {
  return new Float32Array(
    Array(length)
      .fill(0)
      .map((_, i) => color[i % 3])
  );
};
