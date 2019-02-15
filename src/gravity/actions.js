import {
  SWITCH_MODE,
  START_PLACE,
  DRAG_PLACE,
  PLACE_PLANET,
  // RESIZE_PLANET,
  // MOVE_PLANET,
  // REMOVE_PLANET,
  START_LAUNCH,
  DRAG_LAUNCH,
  LAUNCH_MOON,
  // CLEAR_MOONS,
  // CHANGE_SPEED,
  ADVANCE,
  launcherRatio,
} from './constants';

import { Vector, Planet, Moon } from './model';

export const switchMode = mode => ({
  type: SWITCH_MODE,
  mode: mode,
});

export const startPlace = ({ x, y }) => ({
  type: START_PLACE,
  pos: new Vector(x, y),
});

export const dragPlace = ({ x, y }, center) => ({
  type: DRAG_PLACE,
  radius: Math.round(center.subtract(new Vector(x, y)).magnitude()),
});

export const placePlanet = ({ center, radius }) => {
  return {
    type: PLACE_PLANET,
    planet: new Planet(center, radius),
  };
};

export const startLaunch = ({ x, y }) => ({
  type: START_LAUNCH,
  pos: new Vector(x, y),
});

export const dragLaunch = ({ x, y }) => ({
  type: DRAG_LAUNCH,
  pos: new Vector(x, y),
});

export const launchMoon = ({ start, tip }) => {
  const vel = tip.subtract(start).scale(launcherRatio);
  const moon = new Moon(start, vel);
  return {
    type: LAUNCH_MOON,
    moon,
  };
};

export const advance = () => ({ type: ADVANCE });
