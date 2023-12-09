const { Input, Test } = require('./Input');
let part2 = false;

const getDifferenceBetweenArrayElements = arr => {
  let result = [];
  for (let i = 1; i < arr.length; i++) {
    result.push(arr[i] - arr[i - 1]);
  }
  return result;
}

const allEqual = arr => arr.every(v => v === arr[0]);

const extrapolateNextValue = (sequence) => {
  const diffSequence = getDifferenceBetweenArrayElements(sequence);
  const lastNum = sequence[sequence.length - 1];

  if (allEqual(diffSequence)) {
    return lastNum + diffSequence[0];
  } else {
    const nextValue = extrapolateNextValue(diffSequence);
    return lastNum + nextValue;
  }
}

const extrapolateValues = values => {
  const resultValues = [];
  for (let value of values) {
    value = value.map(n => +n);
    const newValue = extrapolateNextValue(part2 ? value.reverse() : value);
    resultValues.push(newValue);
  }
  return resultValues.reduce((a, b) => a + b);
}

const processInput = (input) => {
  const values = input.trim().split('\n').map(line => line.split(' '));
  return values;
}

const solution = input => {
  const values = processInput(input);
  const results = extrapolateValues(values);
  return results;
}

performance.mark("start")
const res = {
  Test: solution(Test),
  Part1: solution(Input),
  Test2: (part2 = true) && solution(Test),
  Part2: part2 = true && solution(Input),
}
performance.mark("end")
res.Performance = performance.measure("perf", "start", "end").duration + "ms";
console.table(res);

