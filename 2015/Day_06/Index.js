const { Input } = require('./Input');

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

const grid = [];
const data = read(Input);

function initGrid() {
  let rows = 1000;
  let cols = 1000;
  for (let x = 0; x < rows; x++) {
    grid[x] = Array(cols).fill(false);
  }
}

function part1(inp) {
  initGrid();
  const [instructions, values] = inp;

  for (let i = 0; i < instructions.length; i++) {
    const step = values[i];
    let a = step[0].x
    let b = step[0].y
    let c = step[1].x
    let d = step[1].y
    const action = instructions[i];
    lights(action, a, b, c, d);
  }

  let turnedOn = grid.flat().filter(val => val === true).length
  return console.log(turnedOn);
}


function lights(action, a, b, c, d) {
  let rowsStart = a;
  let rowsEnd = c;
  let colsStart = b;
  let colsEnd = d;

  for (let x = rowsStart; x <= rowsEnd; x++) {
    for (let y = colsStart; y <= colsEnd; y++) {
      switch (action) {
        case 'on': grid[x][y] = true;
        case 'off': grid[x][y] = false;
        case 'toggle': grid[x][y] = !grid[x][y];
      }
    }
  }
}



function part2(inp) {

}
part1(data);
part2(data);

//if one func
// solution(Test, 1);
// solution(Input, 1);
// solution(Input, 2);