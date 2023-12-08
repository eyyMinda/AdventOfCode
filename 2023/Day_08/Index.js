const { Input, Test, Test2, Test3 } = require('./Input');

const RE = /(.*) = \((.*), (.*)\)/;
const parse = input => {
  const [directions, nodes] = input.split("\n\n");
  return [
    [...directions].map(v => (v === "L" ? 0 : 1)),
    new Map(
      nodes
        .split("\n")
        .map(row => RE.exec(row))
        .map(([, from, l, r]) => [from, [l, r]])
    ),
  ];
};


const walk = ([dir, nodes]) => {
  let curr = "AAA";
  let steps = 0;
  while (curr !== "ZZZ")
    curr = nodes.get(curr)[dir[steps++ % dir.length]];
  return steps;
};

const walkNodes = ([dir, nodes]) =>
  [...nodes]
    .filter(([n]) => n.endsWith("A"))
    .map(([curr]) => {
      let steps = 0;
      while (!curr.endsWith("Z"))
        curr = nodes.get(curr)[dir[steps++ % dir.length]];
      return steps;
    });

const gcd = (a, b) => a ? gcd(b % a, a) : b;
const lcm = (a, b) => a * b / gcd(a, b);
const llcm = arr => arr.reduce((acc, v) => lcm(acc, v));

const input = parse(Input);

// Part 1
const p1 = walk(input);
console.log(p1)
// Part 2
const p2 = walkNodes(input);
console.log(llcm(p2))