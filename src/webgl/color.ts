export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];

export const randomColor = (): RGB => [Math.random(), Math.random(), Math.random()];

export const fillColor = (length: number, color: [number, number, number]) => {
  return new Float32Array(
    Array(length)
      .fill(0)
      .map((_, i) => color[i % 3])
  );
};
