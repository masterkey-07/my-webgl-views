import React from "react";
import { GL } from "../webgl/core/webgl";

export const useGL = (ref: React.RefObject<HTMLCanvasElement>) => {
  const [gl, setGL] = React.useState<GL>();

  React.useLayoutEffect(() => {
    const gl = ref.current?.getContext("webgl");

    if (ref.current) {
      if (!gl) throw new Error("WebGL not Supported");

      setGL(gl);
    }
  }, [ref]);

  return gl;
};
