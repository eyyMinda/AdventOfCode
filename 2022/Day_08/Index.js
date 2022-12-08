const { Input, Test } = require('./Input');

const grid = Input
  .split('\n').map((line) => line.split('').map(Number))
  .map((row, y, grid) =>
    row.map((tree, x) => {
      const edge = x === 0 || y === 0 || x === row.length - 1 || y === grid.length - 1;
      const value = tree;
      return { edge, value };
    })
  );

function getEdges(x, y) {
  const top = grid.slice(0, y).map((row) => row[x].value).reverse();
  const right = grid[y].slice(x + 1, grid[y].length).map((value) => value.value);
  const bottom = grid.slice(y + 1, grid.length).map((row) => row[x].value);
  const left = grid[y].slice(0, x).map((value) => value.value).reverse();

  return { top, right, bottom, left };
}

function countVisible() {
  return grid.reduce((visible, row, y) => {
    row.forEach((tree, x) => {
      if (tree.edge) { visible += 1; return; }

      const edges = getEdges(x, y);
      for (let direction of ['top', 'right', 'bottom', 'left']) {
        const edgeTrees = edges[direction];

        if (edgeTrees.every((edge) => tree.value > edge)) {
          visible += 1;
          break;
        }
      }
    });
    return visible;
  }, 0);
}

function getScenicView() {
  return grid.reduce((memo, row, y) => {
    const scores = row.map((tree, x) => {
      if (tree.edge) return 0;
      const edges = getEdges(x, y);
      const trees = [];

      for (let direction of ['top', 'right', 'bottom', 'left']) {
        const edgeTrees = (() => {
          let count = 0;
          for (const edgeTree of edges[direction]) {
            count++;
            if (edgeTree >= tree.value) break;
          }
          return count;
        })();
        trees.push(edgeTrees);
      }
      return trees.reduce((a, b) => a * b, 1);
    });
    return Math.max(...scores, memo);
  }, 0);
}

console.log(countVisible()); //part 1: 1736
console.log(getScenicView()); //part 2: 268800
