const { dayOneInput } = require('./Task_1_Input');

function getMostCalories(inp) {
  const initial = inp.split('\n');
  let calories = 0, mostCalories = 0;
  for (let i = 0; i < initial.length; i++) {
    if (initial[i] != '') calories += parseInt(initial[i]);
    if (initial[i] === '') {
      if (calories > mostCalories) mostCalories = calories;
      calories = 0;
    }
  }
  console.log(mostCalories);
  return mostCalories;
}

getMostCalories(dayOneInput);