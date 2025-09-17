import { setBackgroundColor, compileShader, createProgram, getWebGL, getCanvas } from "../webgl";
import { createBuffer } from "../webgl/buffer";
import type { Matrix4 } from "../webgl/matrix";
import { draw2DLineWithPoints, draw2DPoint, drawTriangleWithPoints } from "../webgl/point";
import type { Point2D, Vector3 } from "../webgl/vector";

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

type State = {
  drawMode: 2 | 3;
  changeMode: "color" | "width";
};

const COLORS: Vector3[] = [
  [0.0, 0.0, 0.0],
  [1.0, 0.0, 0.0],
  [0.0, 1.0, 0.0],
  [0.0, 0.0, 1.0],
  [1.0, 1.0, 0.0],
  [0.0, 1.0, 1.0],
  [1.0, 0.0, 1.0],
  [1.0, 0.5, 0.5],
  [0.5, 1.0, 0.5],
  [0.5, 0.5, 1.0],
];

const state: State = { drawMode: 2, changeMode: "color" };
const points: Point2D[] = [];

const createMatrix = (width: number): Matrix4 => [2 / width, 0, 0, 0, 0, -2 / width, 0, 0, 0, 0, 0, 0, -1, 1, 0, 1];

export default () => {
  console.log("loading task one");

  const matrix = createMatrix(800);

  const canvas = getCanvas();

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

  const positionBuffer = createBuffer(gl, program, "position", 2);

  const cleanup = () => {
    while (points.pop());
    setBackgroundColor(gl, [1, 1, 1]);
    draw2DPoint(gl, positionBuffer, undefined, new Float32Array([800 / 2, 800 / 2]));
  };

  const drawPoints = () => {
    setBackgroundColor(gl, [1, 1, 1]);
    if (state.drawMode === 2) draw2DLineWithPoints(gl, positionBuffer, undefined, points as [Point2D, Point2D], undefined);
    else if (state.drawMode === 3) drawTriangleWithPoints(gl, positionBuffer, undefined, points as [Point2D, Point2D, Point2D], undefined);
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "t" || event.key === "T") {
      state.drawMode = 3;
      cleanup();
    } else if (event.key === "r" || event.key === "R") {
      state.drawMode = 2;
      cleanup();
    } else if (event.key === "e" || event.key === "E") state.changeMode = "color";
    else if (event.key === "k" || event.key === "K") state.changeMode = "width";
    else if (event.key.match(/\d/)) {
      if (state.changeMode === "color") gl.uniform3fv(colorUniformLocation, COLORS[Number(event.key)]);
      else gl.uniform1f(widthUniformLocation, Number(event.key) + 1);

      drawPoints();
    }
  };

  const onMouseDown = (event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.x;
    const y = event.clientY - rect.y;

    const pastLength = points.length;

    if (state.drawMode === pastLength) while (points.length) points.pop();

    points.push([x, y]);

    const length = points.length;

    const draw = state.drawMode === length;

    if (draw) drawPoints();
  };

  cleanup();

  document.addEventListener("keydown", onKeyDown);
  canvas.addEventListener("mousedown", onMouseDown);

  return () => {
    document.removeEventListener("keydown", onKeyDown);
    canvas.removeEventListener("mousedown", onMouseDown);
  };
};
