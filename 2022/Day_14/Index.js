const { Input, Test } = require('./Input');

const lines = Input.trim().split('\n').map((l) => l.split(' -> ')
  .map(c => c.split(',').map(Number)));


const maxX = Math.max(...lines.flat().map((coords) => coords[0])) + 1;
const minX = Math.min(...lines.flat().map((coords) => coords[0])) - 1;
const maxY = Math.max(...lines.flat().map((coords) => coords[1]));
const startX = 500 - minX;

const generateCave = () => {
  const cave = Array.from({ length: maxY + 1 }, () => new Uint8Array(maxX - minX + 1));

  lines.forEach(points =>
    points.forEach(([px, py], index) => {
      if (!index) {
        cave[py][px - minX] = 1;
        return;
      }
      let [ix, iy] = points[index - 1];
      const dx = Math.sign(px - ix);
      const dy = Math.sign(py - iy);
      while (px !== ix || py !== iy) {
        ix += dx;
        iy += dy;
        cave[iy][ix - minX] = 1;
      }
    })
  );
  return cave;
}

function* getSand(cave, startX) {
  let x = startX;
  let y = 0;
  let c = 0;
  while (y < cave.length - 1 && cave[y][x] === 0) {
    if (cave[y + 1][x]) {
      if (cave[y + 1][x - 1] === 0) x--;
      else if (cave[y + 1][x + 1] === 0) x++;
      else {
        cave[y][x] = 2;
        c++;
        yield [y, x];
        x = startX;
        y = 0;
        continue;
      }
    }
    y++;
  }
}

function part1() {
  console.log([...getSand(generateCave(), startX)].length);
}
function part2() {
  const cave = generateCave();
  const offset = cave.length - startX;
  const rowSize = cave.length * 2 + 1;
  const extendedCave = [
    ...cave.map(row => {
      const newRow = new Uint8Array(rowSize);
      newRow.set(row, offset);
      return newRow;
    }),
    new Uint8Array(rowSize),
    new Uint8Array(rowSize).fill(1)
  ];
  console.log([...getSand(extendedCave, offset + startX)].length);
}

part1(); // 825
part2(); // 26729