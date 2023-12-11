const { Input, Test, Test2, Test3 } = require('./Input');
let part2;

const directions = {
  '|': (x, y, fromWhere) => [x, y + (fromWhere ? 1 : -1)],
  '-': (x, y, fromWhere) => [x + (fromWhere ? 1 : -1), y],
  'L': (x, y, fromWhere) => (fromWhere ? [x + 1, y - 1] : [x - 1, y + 1]),
  'J': (x, y, fromWhere) => (fromWhere ? [x + 1, y + 1] : [x - 1, y - 1]),
  '7': (x, y, fromWhere) => (fromWhere ? [x + 1, y - 1] : [x - 1, y + 1]),
  'F': (x, y, fromWhere) => (fromWhere ? [x - 1, y + 1] : [x + 1, y - 1]),
};

function exploreMap(map, start) {
  const visited = new Set();
  const distances = {};

  function getInitialDirection(x, y) {
    const adjacentTiles = [
      [x, y + 1],
      [x + 1, y],
      [x, y - 1],
      [x - 1, y],
    ];

    for (const [newX, newY] of adjacentTiles) {
      if (map[newX] && map[newX][newY] && map[newX][newY] !== '.') {
        return directions[map[newX][newY]];
      }
    }

    return directions['|'];
  }

  function dfs(x, y, distance) {
    const key = `${x},${y}`;

    if (visited.has(key) || !map[x] || !map[x][y]) {
      return;
    }

    visited.add(key);
    distances[key] = distance;

    const pipeType = map[x][y];
    const moveFunction = directions[pipeType];

    if (moveFunction) {
      const [newX, newY] = moveFunction(x, y, pipeType === '|');
      dfs(newX, newY, distance + 1);
    }
  }

  const [startX, startY] = start;
  const initialDirection = getInitialDirection(startX, startY);

  const [initialX, initialY] = initialDirection(startX, startY, true);
  dfs(initialX, initialY, 0);

  return distances;
}

const processInput = (input) => {
  const values = input.trim().split('\n').map(l => l.split(''));
  return values;
}

function solution(input, start = [1, 1]) {
  const values = processInput(input);
  console.log(values)
  const distances = exploreMap(values, start);
  console.log(distances);
  return distances;
}

performance.mark("start")
const res = {
  Test: solution(Test, [1, 1]),
  Test2: solution(Test2, [2, 0]),
  // Part1: solution(Input),
  // Test2: part2 = true && solution(Test),
  // Part2: part2 = true && solution(Input)
}
performance.mark("end")
res.Performance = performance.measure("perf", "start", "end").duration + "ms";
// console.table(res);
// console.log(res);