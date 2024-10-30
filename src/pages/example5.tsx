import { randomColor } from "../functions/color";
import { compileShader } from "../functions/shader";
import { createProgram } from "../functions/program";
import { WebGLCanvas } from "../components/WebGLCanvas";
import { drawSimpleCircle } from "../functions/circle";
import { setWebGLBackgroundColor } from "../functions/webgl";
import { createProgramAttributeBuffer } from "../functions/buffer";
import { Rectangle, drawSimpleRectangle } from "../functions/rectangle";

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

const RECTANGLE_A: Rectangle = {
  width: 0.5,
  height: 0.5,
  startPoint: [-0.75, -0.75],
};

const RECTANGLE_B: Rectangle = {
  width: 0.5,
  height: 0.5,
  startPoint: [0.25, 0.25],
};

const RECTANGLE_C: Rectangle = {
  width: 0.5,
  height: 0.5,
  startPoint: [0.25, -0.75],
};

const RECTANGLE_D: Rectangle = {
  width: 0.5,
  height: 0.5,
  startPoint: [-0.75, 0.25],
};

const RECTANGLES = [RECTANGLE_A, RECTANGLE_B, RECTANGLE_C, RECTANGLE_D];

export const Example5 = () => {
  return (
    <WebGLCanvas
      setup={(gl) => {
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

        setWebGLBackgroundColor(gl, [...randomColor(), 1]);

        for (const rectangle of RECTANGLES)
          drawSimpleRectangle(
            gl,
            positionBuffer,
            colorBuffer,
            rectangle,
            randomColor()
          );

        drawSimpleCircle(gl, positionBuffer, colorBuffer, {
          radius: 0.5,
          triangles: 30,
        });
      }}
    />
  );
};
