import {
  START_GAME,
  TURN_SNAKE,
  ADVANCE,
} from './constants';

import { Game } from './model';

export const startGame = width => ({
  type: START_GAME,
  game: new Game(width),
});

export const turnSnake = direction => ({
  type: TURN_SNAKE,
  direction,
});

export const advance = () => ({ type: ADVANCE });
