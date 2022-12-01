const { Input } = require('./Input');

function getMostCalories(inp) {
  const initial = inp.split('\n');
  let elfs = [];
  let calories = 0;
  for (let i = 0; i < initial.length; i++) {
    if (initial[i] != '') calories += parseInt(initial[i]);
    if (initial[i] === '') {
      elfs.push(calories);
      calories = 0;
    }
  }
  elfs.sort((a, b) => b - a);
  const topOne = elfs.slice(0, 1)[0];
  const sumOfTopThree = elfs.slice(0, 3).reduce((a, b) => a + b);
  console.log('Most calories: ', topOne);
  console.log('SumOfTopThree: ', sumOfTopThree);
}

getMostCalories(Input);