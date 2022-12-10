const { Input, Test } = require('./Input');
const { range, rangeFill1 } = require('../../utils/read');

const lines = Input.trim().split('\n').map((line) => {
  const [cmd, num] = line.split(' ');
  return { cmd, num: Number(num) };
});;

//part 1
let interesting = [20, 60, 100, 140, 180, 220];
let X = 1, cycle = 0, ans = 0;

function part1() {
  for (let line of lines) {
    if (line.cmd === 'noop') {
      cycle += 1;
      if (interesting.includes(cycle)) ans += cycle * X;
    } else if (line.cmd === 'addx') {
      let x = line.num;
      X += x;
      cycle += 1;
      if (interesting.includes(cycle)) ans += cycle * (X - x);
      cycle += 1;
      if (interesting.includes(cycle)) ans += cycle * (X - x);
    }
  }
  console.log(ans)
}

//part 2
let currX = 1, op = 0, ans2 = 0;
let row = 0, col = 0, track = rangeFill1(241);

function part2() {
  for (let line of lines) {
    if (line.cmd === 'noop') {
      op += 1;
      track[op] = currX;
    } else if (line.cmd === 'addx') {
      track[op + 1] = currX;
      currX += line.num;

      op += 2;
      track[op] = currX;
    }
  }

  ans2 = [range(40), range(40), range(40), range(40), range(40), range(40)]
  for (col of range(40)) {
    for (row of range(6)) {
      let counter = row * 40 + col + 1;
      if (Math.abs(track[counter - 1] - col) <= 1) {
        ans2[row][col] = '#';
      } else { ans2[row][col] = ' ' }
    }
  }
  ans2.forEach((line) => console.log(line.join('')));
}

part1();
part2();