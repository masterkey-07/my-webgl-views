import React from "react";
import { Game, updateGame } from "./use-game";

import {
  Buffer,
  GL,
  setWebGLBackgroundColor,
  UniformLocation,
} from "../../webgl/core/webgl";

import { drawBall, drawPlayer } from "./draw";

export const useDrawFrame = (
  gl: GL | undefined,
  game: Game,
  setGame: (game: Game | ((g: Game) => Game)) => void,
  matrix: UniformLocation | undefined,
  position: Buffer | undefined
) =>
  React.useCallback(() => {
    if (!gl || !matrix || !position) return;

    setWebGLBackgroundColor(gl, [0, 0, 0, 0]);

    drawBall(gl, matrix, position, game.ball);

    drawPlayer(gl, matrix, position, true, game.playerA);
    drawPlayer(gl, matrix, position, false, game.playerB);

    setGame((game) => updateGame(game));
  }, [game, gl, matrix, position, setGame]);
