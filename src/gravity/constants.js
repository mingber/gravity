export const SWITCH_MODE = 'gravity/SWITCH_MODE';
export const START_PLACE = 'gravity/START_PLACE';
export const DRAG_PLACE = 'gravity/DRAG_PLACE';
export const PLACE_PLANET = 'gravity/PLACE_PLANET';
export const RESIZE_PLANET = 'gravity/RESIZE_PLANET';
export const MOVE_PLANET = 'gravity/MOVE_PLANET';
export const REMOVE_PLANET = 'gravity/REMOVE_PLANET';
export const START_LAUNCH = 'gravity/START_LAUNCH';
export const DRAG_LAUNCH = 'gravity/DRAG_LAUNCH';
export const LAUNCH_MOON = 'gravity/LAUNCH_MOON';
export const CLEAR_MOONS = 'gravity/CLEAR_MOONS';
export const CHANGE_SPEED = 'gravity/CHANGE_SPEED';
export const ADVANCE = 'gravity/ADVANCE';

export const G = 0.03;
export const initialSpeed = Math.floor(1000 / 60);
export const launcherRatio = 0.02;

export const colors = {
  planet: '#ff9000',
  planetAccent: '#ffc06d',
  moon: '#0061ff',
  moonAccent: '#7caeff'
};

export const unHash = (hash) => Object.keys(hash).map(id => hash[id]);
