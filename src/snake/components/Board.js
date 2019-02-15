import React, { Component } from 'react';

import { initialCellSize } from '../constants';

class Board extends Component {
  square(cell, idx, color) {
    return (
      <rect
        key={idx}
        x={cell.x * initialCellSize}
        y={cell.y * initialCellSize}
        height={initialCellSize}
        width={initialCellSize}
        fill={color}
      />
    );
  }

  render() {
    const { game } = this.props;
    return (
      <svg
        height="100%"
        width="100%"
      >
        {game.walls.map((wall, idx) => this.square(wall, idx, 'red'))}
        {game.snake.cells.map((cell, idx) => this.square(cell, idx, 'green'))}
      </svg>
    );
  }
};

export default Board;
