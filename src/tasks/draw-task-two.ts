import { setBackgroundColor, compileShader, createProgram, getWebGL } from "../webgl";
import { createBuffer } from "../webgl/buffer";
import { draw2DTriangule, generate2DTriangleColors, get2DTriangleVertices } from "../webgl/triangle";

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

  setBackgroundColor(gl, [1, 1, 1]);

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  const positionBuffer = createBuffer(gl, program, "position", 2);

  const colorBuffer = createBuffer(gl, program, "color", 3);

  draw2DTriangule(gl, positionBuffer, colorBuffer, get2DTriangleVertices([0, -0.5, -0.5, 0.5, 0.5, 0.5]), generate2DTriangleColors());
};
