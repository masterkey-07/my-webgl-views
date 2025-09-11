import type { Vector3, Vector4 } from "./vector";

export type Matrix3 = [...Vector3, ...Vector3, ...Vector3];

export type Matrix4 = [...Vector4, ...Vector4, ...Vector4, ...Vector4];

export const identity = function (): Matrix4 {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
};

export const multiply = function (matrixA: Matrix4, matrixB: Matrix4): Matrix4 {
  const a00 = matrixA[0 * 4 + 0];
  const a01 = matrixA[0 * 4 + 1];
  const a02 = matrixA[0 * 4 + 2];
  const a03 = matrixA[0 * 4 + 3];
  const a10 = matrixA[1 * 4 + 0];
  const a11 = matrixA[1 * 4 + 1];
  const a12 = matrixA[1 * 4 + 2];
  const a13 = matrixA[1 * 4 + 3];
  const a20 = matrixA[2 * 4 + 0];
  const a21 = matrixA[2 * 4 + 1];
  const a22 = matrixA[2 * 4 + 2];
  const a23 = matrixA[2 * 4 + 3];
  const a30 = matrixA[3 * 4 + 0];
  const a31 = matrixA[3 * 4 + 1];
  const a32 = matrixA[3 * 4 + 2];
  const a33 = matrixA[3 * 4 + 3];
  const b00 = matrixB[0 * 4 + 0];
  const b01 = matrixB[0 * 4 + 1];
  const b02 = matrixB[0 * 4 + 2];
  const b03 = matrixB[0 * 4 + 3];
  const b10 = matrixB[1 * 4 + 0];
  const b11 = matrixB[1 * 4 + 1];
  const b12 = matrixB[1 * 4 + 2];
  const b13 = matrixB[1 * 4 + 3];
  const b20 = matrixB[2 * 4 + 0];
  const b21 = matrixB[2 * 4 + 1];
  const b22 = matrixB[2 * 4 + 2];
  const b23 = matrixB[2 * 4 + 3];
  const b30 = matrixB[3 * 4 + 0];
  const b31 = matrixB[3 * 4 + 1];
  const b32 = matrixB[3 * 4 + 2];
  const b33 = matrixB[3 * 4 + 3];

  return [
    b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
    b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
    b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
    b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
    b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
    b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
    b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
    b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
    b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
    b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
    b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
    b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
    b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
    b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
    b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
    b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
  ];
};

export const translation = function (x: number, y: number, z: number): Matrix4 {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
};

export const xRotation = function (angleInRadians: number): Matrix4 {
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
};

export const yRotation = function (angleInRadians: number): Matrix4 {
  const cos = Math.cos(angleInRadians);
  const sin = Math.sin(angleInRadians);

  return [cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1];
};

export const zRotation = function (angleInRadians: number): Matrix4 {
  const cos = Math.cos(angleInRadians);
  const sin = Math.sin(angleInRadians);

  return [cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
};

export const scaling = function (x: number, y: number, z: number): Matrix4 {
  return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
};

export const translate = function (matrix: Matrix4, x: number, y: number, z: number): Matrix4 {
  return multiply(matrix, translation(x, y, z));
};

export const xRotate = function (matrix: Matrix4, angleInRadians: number): Matrix4 {
  return multiply(matrix, xRotation(angleInRadians));
};

export const yRotate = function (matrix: Matrix4, angleInRadians: number): Matrix4 {
  return multiply(matrix, yRotation(angleInRadians));
};

export const zRotate = function (matrix: Matrix4, angleInRadians: number): Matrix4 {
  return multiply(matrix, zRotation(angleInRadians));
};

export const scale = function (matrix: Matrix4, x: number, y: number, z: number): Matrix4 {
  return multiply(matrix, scaling(x, y, z));
};

export default {
  identity,
  multiply,
  translation,
  xRotation,
  yRotation,
  zRotation,
  scaling,
  translate,
  xRotate,
  yRotate,
  zRotate,
  scale,
};
