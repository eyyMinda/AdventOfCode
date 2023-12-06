const { Input, Test } = require('./Input');

const lines = Input.trim().split('\n');

const read = (str) => str.split(' ').filter(Boolean).filter(Number).map(n => +n);
const read2 = (str) => [+(str.split(' ').filter(Boolean).filter(Number).join(''))];


function solution(part) {
  let res = 1;

  const readFunc = part === 1 ? read : read2;
  const [time, distance] = [readFunc(lines[0]), readFunc(lines[1])];
  const arr = time.map((time, i) => ({ currTime: time, targetDist: distance[i] }));


  for (let i = 0; i < arr.length; i++) {
    let raceBeat = 0;
    const { currTime, targetDist } = arr[i];
    for (let ms = 1; ms < currTime; ms++) {
      raceBeat += ms * (currTime - ms) > targetDist ? 1 : 0;
    }

    res *= raceBeat;
  }

  return res;
}


console.log(solution(1));
console.log(solution(2));
