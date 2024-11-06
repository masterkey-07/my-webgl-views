import React from "react";
import { useGL } from "../../hooks/use-gl";

import { updatePlayer, useGame } from "./use-game";
import { useSetup } from "./use-setup";
import { CANVAS_SIZE } from "../../utils";
import { useDrawFrame } from "./use-draw-frame";
import { setWebGLConf } from "../../webgl/core/webgl";
import { BorderedCanvas } from "../../components/bordered-canvas";

export const DumbPong = () => {
  setWebGLConf({ size: CANVAS_SIZE });

  const { game, setGame } = useGame();

  const [position, setPosition] = React.useState<WebGLBuffer>();
  const [matrix, setMatrixLocation] = React.useState<WebGLUniformLocation>();

  const ref = React.useRef<HTMLCanvasElement>(null);

  const gl = useGL(ref);

  useSetup(gl, setMatrixLocation, setPosition);

  const drawFrame = useDrawFrame(gl, game, setGame, matrix, position);

  React.useEffect(() => {
    const id = requestAnimationFrame(drawFrame);

    return () => {
      cancelAnimationFrame(id);
    };
  }, [drawFrame]);

  React.useEffect(() => {
    const keydown = (event: KeyboardEvent) =>
      setGame((game) => updatePlayer(game, event.key));

    document.addEventListener("keydown", keydown);

    return () => {
      document.removeEventListener("keydown", keydown);
    };
  }, [setGame]);

  return <BorderedCanvas ref={ref} width={CANVAS_SIZE} height={CANVAS_SIZE} />;
};
