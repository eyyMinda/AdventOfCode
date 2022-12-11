const { Input, Test } = require('./Input');

const lines = Input.trim().split('\n');

const monkeys = [];
let monkey = {};
for (let line of lines) {
  if (line.startsWith('Monkey')) {
    monkey['id'] = line.split(' ')[1][0];
  } else if (line.startsWith('Starting')) {
    monkey['items'] = line.split('Starting items: ')[1].split(', ').map(Number);
  } else if (line.startsWith('Operation')) {
    monkey['op'] = old => eval(line.split('Operation: new = ')[1]);
  } else if (line.startsWith('Test')) {
    monkey['test'] = worry => worry % Number(line.split('Test: divisible by ')[1]) === 0;
    monkey['testVal'] = Number(line.split('Test: divisible by ')[1]);
  } else if (line.trim().startsWith('If t')) {
    monkey['true'] = Number(line.split('If true: throw to monkey ')[1]);
  } else if (line.trim().startsWith('If f')) {
    monkey['false'] = Number(line.split('If false: throw to monkey ')[1]);
    monkeys.push(monkey);
    monkey = {};
  }
};
// console.log(monkeys);


function solver(part) {
  const part1 = part === 1;
  let rounds = part1 ? 20 : 10000;

  const monkeyKeys = Object.keys(monkeys);
  const monkeyInspection = {};
  monkeyKeys.forEach((key) => (monkeyInspection[key] = 0));

  let modul = 1;
  !part1 ? monkeyKeys.forEach((key) => (modul *= monkeys[key].testVal)) : null;

  for (let i = 0; i < rounds; i++) {
    for (let j = 0; j < monkeyKeys.length; j++) {
      const monkeyItems = {};
      monkeyKeys.forEach((key) => (monkeyItems[key] = []));

      monkeys[j].items.forEach((item) => {
        monkeyInspection[j]++;
        let newValue = monkeys[j].op(item);
        // Bored
        part1 ? newValue = Math.floor(newValue / 3) :
          newValue = newValue % modul;
        // Throw
        monkeys[j].test(newValue) ?
          monkeyItems[monkeys[j].true].push(newValue) :
          monkeyItems[monkeys[j].false].push(newValue);
      });

      monkeyKeys.forEach((key) => {
        if (key === monkeyKeys[j]) {
          monkeys[key].items = [];
        } else {
          monkeys[key].items = [...monkeys[key].items, ...monkeyItems[key]];
        }
      });
    }
  }

  const v = Object.values(monkeyInspection).sort((a, b) => b - a);
  return v[0] * v[1];
}

console.log(solver(2)); //part 1: 1; part 2: 2; one at a time