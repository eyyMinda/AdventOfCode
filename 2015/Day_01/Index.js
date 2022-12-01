const { Input } = require('./Input');

function someFunction(inp) {
  let floor = 0;
  let basementChecked = [false, 0];
  for (let i = 0; i < inp.length; i++) {
    switch (inp[i]) {
      case '(': floor++; break;
      case ')': floor--; break;
    }
    if (!basementChecked[0] && floor === -1) basementChecked = [true, i + 1];
  }
  console.log('floor: ', floor);
  console.log('basement first time: ', basementChecked[1]);
}

someFunction(Input);