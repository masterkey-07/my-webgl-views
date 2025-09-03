import React from "react";
import { drawCar } from "./draw-car";
import { drawClown } from "./draw-clown";
import { drawFlower } from "./draw-flower";
import { Matrix4, Vector3 } from "../../webgl/core/types";
import { compileShader } from "../../webgl/core/shader";
import { createProgram } from "../../webgl/core/program";
import { BorderedCanvas } from "../../components/bordered-canvas";
import { createProgramAttributeBuffer } from "../../webgl/core/buffer";
import {
  setWebGLConf,
  setWebGLBackgroundColor,
  GL,
  Buffer,
  UniformLocation,
} from "../../webgl/core/webgl";
import { useGL } from "../../hooks/use-gl";
import { identity, translate } from "../../utils/matrix";

const WHITE: Vector3 = [1, 1, 1];

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  attribute vec3 color;
  varying vec3 vColor;
  
  uniform mat4 matrix;
  
  void main() {
      gl_Position = matrix * vec4(position,0.0,1.0);
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

export const LifeFlowerClownCar = () => {
  const ref = React.useRef<HTMLCanvasElement>(null);

  const [color, setColor] = React.useState<Buffer>();
  const [position, setPosition] = React.useState<Buffer>();
  const [matrix, setMatrix] = React.useState<UniformLocation>();
  const [matrixData, setMatrixData] = React.useState<Matrix4>(identity());

  const gl = useGL(ref);

  useSetup(gl, setMatrix, setPosition, setColor);

  const draw = useDraw(gl, position, color, matrix, [
    matrixData,
    setMatrixData,
  ]);

  React.useLayoutEffect(() => {
    const id = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(id);
    };
  }, [draw]);

  return <BorderedCanvas ref={ref} width={600} height={600} />;
};

const useSetup = (
  gl: GL | undefined,
  setMatrix: (loc: UniformLocation) => void,
  setPosition: (buf: Buffer) => void,
  setColor: (buf: Buffer) => void
) => {
  React.useEffect(() => {
    if (!gl) return;

    setWebGLConf({ size: 600 });

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

    if (matrixUniformLocation) setMatrix(matrixUniformLocation);

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

    setColor(colorBuffer);
    setPosition(positionBuffer);
  }, [gl, setColor, setMatrix, setPosition]);
};

const useDraw = (
  gl: GL | undefined,
  position: Buffer | undefined,
  color: Buffer | undefined,
  matrix: UniformLocation | undefined,
  [data, setData]: [Matrix4, (data: Matrix4) => void]
) => {
  return React.useCallback(() => {
    if (!gl || !position || !color || !matrix) return;

    setWebGLBackgroundColor(gl, [...WHITE, 1]);

    gl.uniformMatrix4fv(matrix, false, data);

    drawCar(gl, position, color);
    drawClown(gl, position, color);
    drawFlower(gl, position, color);

    if (data[12] < 2) setData(translate(data, 0.01, 0, 0));
    else setData(translate(data, -4, 0, 0));
  }, [color, data, gl, matrix, position, setData]);
};
