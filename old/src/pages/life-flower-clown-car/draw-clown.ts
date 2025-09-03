import { drawSimpleCircle } from "../../webgl/common/circle";
import { drawSimpleRectangle } from "../../webgl/common/rectangle";
import { drawSimpleTriangle } from "../../webgl/common/triangle";
import { Vector3 } from "../../webgl/core/types";
import { GL } from "../../webgl/core/webgl";

const WHITE: Vector3 = [255, 255, 255];
const BLACK: Vector3 = [0, 0, 0];
const LIGHT_BLUE: Vector3 = [80, 80, 255];
const RED: Vector3 = [255, 0, 0];

export const drawClown = (
  gl: GL,
  position: WebGLBuffer,
  color: WebGLBuffer
) => {
  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 42, triangles: 30, center: [250, 350] },
    WHITE
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 8, triangles: 30, center: [230, 360] },
    LIGHT_BLUE
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 4, triangles: 30, center: [230, 360] },
    BLACK
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 8, triangles: 30, center: [270, 360] },
    LIGHT_BLUE
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 4, triangles: 30, center: [270, 360] },
    BLACK
  );

  drawSimpleTriangle(
    gl,
    position,
    color,
    {
      pointA: [250, 410],
      pointB: [210, 380],
      pointC: [290, 380],
    },
    RED
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 8, triangles: 30, center: [250, 410] },
    RED
  );

  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 8, triangles: 30, center: [250, 345] },
    RED
  );

  drawSimpleRectangle(
    gl,
    position,
    color,
    {
      startPoint: [235, 320],
      width: 30,
      height: 10,
    },
    RED
  );
};
