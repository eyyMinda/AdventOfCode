const { Input, Test } = require('./Input');

const grid = Input.split('\n').map(row => row.split(''));
const symbols = new Set(['$', '*', '/', '-', '#', '@', '&', '%', '=', '+']);

const adjacentOffsets = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
];

function findWholeNumber(y, x) {
  let number = '';
  let left = x;
  while (left >= 0 && !isNaN(grid[y][left]) && grid[y][left] !== '.') {
    number = grid[y][left] + number;
    left--;
  }
  let right = x + 1;
  while (right < grid[y].length && !isNaN(grid[y][right]) && grid[y][right] !== '.') {
    number += grid[y][right];
    right++;
  }
  return { number, index: left + 1 };
}

function findIntegers(y, x, adjacentOffsets) {
  const foundIntegers = [];
  const foundIndicies = new Map();

  for (const offset of adjacentOffsets) {
    const newY = y + offset[0];
    const newX = x + offset[1];

    if (
      newY >= 0 &&
      newY < grid.length &&
      newX >= 0 &&
      newX < grid[newY].length &&
      !isNaN(grid[newY][newX]) &&
      grid[newY][newX] !== '.'
    ) {
      const { number, index } = findWholeNumber(newY, newX);
      const key = `${newY}, ${index}`;

      if (!foundIndicies.has(key)) {
        foundIntegers.push(number);
        foundIndicies.set(key, true);
      }
    }
  }

  return foundIntegers;
}

function sumIntegersAdjacentToSymbols(part) {
  const foundIntegers = [];
  const foundIndicies = new Map(); // Declare foundIndicies here

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if ((part === 1 && !isNaN(grid[y][x]) && grid[y][x] !== '.') || (part === 2 && symbols.has(grid[y][x]))) {
        const adjacentNumbers = findIntegers(y, x, adjacentOffsets, foundIndicies);

        if (part === 1 && adjacentNumbers.length > 0) {
          const { number, index } = findWholeNumber(y, x);
          const key = `${y}, ${index}`;
          if (!foundIndicies.has(key)) {
            foundIntegers.push(Number(number));
            foundIndicies.set(key, true);
          }
        } else if (part === 2 && adjacentNumbers.length >= 2) {
          for (let i = 0; i < adjacentNumbers.length; i++) {
            for (let j = i + 1; j < adjacentNumbers.length; j++) {
              foundIntegers.push(Number(adjacentNumbers[i]) * Number(adjacentNumbers[j]));
            }
          }
        }
      }
    }
  }

  return foundIntegers.reduce((sum, num) => sum + num, 0);
}


console.log(sumIntegersAdjacentToSymbols(1)); // Part 1
console.log(sumIntegersAdjacentToSymbols(2)); // Part 2
