export const CANVAS_SIZE = Math.min(
  window.innerWidth - 245,
  window.innerHeight - 50
);

export function radiusToDegree(radius: number) {
  return (radius * 180) / Math.PI;
}

export function degreeToRadius(dregree: number) {
  return (dregree * Math.PI) / 180;
}
