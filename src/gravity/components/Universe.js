import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  startPlace,
  dragPlace,
  placePlanet,
  startLaunch,
  dragLaunch,
  launchMoon,
  advance,
  switchMode,
} from '../actions';
import { colors, unHash } from '../constants';

class Universe extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.keyCode === 32) this.props.switchMode();
    if (e.keyCode === 97) {
      console.log('PLANETS', this.props.planetList);
      console.log('MOONS', this.props.moonList);
    }
  }

  componentDidMount() {
    const { advance, speed } = this.props;
    this.interval = setInterval(advance, speed);
    window.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('keypress', this.handleKeyPress);
  }

  getCoords(e) {
    const rect = this.svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  }

  onMouseDown(e) {
    const { mode, startPlace, startLaunch } = this.props;
    const coords = this.getCoords(e);
    if (mode === 'planet') {
      startPlace(coords);
    } else {
      startLaunch(coords);
    }
  }

  onMouseMove(e) {
    const { mode, placer, launcher, dragLaunch, dragPlace } = this.props;
    const coords = this.getCoords(e);
    if (mode === 'moon' && launcher) {
      dragLaunch(coords);
    }
    if (mode === 'planet' && placer) {
      dragPlace(coords, placer.center);
    }
  }

  onMouseUp(e) {
    const { mode, placePlanet, launchMoon, placer, launcher } = this.props;
    if (mode === 'moon' && launcher) {
      launchMoon(launcher);
    }
    if (mode === 'planet' && placer) {
      placePlanet(placer);
    }
  }

  renderPlanet(planet, idx) {
    return (
      <circle
        key={idx}
        cx={planet.center.x}
        cy={planet.center.y}
        r={planet.radius}
        stroke={colors.planet}
        strokeWidth={3}
        fill="none"
      />
    );
  }

  renderMoon(moon, idx) {
    return (
      <g key={idx}>
        <circle
          cx={moon.pos.x}
          cy={moon.pos.y}
          r={5}
          stroke={colors.moon}
          strokeWidth={1}
          fill="none"
        />
        {moon.history.map((pos, idx) => (
          <circle
            key={idx}
            cx={pos.x}
            cy={pos.y}
            r={5}
            stroke={colors.moonAccent}
            strokeWidth={1}
            fill="none"
          />
        ))}
      </g>
    );
  }

  renderPlacer(placer) {
    return (
      <circle
        cx={placer.center.x}
        cy={placer.center.y}
        r={placer.radius}
        stroke={colors.planetAccent}
        strokeWidth={1}
        fill="none"
      />
    );
  }

  renderLauncher(launcher) {
    return (
      <line
        x1={launcher.start.x}
        y1={launcher.start.y}
        x2={launcher.tip.x}
        y2={launcher.tip.y}
        stroke={colors.moonAccent}
        strokeWidth={1}
      />
    );
  }

  render() {
    const { planetList, moonList, placer, launcher } = this.props;

    return (
      <svg
        ref={(svg) => this.svg = svg}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        height="100%"
        width="100%"
      >
        {planetList.map(this.renderPlanet)}
        {moonList.map(this.renderMoon)}
        {placer && this.renderPlacer(placer)}
        {launcher && this.renderLauncher(launcher)}
      </svg>
    );
  }
}

const mapStateToProps = ({
  gravity: {
    planets,
    moons,
    mode,
    placer,
    launcher,
    speed,
  },
}) => {
  return {
    planetList: unHash(planets),
    moonList: unHash(moons),
    mode: mode ? 'moon' : 'planet',
    placer,
    launcher,
    speed,
  };
};

const mapDispatchToProps = {
  startPlace,
  dragPlace,
  placePlanet,
  startLaunch,
  dragLaunch,
  launchMoon,
  advance,
  switchMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(Universe);
