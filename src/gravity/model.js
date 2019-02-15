export class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add = v => new Vector(this.x + v.x, this.y + v.y)
  subtract = v => new Vector(this.x - v.x, this.y - v.y)
  scale = a => new Vector(a * this.x, a * this.y)
  magnitude = (exp = 1) => (this.x ** 2 + this.y ** 2) ** (exp / 2)
}

let planetId = 0;
let moonId = 0;

export class Planet {
  constructor (center, radius, id) {
    this.id = id || ++planetId;
    this.center = center;
    this.radius = radius;
  }

  resize = r => new Planet(this.center, r, this.id)
  move = v => new Planet(this.center.add(v), this.radius, this.id)
  mass = (exp = 3) => this.radius ** exp
  getAcc = (G, pos, exp = 3) => {
    const r = this.center.subtract(pos);
    if (r.magnitude() > this.radius) {
      return r.scale(G * this.mass() / r.magnitude(exp));
    }
    return r.scale(G * this.mass() / this.radius ** exp);
  }
}

export class Moon {
  constructor (pos, vel, history, id) {
    this.id = id || ++moonId;
    this.pos = pos;
    this.vel = vel;
    this.history = history || [];
  }

  advance = (acc) => {
    const vel = this.vel.add(acc);
    this.history.push(this.pos);
    if (this.history.length > 100) this.history.shift();
    const pos = this.pos.add(vel);
    return new Moon(pos, vel, this.history, this.id);
  }
}
