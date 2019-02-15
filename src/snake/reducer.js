import {
  START_GAME,
  TURN_SNAKE,
  ADVANCE,
} from './constants';

const INITIAL_STATE = {
  game: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case START_GAME: {
      const { game } = action;
      return {
        ...state,
        game,
      };
    }
    case TURN_SNAKE: {
      const { direction } = action;
      return {
        ...state,
        game: {
          ...state.game,
          snake: state.game.snake.turn(direction),
        }
      }
    }
    case ADVANCE: {
      return {
        ...state,
        game: state.game.advance(),
      }
    }
    default:
      return state;
  }
}

export default reducer;
