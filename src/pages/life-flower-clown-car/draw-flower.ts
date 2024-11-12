import { drawSimpleCircle } from "../../webgl/common/circle";
import { drawSimpleRectangle } from "../../webgl/common/rectangle";
import { Vector2, Vector3 } from "../../webgl/core/types";
import { GL } from "../../webgl/core/webgl";

const GREEN: Vector3 = [0, 255, 0];
const YELLOW: Vector3 = [255, 255, 0];
const ORANGE: Vector3 = [255, 127, 0]; // Cor laranja para as pétalas

export const drawFlower = (
  gl: GL,
  position: WebGLBuffer,
  color: WebGLBuffer
) => {
  // Definindo o caule da flor
  drawSimpleRectangle(
    gl,
    position,
    color,
    {
      startPoint: [200, 425],
      width: 10,
      height: 50,
    },
    GREEN
  );

  // Definindo as pétalas

  const petalPositions: Vector2[] = [
    [205, 490],
    [185, 475],
    [225, 475],
    [190, 456],
    [220, 456],
  ];

  petalPositions.forEach((center) => {
    drawSimpleCircle(
      gl,
      position,
      color,
      { radius: 8, triangles: 30, center },
      ORANGE
    );
  });

  // Definindo o miolo da flor
  drawSimpleCircle(
    gl,
    position,
    color,
    { radius: 12, triangles: 30, center: [205, 470] },
    YELLOW // Cor amarela para o miolo
  );
};
