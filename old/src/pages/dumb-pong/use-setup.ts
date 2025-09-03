import React from "react";
import { Buffer, GL, UniformLocation } from "../../webgl/core/webgl";
import { createProgramAttributeBuffer } from "../../webgl/core/buffer";
import matrix from "../../utils/matrix";
import { compileShader } from "../../webgl/core/shader";
import { createProgram } from "../../webgl/core/program";

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;

  uniform mat4 matrix;

  void main() {
    gl_Position = matrix * vec4(position, 0, 1);
  }
  `;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;

  uniform vec3 color;

  void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
`;

export const useSetup = (
  gl: GL | undefined,
  setMatrix: (m: UniformLocation) => void,
  setPosition: (p: Buffer) => void
) => {
  React.useEffect(() => {
    if (!gl) return () => {};

    const vertexShader = compileShader(
      gl,
      gl.VERTEX_SHADER,
      VERTEX_SHADER_SOURCE
    );

    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      FRAGMENT_SHADER_SOURCE
    );

    const program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    const matrixUniformLocation = gl.getUniformLocation(program, `matrix`);

    if (matrixUniformLocation) setMatrix(matrixUniformLocation);

    gl.uniformMatrix4fv(matrixUniformLocation, false, matrix.identity());

    const positionBuffer = createProgramAttributeBuffer(gl, program, {
      name: "position",
      type: gl.FLOAT,
      size: 2,
    });

    setPosition(positionBuffer);
  }, [gl, setMatrix, setPosition]);
};
