import { Vector4 } from "./types";

export type GL = WebGLRenderingContext;

export type Buffer = WebGLBuffer;

export type UniformLocation = WebGLUniformLocation;

export const conf = { size: 0 };

type Conf = typeof conf;

export const setWebGLConf = (c: Conf) => {
  const keys = Object.keys(c) as (keyof Conf)[];

  for (const key of keys) conf[key] = c[key];
};

export const getWebGLFromCanvasId = (canvasId: string) => {
  const canvas = document.getElementById(canvasId) as
    | HTMLCanvasElement
    | undefined;

  if (!canvas) throw new Error("Canvas not found");

  const webgl = canvas.getContext("webgl");

  if (!webgl) throw new Error("WebGL not supported in this browser.");

  return webgl;
};

export const setWebGLBackgroundColor = (gl: GL, color: Vector4) => {
  gl.clearColor(...color);
  gl.clear(gl.COLOR_BUFFER_BIT);
};

export const toPos = (value: number) =>
  conf.size ? value / (conf.size / 2) - 1 : value;

export const fromPos = (value: number) =>
  conf.size ? (value + 1) * (conf.size / 2) : value;

export const toColor = (value: number) => value / 255;
