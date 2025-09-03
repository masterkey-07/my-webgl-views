export const createBuffer = (
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  name: string,
  size: number,
  type: GLenum = gl.FLOAT,
  normalized: GLboolean = false,
  stride: GLsizei = 0,
  offset: GLintptr = 0
): WebGLBuffer => {
  const buffer = gl.createBuffer();

  const location = gl.getAttribLocation(program, name);

  gl.enableVertexAttribArray(location);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  gl.vertexAttribPointer(location, size, type || gl.FLOAT, normalized || false, stride || 0, offset || 0);

  return buffer as WebGLBuffer;
};

export const bindBufferFloatArray = (gl: WebGLRenderingContext, buffer: WebGLBuffer, array: Float32Array, usage: GLenum = gl.STATIC_DRAW) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, usage);
};
