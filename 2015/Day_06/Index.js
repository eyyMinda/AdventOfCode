const { Input, Test } = require('./Input');
const data = read(Input);
const grid = [];

function run(inp, part) {
  initGrid();
  const [instructions, values] = inp;

  for (let i = 0; i < instructions.length; i++) {
    let a = values[i][0].x
    let b = values[i][0].y
    let c = values[i][1].x
    let d = values[i][1].y
    const action = instructions[i];
    lights(part, action, a, b, c, d);
  }
  if (part === 1) {
    let turnedOn = grid.flat().filter(val => val === true).length
    console.log(turnedOn);
  } else {
    let brightness = grid.flat().reduce((a, b) => a + b);
    console.log(brightness);
  }
}

run(data, 1); //1 for part1
run(data, 2); //2 for part2

function read(inp) {
  let instructions = [];
  let values = [];
  inp.trim().split('\n')
    .forEach((line, i) => {
      const parts = line.split(' ')
      const instruction = parts.length == 5 ? parts[1] : parts[0];
      instructions.push(instruction);
      let obj, from, to;
      if (parts.length === 5) {
        let [xinit, yinit, x, y] = (parts[2] + ',' + parts[4]).split(',').map(p => Number(p));
        from = { x: xinit, y: yinit };
        to = { x, y };
      } else {
        let [xinit, yinit, x, y] = (parts[1] + ',' + parts[3]).split(',').map(p => Number(p));
        from = { x: xinit, y: yinit };
        to = { x, y };
      }
      obj = [from, to];
      values.push(obj);
    });
  return [instructions, values];
}

function initGrid() {
  let rows = 1000;
  let cols = 1000;
  for (let x = 0; x < rows; x++) {
    grid[x] = Array(cols).fill(false);
  }
}

function lights(part, action, a, b, c, d) {
  let rowsStart = a;
  let rowsEnd = c;
  let colsStart = b;
  let colsEnd = d;

  for (let x = rowsStart; x <= rowsEnd; x++) {
    for (let y = colsStart; y <= colsEnd; y++) {
      if (part === 1) {
        switch (action) {
          case 'on': grid[x][y] = true; break;
          case 'off': grid[x][y] = false; break;
          case 'toggle': grid[x][y] = !grid[x][y]; break;
        }
      } else {
        switch (action) {
          case 'on': grid[x][y]++; break;
          case 'off': grid[x][y]--; break;
          case 'toggle': grid[x][y] += 2; break;
        }
      }
    }
  }
}