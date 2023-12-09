const { Input, Test } = require('./Input');
let part2;

const processInput = (input) => {
  const values = input.trim().split('\n')

  return values;
}

function solution(input) {
  const values = processInput(input);
  return values;
}

const res = {
  Test: solution(Test),
  Part1: solution(Input),
  Test2: part2 = true && solution(Test),
  Part2: part2 = true && solution(Input)
}

console.table(res);