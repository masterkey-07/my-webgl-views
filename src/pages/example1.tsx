import { WebGLCanvas } from "../components/WebGLCanvas";
import { createProgramAttributeBuffer } from "../functions/buffer";
import { randomColor } from "../functions/color";
import { createProgram } from "../functions/program";
import { drawSimpleRectangle } from "../functions/rectangle";
import { compileShader } from "../functions/shader";

const vertexShaderGLSL = `
attribute vec2 position;
attribute vec3 color;

varying vec3 vColor;

void main() {
gl_Position = vec4(position, 0.0, 1.0);
vColor = color; // Pass color to the fragment shader
}
`;

const fragmentShaderGLSL = `
precision mediump float;

varying vec3 vColor;

void main() {
gl_FragColor = vec4(vColor, 1.0); // Set the color of each fragment
}
`;

export const Example1 = () => {
  return (
    <WebGLCanvas
      setup={(gl) => {
        const vertexShader = compileShader(
          gl,
          gl.VERTEX_SHADER,
          vertexShaderGLSL
        );

        const fragmentShader = compileShader(
          gl,
          gl.FRAGMENT_SHADER,
          fragmentShaderGLSL
        );

        const program = createProgram(gl, vertexShader, fragmentShader);

        gl.useProgram(program);

        const squareVertexColors = new Float32Array([
          ...randomColor(),
          ...randomColor(),
          ...randomColor(),
          ...randomColor(),
          ...randomColor(),
          ...randomColor(),
        ]);

        const positionBuffer = createProgramAttributeBuffer(gl, program, {
          name: "position",
          size: 2,
          type: gl.FLOAT,
        });

        const colorBuffer = createProgramAttributeBuffer(gl, program, {
          size: 3,
          name: "color",
          type: gl.FLOAT,
        });

        drawSimpleRectangle(
          gl,
          positionBuffer,
          colorBuffer,
          {
            startPoint: [-1, 0.5],
            height: 0.5,
            width: 0.5,
          },
          squareVertexColors
        );

        // Clear the canvas
        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Draw the square (two triangles)
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }}
    />
  );
};
