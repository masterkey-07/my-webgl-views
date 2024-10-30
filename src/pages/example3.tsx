import { WebGLCanvas } from "../components/WebGLCanvas";
import { createProgramAttributeBuffer } from "../functions/buffer";
import { randomColor } from "../functions/color";
import { createProgram } from "../functions/program";
import { drawSimpleRectangle } from "../functions/rectangle";
import { compileShader } from "../functions/shader";
import { setWebGLBackgroundColor } from "../functions/webgl";

const vertexShaderSource = `
  attribute vec2 position;
  attribute vec3 color;
  varying vec3 vColor;

  void main() {
    gl_Position = vec4(position,0.0,1.0);
    vColor = color;
  }
`;
const fragmentShaderSource = `
  precision mediump float;

  varying vec3 vColor;        

  void main() {
    gl_FragColor = vec4(vColor,1.0);
  }
   `;

export const Example3 = () => {
  return (
    <WebGLCanvas
      setup={(gl) => {
        const vertexShader = compileShader(
          gl,
          gl.VERTEX_SHADER,
          vertexShaderSource
        );
        const fragmentShader = compileShader(
          gl,
          gl.FRAGMENT_SHADER,
          fragmentShaderSource
        );

        const program = createProgram(gl, vertexShader, fragmentShader);

        gl.useProgram(program);

        const positionBuffer = createProgramAttributeBuffer(gl, program, {
          name: "position",
          size: 2,
          type: gl.FLOAT,
        });

        const colorBuffer = createProgramAttributeBuffer(gl, program, {
          name: "color",
          size: 3,
          type: gl.FLOAT,
        });

        setWebGLBackgroundColor(gl, [1, 1, 1, 1]);

        drawSimpleRectangle(
          gl,
          positionBuffer,
          colorBuffer,
          { startPoint: [0, 0], height: 0.5, width: 0.5 },
          randomColor()
        );
      }}
    />
  );
};
