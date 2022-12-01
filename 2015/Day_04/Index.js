const { Input } = require('./Input');
const md5 = require('../../node_modules/md5/md5');

function findHash(inp) {
  let beginnings = ['00000', '000000'];
  let ans = [];
  beginnings.forEach(b => {
    for (let num = 1; ; num++) {
      let hash = md5(inp + num);
      if (hash.substr(0, b.length) === b) {
        ans.push(b.length + ' Zero Hash: ', hash, 'Num: ', num);
        break;
      }
    }
  })
  ans.map(s => console.log(s));
}

findHash(Input);