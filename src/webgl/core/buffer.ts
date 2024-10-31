import { GL, toColor, toPos } from "./webgl";

export type WebGLAttribute = {
  name: string;
  size: number;
  type?: GLenum;
  normalized?: GLboolean;
  stride?: GLsizei;
  offset?: GLintptr;
};

export const createProgramAttributeBuffer = (
  gl: GL,
  program: WebGLProgram,
  attribute: WebGLAttribute
): WebGLBuffer => {
  const buffer = gl.createBuffer();

  const location = gl.getAttribLocation(program, attribute.name);

  gl.enableVertexAttribArray(location);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  gl.vertexAttribPointer(
    location,
    attribute.size,
    attribute.type || gl.FLOAT,
    attribute.normalized || false,
    attribute.stride || 0,
    attribute.offset || 0
  );

  return buffer as WebGLBuffer;
};

export const bindBufferFloatArray = (
  gl: GL,
  buffer: WebGLBuffer,
  array: Float32Array,
  usage: GLenum = gl.STATIC_DRAW
) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, usage);
};

export const drawFloatArrayBuffers = (
  gl: GL,
  positionBuffer: WebGLBuffer,
  colorBuffer: WebGLBuffer,
  data: { vertices: Float32Array; colors: Float32Array },
  draw: { mode?: GLenum; first?: number; count: number }
) => {
  bindBufferFloatArray(gl, colorBuffer, data.colors.map(toColor));
  bindBufferFloatArray(gl, positionBuffer, data.vertices.map(toPos));

  gl.drawArrays(draw.mode || gl.TRIANGLES, draw.first || 0, draw.count);
};
