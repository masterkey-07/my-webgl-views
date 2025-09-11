import type { RGB } from "./color";

export const compileShader = (webgl: WebGLRenderingContext, shaderType: GLenum, shaderSource: string) => {
  const shader = webgl.createShader(shaderType);

  if (!shader) throw new Error(`Shader ${shaderType} was not found`);

  webgl.shaderSource(shader, shaderSource);

  webgl.compileShader(shader);

  const success = webgl.getShaderParameter(shader, webgl.COMPILE_STATUS);

  if (!success) {
    const shaderInfo = webgl.getShaderInfoLog(shader);

    webgl.deleteShader(shader);

    throw new Error("Could not compile shader:" + shaderInfo);
  }

  return shader;
};

export const getWebGL = () => {
  const canvas = document.getElementsByTagName("canvas")?.[0];

  if (!canvas) throw new Error("Canvas not found");

  const gl = canvas.getContext("webgl");

  if (!gl) throw new Error("WebGL not Supported");

  return gl;
};

export const createProgram = (webgl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
  const program = webgl.createProgram();

  if (!program) throw new Error("Program not found");

  webgl.attachShader(program, vertexShader);

  webgl.attachShader(program, fragmentShader);

  webgl.linkProgram(program);

  const success = webgl.getProgramParameter(program, webgl.LINK_STATUS);

  if (!success) {
    const programInfo = webgl.getProgramInfoLog(program);

    webgl.deleteProgram(program);

    throw new Error("Program failed to link: " + programInfo);
  }

  return program;
};

export const setBackgroundColor = (gl: WebGLRenderingContext, color: RGB) => {
  gl.clearColor(...color, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
};
