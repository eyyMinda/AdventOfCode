const { Input, Test } = require('./Input');

const moves = Input.trim().split('\n').map(line => {
  let [dir, num] = line.split(' ');
  return { dir, num: parseInt(num) };
});

let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };
let body = new Array(10).fill(0).map(_ => ({ x: 0, y: 0 }));
let dir = { L: { x: -1, y: 0 }, R: { x: 1, y: 0 }, U: { x: 0, y: -1 }, D: { x: 0, y: 1 } }

let positions = new Set(['0,0']); //part1
let positions2 = new Set(['0,0']); //part2

moves.forEach(move => {
  for (let step = 0; step < move.num; step++) {
    head.x += dir[move.dir].x;
    head.y += dir[move.dir].y;
    body[0].x += dir[move.dir].x;
    body[0].y += dir[move.dir].y;
    // Part 1
    let distX = head.x - tail.x;
    let distY = head.y - tail.y;

    if (Math.abs(distX) >= 2) {
      tail.x += Math.sign(distX);
      if (Math.abs(distY) != 0) tail.y += Math.sign(distY);
    } else if (Math.abs(distY) >= 2) {
      tail.y += Math.sign(distY);
      if (Math.abs(distX) != 0) tail.x += Math.sign(distX);
    }
    // Part 2
    for (let i = 1; i < body.length; i++) {
      let distX = body[i - 1].x - body[i].x;
      let distY = body[i - 1].y - body[i].y;

      if (Math.abs(distX) >= 2) {
        body[i].x += Math.sign(distX);
        if (Math.abs(distY) != 0) body[i].y += Math.sign(distY);
      } else if (Math.abs(distY) >= 2) {
        body[i].y += Math.sign(distY);
        if (Math.abs(distX) != 0) body[i].x += Math.sign(distX);
      }
    }
    positions.add(`${tail.x},${tail.y}`);
    positions2.add(`${body[body.length - 1].x},${body[body.length - 1].y}`);
  }
})

console.log('part 1: ', positions.size, 'part 2: ', positions2.size);