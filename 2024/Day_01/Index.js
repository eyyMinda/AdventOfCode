const { Input, Test } = require('./Input');

const testList = makeLists(Test);
const list = makeLists(Input);

function makeLists(inputs) {
  return inputs
    .split("\n")
    .map((line) => line.split("   "))
    .reduce(
      (acc, [a, b]) => {
        acc.a.push(Number(a));
        acc.b.push(Number(b));
        return acc;
      },
      { a: [], b: [] }
    );
}

function part1(list) {
  const { a, b } = list;
  a.sort((x, y) => x - y);
  b.sort((x, y) => x - y);

  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff += Math.abs(a[i] - b[i]);
  }

  return diff;
}

function part2(list) {
  const { a, b } = list;
  const frequency = Object.groupBy(b, (val) => val);

  return a.reduce(
    (sum, val) => (sum += val * (frequency[val]?.length ?? 0)),
    0
  );
}

console.log({
  part1: part1(list),
  part2: part2(list),
});