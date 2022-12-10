const path = require('path');
const fs = require('fs');

const input = dir => fs
  .readFileSync(path.join(dir, 'input.txt'), 'utf8')
  .toString()
  .trim()
  .split('\n');

const range = (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt);

const rangeFill1 = size => [...Array(size).keys()].fill([1]);


module.exports = {
  input,
  range,
  rangeFill1,
};