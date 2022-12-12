const { Input, Test } = require('./Input');

const lines = Input.trim().split('\n');

function read() {
  const res = { start: {}, end: {}, map: [] };
  res.map = lines.map((line, y) =>
    [...line].map((value, x) => {
      switch (value) {
        case 'S': res.start = { y, x }; return 0;
        case 'E': res.end = { y, x }; return 25;
        default: return value.charCodeAt(0) - "a".charCodeAt(0);
      }
    })
  );
  return res;
}

const pointToInt = (x, y) => y * 1e3 + x;
const intToPoint = int => {
  const point = { y: 0, x: 0 };
  point.y = Math.floor(int / 1e3);
  point.x = int % 1e3;
  return point;
};

function getNeighbors(x, y, map, part) {
  const res = [];
  if (y + 1 < map.length &&
    (part === 1 && map[y + 1][x] <= map[y][x] + 1 ||
      part === 2 && map[y + 1][x] >= map[y][x] - 1)) {
    res.push(pointToInt(x, y + 1));
  }
  if (y - 1 >= 0 &&
    (part === 1 && map[y - 1][x] <= map[y][x] + 1 ||
      part === 2 && map[y - 1][x] >= map[y][x] - 1)) {
    res.push(pointToInt(x, y - 1));
  }
  if (x + 1 < map[y].length &&
    (part === 1 && map[y][x + 1] <= map[y][x] + 1 ||
      part === 2 && map[y][x + 1] >= map[y][x] - 1)) {
    res.push(pointToInt(x + 1, y));
  }
  if (x - 1 >= 0 &&
    (part === 1 && map[y][x - 1] <= map[y][x] + 1 ||
      part === 2 && map[y][x - 1] >= map[y][x] - 1)) {
    res.push(pointToInt(x - 1, y));
  }
  return res;
}

function dijkstra(part, map, start, end) {
  const dist = {};
  const prev = {};
  let queue = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const id = pointToInt(x, y);
      dist[id] = Infinity;
      queue.push(id);
    }
  }
  dist[pointToInt(start.x, start.y)] = 0;

  while (queue.length) {
    queue.sort((a, b) => dist[a] - dist[b]);
    const u = queue.shift();

    if (part === 1 && u === pointToInt(end.x, end.y)) {
      break;
    }
    const point = intToPoint(u);
    if (part === 2 && map[point.y][point.x] === 0) {
      return dist[u];
    }
    queue = queue.filter((x) => x !== u);

    const neighbors = getNeighbors(point.x, point.y, map, part)
    for (const v of neighbors) {
      if (queue.includes(v)) {
        const alt = dist[u] + 1;
        if (alt < dist[v]) {
          dist[v] = alt;
          prev[v] = u;
        }
      }
    }
  }
  if (part === 1) return dist;
}

function solver(part) {
  const input = read();
  let distance;
  if (part === 1) {
    const data = dijkstra(part, input.map, input.start, input.end);
    distance = data[pointToInt(input.end.x, input.end.y)];
  } else {
    distance = dijkstra(part, input.map, input.end);
  }
  console.log(distance);
}

solver(1); //part1
solver(2); //part2