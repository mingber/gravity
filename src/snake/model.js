export class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getAdj = direction => {
    if (direction === 'x+') return new Cell(this.x + 1, this.y);
    if (direction === 'x-') return new Cell(this.x - 1, this.y);
    if (direction === 'y+') return new Cell(this.x, this.y + 1);
    if (direction === 'y-') return new Cell(this.x, this.y - 1);
  }

  equals = cell => this.x === cell.x && this.y === cell.y
}

export class Snake {
  constructor(cells = [new Cell(0, 0)], direction = 'x+') {
    this.cells = cells;
    this.direction = direction;
    this.isGrowing = true;
  }

  length = () => this.cells.length

  turn = direction => {
    if (direction[0] !== this.direction[0]) {
      this.direction = direction;
    }
    return this;
  }

  advance = () => {
    const head = this.cells[0];
    this.cells.unshift(head.getAdj(this.direction));
    if (!this.isGrowing) this.cells.pop();
    return this;
  }
}

export class Game {
  constructor(width, snake, walls, gameOver) {
    this.width = width;
    this.walls = walls || this.constructWalls(width);
    this.gameOver = gameOver;
    if (snake) this.snake = snake;
    else {
      const halfWidth = Math.floor(width / 2);
      const center = new Cell(halfWidth, halfWidth);
      this.snake = new Snake([center]);
    }
  }

  constructWalls = width => {
    const walls = [];
    for (let i = 0; i < width; i++) {
      walls.push(new Cell(i, 0));
    }
    for (let i = 1; i < width; i++) {
      walls.push(new Cell(width - 1, i));
    }
    for (let i = width - 2; i > -1; i--) {
      walls.push(new Cell(i, width - 1));
    }
    for (let i = width - 2; i > 0; i--) {
      walls.push(new Cell(0, i));
    }
    return walls;
  }

  isColliding = () => {
    const head = this.snake.cells[0];
    return this.walls.some(wall => wall.equals(head));
  }

  advance = () => {
    this.snake = this.snake.advance();
    this.gameOver = this.isColliding();
    return new Game(this.width, this.snake, this.walls, this.gameOver);
  }
}