import { WebGLCanvas } from "../components/WebGLCanvas";
import { createProgram } from "../functions/program";
import { compileShader } from "../functions/shader";

const fragmentShaderGLSL = `
    precision mediump float;

    varying vec3 vColor;        

    void main() {
        gl_FragColor = vec4(vColor,1.0);
    }
`;

const vertexShaderGLSL = `
    attribute vec2 position;
    attribute vec3 color;
    varying vec3 vColor;
        
    void main() {
        gl_Position = vec4(position,0.0,1.0);
        vColor = color;
    }
`;

export const Example2 = () => {
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

        // vertex positions for a square
        const squareVertexPositions = new Float32Array([
          -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5,
        ]);

        const squareVertexColors = [];
        const color = [Math.random(), Math.random(), Math.random()];
        for (let n = 0; n < 6; n++) squareVertexColors.push(...color);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(squareVertexPositions),
          gl.STATIC_DRAW
        );

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(squareVertexColors),
          gl.STATIC_DRAW
        );

        const positionLocation = gl.getAttribLocation(program, `position`);
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const colorLocation = gl.getAttribLocation(program, `color`);
        gl.enableVertexAttribArray(colorLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

        gl.clearColor(1.0, 1.0, 1.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }}
    />
  );
};
