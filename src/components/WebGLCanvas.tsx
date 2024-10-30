import React, { createRef } from "react";
import { GL } from "../functions/webgl";

type WebGLCanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & { setup: (gl: GL) => void };

export const WebGLCanvas = (props: WebGLCanvasProps) => {
  const ref = createRef<HTMLCanvasElement>();

  React.useLayoutEffect(() => {
    const gl = ref.current?.getContext("webgl");

    if (!gl) throw new Error("WebGL not Supported");

    props.setup(gl);
  }, [props, ref]);

  return (
    <canvas
      {...props}
      id="screen"
      ref={ref}
      style={{ width: "500px", height: "500px", border: "1px solid gray" }}
    />
  );
};
