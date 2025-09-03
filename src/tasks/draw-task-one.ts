import { cleanupBackground, compileShader, createProgram, getWebGL } from "../webgl";
import { bindBufferFloatArray, createBuffer } from "../webgl/buffer";
import { generate2DTriangleColors, get2DTriangleVertices, TRIANGLE_2D_POINTS } from "../webgl/triangle";

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  attribute vec3 color;
  varying vec3 vColor;
    
  void main() {
      gl_Position = vec4(position,0.0,1.0);
      vColor = color;
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;

  varying vec3 vColor;        

  void main() {
      gl_FragColor = vec4(vColor,1.0);
  }
`;

export default () => {
  console.log("loading task one");

  const gl = getWebGL();

  cleanupBackground(gl);

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  const positionBuffer = createBuffer(gl, program, "position", 2);

  const colorBuffer = createBuffer(gl, program, "color", 3);

  bindBufferFloatArray(gl, positionBuffer, get2DTriangleVertices([0, 0.5, -0.5, -0.5, 0.5, -0.5]));

  bindBufferFloatArray(gl, colorBuffer, generate2DTriangleColors());

  gl.drawArrays(gl.TRIANGLES, 0, TRIANGLE_2D_POINTS);
};
