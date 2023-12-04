const { Input, Test } = require('./Input');

const lines = Input.trim().split('\n');

const Cards = lines.map(line => {
  let [cardID, nums] = line.split(': ');
  cardID = +(cardID.split('Card ')[1]);
  const [winString, mineString] = nums.split(' | ');
  const stringToArrayOfNum = str => (str.split(' ')).map(n => +n);
  return { cardID, win: stringToArrayOfNum(winString), mine: stringToArrayOfNum(mineString), copies: 0 };
})


function main(part) {
  const part1 = part === 1;
  let total = 0;
  let instances = 0;

  for (let i = 0; i < Cards.length; i++) {

    let { cardID, win, mine, copies } = Cards[i];
    // ========= Check How many Won ============
    const winningNums = mine.map(n => win.includes(n) && n).filter(Boolean);
    const len = winningNums.length;
    // ========= Assign copies based on how many won ============
    let points = 1;
    if (part1) {
      if (len > 1) {
        for (let i = 0; i < len - 1; i++) {
          points = points * 2;
        }
      }
      total += points;
    } else {

      if (len > 0) {
        for (let c = i + 1; c <= i + len; c++) {
          Cards[c].copies += copies ? copies + 1 : 1;
        }
      }
      const instance = 1 + copies
      instances += instance;
    }
  }

  return part === 1 ? total : instances;
}

console.log(main(1));
console.log(main(2));