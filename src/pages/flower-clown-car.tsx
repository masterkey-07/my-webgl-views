import { compileShader } from "../functions/shader";
import { createProgram } from "../functions/program";
import { WebGLCanvas } from "../components/WebGLCanvas";
// import { drawSimpleCircle } from "../functions/circle";
import {
  GL,
  setWebGLBackgroundColor,
  glPos,
  glSize,
  setCanvasSize,
} from "../functions/webgl";
import { createProgramAttributeBuffer } from "../functions/buffer";
import { Rectangle, drawSimpleRectangle } from "../functions/rectangle";
import { Vector2, Vector3 } from "../functions/types";
import { drawSimpleTriangle } from "../functions/triangle";
import { drawSimpleCircle } from "../functions/circle";

const BLACK: Vector3 = [0, 0, 0];
const DARK_GRAY: Vector3 = [0.2, 0.2, 0.2];
const WHITE: Vector3 = [1, 1, 1];

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

export const FlowerClownCar = () => {
  return (
    <WebGLCanvas
      width={600}
      height={600}
      setup={(gl) => {
        setCanvasSize(600);

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

        const positionBuffer = createProgramAttributeBuffer(gl, program, {
          name: "position",
          type: gl.FLOAT,
          size: 2,
        });

        const colorBuffer = createProgramAttributeBuffer(gl, program, {
          name: "color",
          size: 3,
          type: gl.FLOAT,
        });

        setWebGLBackgroundColor(gl, [...WHITE, 1]);

        drawCar(gl, positionBuffer, colorBuffer);
        drawClown(gl, positionBuffer, colorBuffer);
      }}
    />
  );
};

const drawCar = (gl: GL, position: WebGLBuffer, color: WebGLBuffer) => {
  const body: Rectangle = {
    startPoint: glPos([100, 250]) as Vector2,
    width: glSize(350) as number,
    height: glSize(100) as number,
  };

  const upper: Rectangle = {
    startPoint: glPos([100, 350]) as Vector2,
    width: glSize(250) as number,
    height: glSize(75) as number,
  };

  drawSimpleRectangle(gl, position, color, body, [0.5, 0.5, 1]);
  drawSimpleRectangle(gl, position, color, upper, [0.5, 0.5, 1]);
  drawSimpleTriangle(
    gl,
    position,
    color,
    {
      pointA: glPos([350, 425]) as Vector2,
      pointB: glPos([350, 350]) as Vector2,
      pointC: glPos([450, 350]) as Vector2,
    },
    [1, 1, 0]
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 0.175, triangles: 30, center: glPos([375, 260]) as Vector2 },
    DARK_GRAY
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 0.175, triangles: 30, center: glPos([175, 260]) as Vector2 },
    DARK_GRAY
  );
};

const drawClown = (gl: GL, position: WebGLBuffer, color: WebGLBuffer) => {
  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 0.15, triangles: 30, center: glPos([250, 350]) as Vector2 },
    WHITE
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 0.03, triangles: 30, center: glPos([230, 360]) as Vector2 },
    [0.3, 0.3, 1]
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 0.015, triangles: 30, center: glPos([230, 360]) as Vector2 },
    BLACK
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 0.03, triangles: 30, center: glPos([270, 360]) as Vector2 },
    [0.3, 0.3, 1]
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 0.015, triangles: 30, center: glPos([270, 360]) as Vector2 },
    BLACK
  );

  drawSimpleTriangle(
    gl,
    position,
    color,
    {
      pointA: glPos([250, 410]) as Vector2,
      pointB: glPos([210, 380]) as Vector2,
      pointC: glPos([290, 380]) as Vector2,
    },
    [1, 0, 0]
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 0.03, triangles: 30, center: glPos([250, 410]) as Vector2 },
    [1, 0, 0]
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 0.03, triangles: 30, center: glPos([250, 345]) as Vector2 },
    [1, 0, 0]
  );

  drawSimpleRectangle(
    gl,
    position,
    color,
    {
      startPoint: glPos([235, 320]) as Vector2,
      width: glSize(30) as number,
      height: glSize(10) as number,
    },
    [1, 0, 0]
  );
};


const drawFlower = (gl:GL)