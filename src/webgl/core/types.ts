export type Vector4 = [number, number, number, number];

export type Matrix4 = [...Vector4, ...Vector4, ...Vector4, ...Vector4];

export type Vector3 = [number, number, number];

export const isVector3 = (vector: ArrayLike<number>): vector is Vector3 =>
  vector.length === 3;

export type Vector2 = [number, number];
