import React, { Component } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';

import Board from './Board';

import {
  startGame,
  turnSnake,
  advance,
} from '../actions';
import { initialCellSize } from '../constants';

import './Game.css';

const directions = {
  37: 'x-',
  38: 'y-',
  39: 'x+',
  40: 'y+',
  65: 'x-',
  68: 'x+',
  83: 'y+',
  87: 'y-',
};

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0' };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTick = this.handleTick.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.removeEventListener('keydown', this.handleKeyDown);
    clearInterval(this.interval);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleTick() {
    const { game, advance } = this.props;
    if (!game.gameOver) advance();
  }

  handleStart() {
    const sideLength = Math.min(this.state.width, this.state.height);
    const gameWidth = Math.floor(sideLength / initialCellSize) - 1;
    this.props.startGame(gameWidth);
    this.interval = setInterval(this.handleTick, 250);
  }

  handleKeyDown(e) {
    const { game, turnSnake } = this.props;
    if (!game) return;
    const direction = directions[e.keyCode];
    if (direction) turnSnake(direction);
  }

  render() {
    const { game } = this.props;
    return (
      <div>
        {game && !game.gameOver ?
          <div
            style={{
              width: `${game.width * initialCellSize}px`,
              height: `${game.width * initialCellSize}px`,
              backgroundColor: 'black',
            }}
          >
            <Board game={game} />
          </div> :
          <RaisedButton
            label="Start Game!"
            primary
            onTouchTap={this.handleStart}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ snake: { game } }) => ({ game });

const mapDispatchToProps = { startGame, turnSnake, advance };

export default connect(mapStateToProps, mapDispatchToProps)(Game);
