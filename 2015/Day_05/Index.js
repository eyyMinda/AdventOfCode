const { Input, Test } = require('./Input');

const testString = Test.trim().split('\n');
const strings = Input.trim().split('\n');
const vowels = ['a', 'e', 'i', 'o', 'u'];
const donts = ['ab', 'cd', 'pq', 'xy'];

function hasNonOverlappingPair(s) {
  for (let i = 0; i < s.length - 1; i++) {
    let pair = s.substring(i, i + 2);
    if (s.indexOf(pair, i + 2) !== -1) {
      return true;
    }
  }
  return false;
}

function part1(inp) {
  let nice = 0;
  for (let i = 0; i < inp.length; i++) {
    let str = inp[i].split('');
    let vCount = 0, dupCount = 0, included = false;

    str.map((l, i) => {
      l === str[i + 1] ? dupCount++ : null;
      vowels.includes(l) ? vCount++ : null;
    });

    if (vCount > 2 && dupCount) {
      donts.map(d => str.join('').includes(d) ? included = true : null);
      if (!included) { nice++; }
    }
  }
  console.log(nice);
}

function part2(inp) {
  let nice = 0;
  for (let str of inp) {
    let strArr = str.split('');
    let dupCount = 0;

    strArr.map((l, i) => {
      l === strArr[i + 2] ? dupCount++ : null;
    });

    if (dupCount) hasNonOverlappingPair(str) ? nice++ : null;
  }
  console.log(nice);
}

part2(testString);
part1(strings);
part2(strings);