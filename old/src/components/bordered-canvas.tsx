import React from "react";

type WebGLCanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

export const BorderedCanvas = React.forwardRef<
  HTMLCanvasElement,
  WebGLCanvasProps
>((props, ref) => {
  return (
    <canvas
      {...props}
      ref={ref}
      id="screen"
      style={{ ...(props.style || {}), border: "1px solid gray" }}
    />
  );
});
