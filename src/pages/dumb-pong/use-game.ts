import React from "react";
import { Vector2 } from "../../webgl/core/types";
import { GL_PLAYER_HEIGHT } from "./draw";

export type Game = {
  step: Vector2;
  ball: Vector2;
  playerA: number;
  playerB: number;
};

const isIn = (value: number, range: Vector2) =>
  range[0] <= value && value <= range[1];

export const updateGame = (game: Game): Game => {
  const [stepx, stepy] = game.step;
  const [x, y] = game.ball;

  const isRightImpact = x < -1;
  const isLeftImpact = x > 1;

  const newstepx = isRightImpact || isLeftImpact ? -stepx : stepx;
  const newstepy = y > 1 || y < -1 ? -stepy : stepy;

  const playerARange: Vector2 = [
    game.playerA + GL_PLAYER_HEIGHT / 2,
    game.playerA - GL_PLAYER_HEIGHT / 2,
  ];

  const playerBRange: Vector2 = [
    game.playerB + GL_PLAYER_HEIGHT / 2,
    game.playerB - GL_PLAYER_HEIGHT / 2,
  ];

  const isKill = isRightImpact
    ? !isIn(y, playerARange)
    : isLeftImpact
    ? !isIn(y, playerBRange)
    : false;

  if (isKill) {
    alert("PLAYER " + (isLeftImpact ? "A" : "B") + " WIN");
    return {
      step: [0.015 * (isLeftImpact ? 1 : -1), 0.02],
      ball: [0, 0],
      playerA: 0,
      playerB: 0,
    };
  }

  return {
    step: [newstepx, newstepy],
    ball: [x + newstepx, y + newstepy],
    playerA: game.playerA,
    playerB: game.playerB,
  };
};

const PLAYER_MOVEMENT = 0.2;

export const updatePlayer = (game: Game, code: string): Game => {
  const newPlayerA =
    code === "w" || code === "W"
      ? game.playerA + PLAYER_MOVEMENT
      : code === "s" || code === "S"
      ? game.playerA - PLAYER_MOVEMENT
      : game.playerA;

  const newPlayerB =
    code === "ArrowUp"
      ? game.playerB + PLAYER_MOVEMENT
      : code === "ArrowDown"
      ? game.playerB - PLAYER_MOVEMENT
      : game.playerB;

  return {
    ...game,
    playerA: newPlayerA,
    playerB: newPlayerB,
  };
};

export const useGame = () => {
  const [game, setGame] = React.useState<Game>({
    step: [0.015, 0.02],
    ball: [0, 0],
    playerA: 0,
    playerB: 0,
  });

  return { game, setGame };
};
