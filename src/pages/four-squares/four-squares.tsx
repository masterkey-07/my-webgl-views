import React from "react";
import { Matrix4, Vector3, Vector4 } from "../../webgl/core/types";
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
import { identity, multiply, translate, zRotate } from "../../utils/matrix";
import { drawSimpleRectangle } from "../../webgl/common/rectangle";
import { degreeToRadius } from "../../utils";

const WHITE: Vector3 = [1, 1, 1];

type Four = [Vector4, Matrix4, Vector4, Vector4];

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

export const FourSquares = () => {
  const ref = React.useRef<HTMLCanvasElement>(null);

  const [color, setColor] = React.useState<Buffer>();
  const [position, setPosition] = React.useState<Buffer>();
  const [matrix, setMatrix] = React.useState<UniformLocation>();
  const [matrixData, setMatrixData] = React.useState<Four>([
    [0, 300, 300, 300], // Top-left
    identity(),
    [0, 0, 300, 300],
    [300, 0, 300, 300],
  ]);

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

const viewports = [
  [0, 300, 300, 300], // Top-left
  [300, 300, 300, 300], // Top-right
  [0, 0, 300, 300], // Bottom-left
  [300, 0, 300, 300], // Bottom-right
];

const mem = { up: false };
const mem2 = { up: false };
const mem3 = { up: false };

const animations = [
  (dt: Vector4) => {
    let modify = 0;

    if (mem.up) {
      mem.up = !(dt[2] == 300);

      modify = 1;
    } else {
      mem.up = dt[2] == 50;

      modify = -1;
    }

    return [dt[0], dt[1], dt[2] + modify, dt[3] + modify];
  },
  (dt: Matrix4) => {
    let m = identity();
    m = zRotate(m, degreeToRadius(-1));

    return multiply(dt, translate(m, 0, 0, 0.0));
  },
  (dt: Vector4) => {
    let modify = 0;

    if (mem2.up) {
      mem2.up = !(dt[1] == 0);

      modify = 1;
    } else {
      mem2.up = dt[1] == -150;

      modify = -1;
    }

    return [dt[0], dt[1] + modify, dt[2], dt[3]];
  },
  (dt: Vector4) => {
    let modify = 0;

    if (mem3.up) {
      mem3.up = !(dt[0] == 450);

      modify = 1;
    } else {
      mem3.up = dt[0] == 300;

      modify = -1;
    }

    return [dt[0] + modify, dt[1], dt[0], dt[3]];
  },
];

const useDraw = (
  gl: GL | undefined,
  position: Buffer | undefined,
  color: Buffer | undefined,
  matrix: UniformLocation | undefined,
  [data, setData]: [Four, (data: Four) => void]
) => {
  return React.useCallback(() => {
    if (!gl || !position || !color || !matrix) return;

    setWebGLBackgroundColor(gl, [...WHITE, 1]);

    const newData = structuredClone(data);

    for (let index = 0; index < viewports.length; index++) {
      const viewport =
        newData[index].length == 4 ? newData[index] : viewports[index];

      gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);

      gl.uniformMatrix4fv(
        matrix,
        false,
        index === 1 ? newData[index] : identity()
      );

      drawSimpleRectangle(
        gl,
        position,
        color,
        {
          height: !index ? 600 : 300,
          width: !index ? 600 : 300,
          startPoint: [index ? 150 : 0, index ? 150 : 0],
        },
        [0, 0, 0]
      );

      const animation = animations[index];

      newData[index] = animation(newData[index] as never) as Vector4;
    }

    setData(newData);
  }, [color, data, gl, matrix, position, setData]);
};
