const { Input, Test } = require('./Input');

function someFunction(inp) {
  const init = inp.split('\n')
  let abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const score = {};
  for (let i = 0; i < abc.length; i++) { score[abc[i]] = i + 1; }
  //---------
  let sum = [0, 0];
  let shared = ['', ''];
  //---------

  for (let i = 0; i < init.length; i++) {
    const sack = init[i];
    const centerInd = sack.length / 2;
    const first = sack.slice(0, centerInd).split('');
    second = sack.slice(centerInd).split('');
    shared[0] = second.filter(item => first.includes(item))[0];
    const curr = score[shared[0]];
    sum[0] += curr;
  }

  //--------Part2--------
  const groups = init.map((elv, idx) => {
    const temp = [elv, init[idx + 1], init[idx + 2]];
    init.splice(idx + 1, 2);
    return temp;
  }).filter(Boolean)
  for (let group of groups) {
    const [first, second, third] = group;
    const [firstItems, secondItems, thirdItems] = [first.split(''), second.split(''), third.split('')];
    shared[1] = thirdItems.filter(item => secondItems.includes(item) && firstItems.includes(item))[0];
    const curr = score[shared[1]];
    sum[1] += curr;
  }

  console.log('Part1: ', sum[0], '; Part2: ', sum[1]);
}

someFunction(Input);