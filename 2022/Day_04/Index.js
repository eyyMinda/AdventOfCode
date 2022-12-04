const { Input } = require('./Input');

function optimizeCleanup(inp) {
  const pairs = inp.split('\n');
  let containsOther = 0, overlapped = 0;

  for (let pair of pairs) {
    pair = pair.split(',');
    const [left, right] = [pair[0].split('-').map(n => parseInt(n)), pair[1].split('-').map(n => parseInt(n))];

    left[0] <= right[0] && right[1] <= left[1]
      || right[0] <= left[0] && left[1] <= right[1] ?
      containsOther++ : null;
    left[0] <= right[0] && right[0] <= left[1]
      || right[0] <= left[0] && left[0] <= right[1] ?
      overlapped++ : null;
  }

  console.log('Part1: ', containsOther, '; Part2: ', overlapped);
}

optimizeCleanup(Input);