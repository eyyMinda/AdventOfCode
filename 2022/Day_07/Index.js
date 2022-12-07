const { Input, Test } = require('./Input');

const sum = arr => arr.reduce((a, b) => a + b, 0);

console.log(run(Input));

function read(inp) {
  const dirs = {};
  const cwd = [];
  let current = '';
  const lines = inp.trim().split('\n');
  for (const line of lines) {
    const parts = line.split(' ');
    if (parts[0] === '$' && parts[1] === 'cd') {
      if (parts[2] === '..') {
        cwd.pop();
      } else {
        //push dir to cwd
        cwd.push(parts[2]);
        current = cwd.join('/');
        dirs[current] = dirs[current] || 0;
      }
    } else if (parseInt(parts[0])) {
      for (const index in cwd) {
        dirs[cwd.slice(0, parseInt(index) + 1).join('/')] += parseInt(line);
      }
    }
  }
  return dirs;
}

function run(inp) {
  const dirs = read(inp);;

  const sum = findSumOf100k(dirs); //part 1 (1427048)
  const dirToDelete = findSmallest(dirs); //part 2 (2940614)
  return [sum, dirToDelete];
};

function findSumOf100k(dirs) {
  const over100k = Object.keys(dirs).filter((x) => dirs[x] <= 100000);
  const arr = over100k.map((x) => dirs[x]);
  return sum(arr);
}

function findSmallest(dirs) {
  const fs = 70000000;
  const needed = 30000000;
  const totalUsed = dirs["/"];
  const needToDelete = needed - (fs - totalUsed);
  let candidates = [];

  for (const cand of Object.keys(dirs)) {
    if (dirs[cand] > needToDelete) {
      candidates.push(dirs[cand]);
    }
  }
  return candidates.sort((a, b) => a - b)[0];
}