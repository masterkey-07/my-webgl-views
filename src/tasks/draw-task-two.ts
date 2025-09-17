import { compileShader, createProgram, getWebGL, setBackgroundColor } from "../webgl";
import type { Matrix4 } from "../webgl/matrix";

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;

  uniform mat4 matrix;
  uniform float wd;

  void main() {
    gl_Position = matrix * vec4(position, 0, 1);
    gl_PointSize = wd;
  }
  `;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;

  uniform vec3 color;

  void main() {
    gl_FragColor = vec4(color,1.0);
  }
`;

const createMatrix = (width: number): Matrix4 => [2 / width, 0, 0, 0, 0, -2 / width, 0, 0, 0, 0, 0, 0, -1, 1, 0, 1];

export default () => {
  console.log("loading task two");

  const matrix = createMatrix(800);

  const gl = getWebGL();

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  const matrixUniformLocation = gl.getUniformLocation(program, `matrix`);
  const colorUniformLocation = gl.getUniformLocation(program, `color`);
  const widthUniformLocation = gl.getUniformLocation(program, `wd`);

  gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

  gl.uniform3fv(colorUniformLocation, [1, 0, 0]);
  gl.uniform1f(widthUniformLocation, 4);

  //   setBackgroundColor(gl, [1, 1, 1]);
};
