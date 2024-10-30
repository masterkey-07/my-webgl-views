import { RGBA } from "./types";

export type GL = WebGLRenderingContext;

export const webGLSize = { size: 0 };

export const setCanvasSize = (s: number) => {
  webGLSize.size = s;
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

export const setWebGLBackgroundColor = (gl: GL, color: RGBA) => {
  gl.clearColor(...color);
  gl.clear(gl.COLOR_BUFFER_BIT);
};

const xtoy = (value: number) => ytoz(value) - 1;
const ytoz = (value: number) => value / (webGLSize.size / 2);

export const glPos = (value: number | ArrayLike<number>) =>
  Array.isArray(value) ? value.map((v) => xtoy(v)) : xtoy(value as number);

export const glSize = (value: number | ArrayLike<number>) =>
  Array.isArray(value) ? value.map((v) => ytoz(v)) : ytoz(value as number);
