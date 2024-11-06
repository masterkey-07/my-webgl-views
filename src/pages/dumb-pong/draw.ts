import { CANVAS_SIZE } from "../../utils";
import { Vector2 } from "../../webgl/core/types";
import { identity, translate } from "../../utils/matrix";
import { drawSimpleCircle } from "../../webgl/common/circle";
import { Buffer, GL, UniformLocation } from "../../webgl/core/webgl";
import { drawSimpleRectangle } from "../../webgl/common/rectangle";

const CENTER: Vector2 = [CANVAS_SIZE / 2, CANVAS_SIZE / 2] as const;

export const drawBall = (
  gl: GL,
  location: UniformLocation,
  buffer: Buffer,
  xy: Vector2
) => {
  if (!gl) return;

  gl.uniformMatrix4fv(location, false, translate(identity(), ...xy, 0));

  drawSimpleCircle(gl, buffer, undefined, {
    triangles: 30,
    radius: 30,
    center: CENTER,
  });
};

const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 200;

export const GL_PLAYER_HEIGHT = PLAYER_HEIGHT / (CANVAS_SIZE / 2) - 1;

export const drawPlayer = (
  gl: GL,
  matrix: UniformLocation,
  position: Buffer,
  first: boolean,
  y: number
) => {
  gl.uniformMatrix4fv(matrix, false, translate(identity(), 0, y, 0));

  drawSimpleRectangle(
    gl,
    position,
    undefined,
    {
      startPoint: [
        first ? 0 : CANVAS_SIZE - PLAYER_WIDTH,
        (CANVAS_SIZE - 100) / 2,
      ],
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    },
    undefined
  );
};
