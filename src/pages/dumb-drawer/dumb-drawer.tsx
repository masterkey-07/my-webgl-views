import React from "react";
import { BorderedCanvas } from "../../components/bordered-canvas";
import { useGL } from "../../hooks/use-gl";
import { compileShader } from "../../webgl/core/shader";
import { createProgram } from "../../webgl/core/program";
import { createProgramAttributeBuffer } from "../../webgl/core/buffer";
import {
  drawLineWithPoints,
  drawSimplePoint,
  drawTriangleWithPoints,
} from "../../webgl/common/point";
import { Vector2 } from "../../webgl/core/types";

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

const createMatrix = (size: number) => [
  2 / size,
  0,
  0,
  0,
  0,
  -2 / size,
  0,
  0,
  0,
  0,
  0,
  0,
  -1,
  1,
  0,
  1,
];

export const DumbDrawer = () => {
  const size = Math.min(window.innerWidth - 245, window.innerHeight - 50);

  const [mode, setMode] = React.useState<1 | 2>(1);
  const [mode2, setMode2] = React.useState<1 | 2>(1);
  const [colorLoc, setColorLoc] = React.useState<WebGLUniformLocation>();
  const [wdLoc, setWDLoc] = React.useState<WebGLUniformLocation | null>(null);
  const [points, setPoints] = React.useState<Vector2[]>([]);
  const [posBuf, setPosBuf] = React.useState<WebGLBuffer>();

  const ref = React.useRef<HTMLCanvasElement>(null);

  const gl = useGL(ref);

  React.useEffect(() => {
    if (!gl) return () => undefined;

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
    const colorUniformLocation = gl.getUniformLocation(program, `color`);
    const wdUniformLocation = gl.getUniformLocation(program, `wd`);

    if (colorUniformLocation) setColorLoc(colorUniformLocation);
    if (wdUniformLocation) setWDLoc(wdUniformLocation);

    const matrix = createMatrix(size);

    gl.uniformMatrix4fv(matrixUniformLocation, false, matrix);

    gl.uniform3fv(colorUniformLocation, [0, 0, 0]);
    gl.uniform1f(wdUniformLocation, 4);

    const positionBuffer = createProgramAttributeBuffer(gl, program, {
      name: "position",
      type: gl.FLOAT,
      size: 2,
    });

    setPosBuf(positionBuffer);

    drawSimplePoint(
      gl,
      positionBuffer,
      undefined,
      [size / 2, size / 2],
      undefined
    );
  }, [gl, size]);

  const changeSm = React.useCallback(
    (code: string) => {
      if (!colorLoc) return;

      switch (code) {
        case "0":
          mode2 === 1
            ? gl?.uniform3fv(colorLoc, [0.0, 0.0, 0.0])
            : gl?.uniform1f(wdLoc, 0);
          break;
        case "1":
          mode2 === 1
            ? gl?.uniform3fv(colorLoc, [1.0, 0.0, 0.0])
            : gl?.uniform1f(wdLoc, 1);
          break;
        case "2":
          mode2 === 1
            ? gl?.uniform3fv(colorLoc, [0.0, 1.0, 0.0])
            : gl?.uniform1f(wdLoc, 2);
          break;
        case "3":
          mode2 === 1
            ? gl?.uniform3fv(colorLoc, [0.0, 0.0, 1.0])
            : gl?.uniform1f(wdLoc, 3);
          break;
        case "4":
          mode2 === 1
            ? gl?.uniform3fv(colorLoc, [1.0, 1.0, 0.0])
            : gl?.uniform1f(wdLoc, 4);
          break;
        case "5":
          mode2 === 1
            ? gl?.uniform3fv(colorLoc, [0.0, 1.0, 1.0])
            : gl?.uniform1f(wdLoc, 5);
          break;
        case "6":
          mode2 === 1
            ? gl?.uniform3fv(colorLoc, [1.0, 0.0, 1.0])
            : gl?.uniform1f(wdLoc, 6);
          break;
        case "7":
          mode2 === 1
            ? gl?.uniform3fv(colorLoc, [1.0, 0.5, 0.5])
            : gl?.uniform1f(wdLoc, 7);
          break;
        case "8":
          mode2 === 1
            ? gl?.uniform3fv(colorLoc, [0.5, 1.0, 0.5])
            : gl?.uniform1f(wdLoc, 8);
          break;
        case "9":
          mode2 === 1
            ? gl?.uniform3fv(colorLoc, [0.5, 0.5, 1.0])
            : gl?.uniform1f(wdLoc, 9);
          break;
      }
      if (gl && posBuf && points.length === 2)
        if (mode === 1)
          drawLineWithPoints(
            gl,
            posBuf,
            undefined,
            [points[0], points[1]],
            undefined
          );
        else
          drawTriangleWithPoints(
            gl,
            posBuf,
            undefined,
            [points[0], points[1], points[2]],
            undefined
          );
    },
    [colorLoc, gl, mode, mode2, points, posBuf, wdLoc]
  );

  React.useEffect(() => {
    const f = (e: { key: string }) => {
      if (e.key === "t" || e.key === "T") setMode(2);
      else if (e.key === "r" || e.key === "R") setMode(1);

      if (e.key === "e" || e.key === "E") setMode2(2);
      else if (e.key === "k" || e.key === "K") setMode2(1);

      changeSm(e.key);
    };

    document.addEventListener("keydown", f);

    return () => {
      document.removeEventListener("keydown", f);
    };
  }, [changeSm]);

  return (
    <BorderedCanvas
      ref={ref}
      onMouseDown={(event) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const x = event.clientX - rect.x;
        const y = event.clientY - rect.y;

        const length = points.length;

        setPoints((previous) =>
          length == mode + 1 ? [[x, y]] : [...previous, [x, y]]
        );

        if (gl && posBuf && length == mode)
          if (mode === 1)
            drawLineWithPoints(
              gl,
              posBuf,
              undefined,
              [points[0], [x, y]],
              undefined
            );
          else
            drawTriangleWithPoints(
              gl,
              posBuf,
              undefined,
              [points[0], points[1], [x, y]],
              undefined
            );
      }}
      width={size}
      height={size}
    />
  );
};
