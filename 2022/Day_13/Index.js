const { Input, Test } = require('./Input');
const lines = Input.trim().split('\n\n')
  .map(line => line.split('\n').map(line => JSON.parse(line)));

function compare(a, b) {
  if (!Array.isArray(a) && !Array.isArray(b)) return a - b;
  if (Array.isArray(a) && Array.isArray(b)) {
    const length = a.length < b.length ? a.length : b.length;
    for (let i = 0; i < length; i++) {
      const x = compare(a[i], b[i]);
      if (x !== 0) return x;
    }
    return a.length - b.length;
  }
  if (!Array.isArray(a)) return compare([a], b);
  if (!Array.isArray(b)) return compare(a, [b]);
}

function part1() {
  return lines.map((line, i) => {
    const isOrder = compare(line[0], line[1]) < 0;
    return [isOrder, i + 1];
  })
    .filter(el => el[0])
    .reduce((sum, el) => sum + el[1], 0);
}

function part2() {
  return lines
    .concat([[[[2]], [[6]]]])
    .flat()
    .sort(compare)
    .map((el, i) => [el, i + 1])
    .filter(el => JSON.stringify(el[0]) === '[[2]]' || JSON.stringify(el[0]) === '[[6]]')
    .reduce((sum, el) => sum * el[1], 1);
}

console.log(part1()); //6484
console.log(part2()); //19305