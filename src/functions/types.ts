export type Vector4 = [number, number, number, number];

export type Vector3 = [number, number, number];

export const isVector3 = (vector: ArrayLike<number>): vector is Vector3 =>
  vector.length === 3;

export type Vector2 = [number, number];

export type RGB = Vector3;
export type RGBA = Vector4;

export type Point = Vector2;
