import { Vector } from './model';

import {
  SWITCH_MODE,
  START_PLACE,
  DRAG_PLACE,
  PLACE_PLANET,
  RESIZE_PLANET,
  MOVE_PLANET,
  REMOVE_PLANET,
  START_LAUNCH,
  DRAG_LAUNCH,
  LAUNCH_MOON,
  CLEAR_MOONS,
  CHANGE_SPEED,
  ADVANCE,
  G,
  initialSpeed,
  unHash
} from './constants';

const INITIAL_STATE = {
  mode: 0,
  speed: initialSpeed,
  planets: {},
  moons: {},
  placer: null,
  launcher: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SWITCH_MODE: {
      const { mode } = action;
      return {
        ...state,
        mode: (+mode === mode) ? mode : (1 - state.mode),
      };
    }
    case START_PLACE: {
      const { pos } = action;
      return {
        ...state,
        placer: {
          center: pos,
          radius: 0,
        },
      };
    }
    case DRAG_PLACE: {
      const { radius } = action;
      return {
        ...state,
        placer: {
          ...state.placer,
          radius,
        },
      };
    }
    case PLACE_PLANET: {
      const { planet } = action;
      return {
        ...state,
        planets: {
          [planet.id]: planet,
          ...state.planets,
        },
        placer: null,
      };
    }
    case RESIZE_PLANET: {
      const { id, radius } = action;
      return {
        ...state,
        planets: {
          [id]: state.planets[id].resize(radius),
          ...state.planets,
        },
      };
    }
    case MOVE_PLANET: {
      const { id, pos } = action;
      return {
        ...state,
        planets: {
          [id]: state.planets[id].move(pos),
          ...state.planets,
        },
      };
    }
    case REMOVE_PLANET: {
      const { id } = action;
      return {
        ...state,
        planets: {
          [id]: null,
          ...state.planets,
        },
      };
    }
    case START_LAUNCH: {
      const { pos } = action;
      return {
        ...state,
        launcher: {
          start: pos,
          tip: pos,
        },
      };
    }
    case DRAG_LAUNCH: {
      const { pos } = action;
      return {
        ...state,
        launcher: {
          ...state.launcher,
          tip: pos,
        },
      };
    }
    case LAUNCH_MOON: {
      const { moon } = action;
      return {
        ...state,
        moons: {
          [moon.id]: moon,
          ...state.moons,
        },
        launcher: null,
      };
    }
    case CLEAR_MOONS: {
      return {
        ...state,
        moons: {},
      };
    }
    case CHANGE_SPEED: {
      const { speed } = action;
      return {
        ...state,
        speed,
      };
    }
    case ADVANCE: {
      const { planets, moons } = state;
      Object.keys(moons).forEach(moonId => {
        const { pos } = moons[moonId];
        const acceleration = unHash(planets)
          .filter(x => x)
          .reduce((acc, planet) => (
            acc.add(planet.getAcc(G, pos))
          ), new Vector(0, 0));
        moons[moonId] = moons[moonId].advance(acceleration);
      });
      return {
        ...state,
        moons,
      }
    }
    default:
      return state;
  }
}

export default reducer;
