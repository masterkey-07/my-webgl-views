import { drawCar } from "./draw-car";
import { drawClown } from "./draw-clown";
import { drawFlower } from "./draw-flower";
import { Vector3 } from "../../webgl/core/types";
import { compileShader } from "../../webgl/core/shader";
import { createProgram } from "../../webgl/core/program";
import { BorderedCanvas } from "../../components/bordered-canvas";
import { createProgramAttributeBuffer } from "../../webgl/core/buffer";
import {
  setWebGLConf,
  setWebGLBackgroundColor,
  GL,
} from "../../webgl/core/webgl";
import { useGL } from "../../hooks/use-gl";
import React from "react";

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
  const ref = React.useRef<HTMLCanvasElement>(null);

  const gl = useGL(ref);

  React.useLayoutEffect(() => {
    if (gl) draw(gl);
  }, [gl]);

  return <BorderedCanvas ref={ref} width={600} height={600} />;
};

const draw = (gl: GL) => {
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
  drawFlower(gl, positionBuffer, colorBuffer);
};
