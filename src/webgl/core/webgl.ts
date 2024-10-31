import { Vector4 } from "./types";

export type GL = WebGLRenderingContext;

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

const relative = (value: number) => value / (conf.size / 2);
const relative2 = (value: number) => relative(value) - 1;

export const toPos = (value: number) => relative2(value as number);

export const toColor = (value: number) => value / 255;
