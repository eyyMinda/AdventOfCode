const { Input } = require('./Input');

const readInput = input => {
  const init = [], moves = [];

  let numbersLine;
  input.split('\n').forEach((next, line) => {
    if (numbersLine == null) {
      if (next.slice(1, 2) === '1') { // Numbers Line
        numbersLine = line;
      } else { // Crate seperation
        for (let j = 0; j <= next.length; j += 4) {
          const crate = next[(j, j + 1)];
          const k = j / 4;
          (init[k] = init[k] || []).unshift(crate);
        }
      }
      // Moves input
    } else if (next && line > numbersLine + 1) {
      const parts = next.split(' ');
      moves.push([Number(parts[1]), Number(parts[3]), Number(parts[5])]);
    }
  }, []);
  return [init.map(xs => xs.filter(x => x !== ' ')), moves];
}

const part1 = input => {
  const parsed = readInput(input);
  const [init, moves] = parsed;
  const state = init;

  for (let i = 0; i < moves.length; i++) {
    const [count, from, to] = moves[i];
    for (let j = 0; j < count; j++) {
      const crate = state[from - 1].pop();
      state[to - 1].push(crate);
    }
  }
  return state.reduce((a, b) => a + b.pop(), '');
}
const part2 = input => {
  const parsed = readInput(input);
  const [init, moves] = parsed;
  const state = init;

  for (let i = 0; i < moves.length; i++) {
    const [count, from, to] = moves[i];
    const l = state[from - 1].length;
    const crates = state[from - 1].splice(l - count, count);
    state[to - 1].push(...crates);
  }
  return state.reduce((a, b) => a + b.pop(), '');
};


console.log(part1(Input));
console.log(part2(Input));