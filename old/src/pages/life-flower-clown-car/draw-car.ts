import { drawSimpleCircle } from "../../webgl/common/circle";
import { drawSimpleRectangle, Rectangle } from "../../webgl/common/rectangle";
import { drawSimpleTriangle } from "../../webgl/common/triangle";
import { Vector3 } from "../../webgl/core/types";
import { GL } from "../../webgl/core/webgl";

const YELLOW: Vector3 = [255, 255, 0];
const DARK_GRAY: Vector3 = [40, 40, 40];
const LIGHT_BLUE: Vector3 = [127, 127, 255];

export const drawCar = (gl: GL, position: WebGLBuffer, color: WebGLBuffer) => {
  const body: Rectangle = {
    startPoint: [100, 250],
    width: 350,
    height: 100,
  };

  const upper: Rectangle = {
    startPoint: [100, 350],
    width: 250,
    height: 75,
  };

  drawSimpleRectangle(gl, position, color, body, LIGHT_BLUE);
  drawSimpleRectangle(gl, position, color, upper, LIGHT_BLUE);
  drawSimpleTriangle(
    gl,
    position,
    color,
    {
      pointA: [350, 425],
      pointB: [350, 350],
      pointC: [450, 350],
    },
    YELLOW
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 40, triangles: 30, center: [375, 260] },
    DARK_GRAY
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 40, triangles: 30, center: [175, 260] },
    DARK_GRAY
  );
};
