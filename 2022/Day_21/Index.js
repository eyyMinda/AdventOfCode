const { Input, Test } = require('./Input');

const input = Input.trim().split('\n').map((line) => line.split(': '));

const monkeys = new Map();
for (const [name, task] of input) {
  monkeys.set(name, task);
}

function monkeyNumber(monkey) {
  const [m1, op, m2] = monkeys.get(monkey).split(' ');
  if (!op) return +m1;
  return eval(`monkeyNumber(m1) ${op} monkeyNumber(m2)`);
}

console.log('Part 1: ', monkeyNumber('root'));


// Part 2
const [leftMonkey, , rightMonkey] = monkeys.get('root').split(' ');

if (isConnected(leftMonkey)) {
  console.log('Part 2: ', humanNumber(leftMonkey, monkeyNumber(rightMonkey)));
} else {
  console.log('Part 2: ', humanNumber(rightMonkey, monkeyNumber(leftMonkey)));
}

function isConnected(monkey) {
  const [m1, op, m2] = monkeys.get(monkey).split(' ');
  if (!op) return false;
  if (m1 === 'humn' || m2 === 'humn') return true;
  return isConnected(m1) || isConnected(m2);
}

function humanNumber(monkey, value) {
  let [left, op, right] = monkeys.get(monkey).split(" ");
  let operand;
  if (left === 'humn') operand = right;
  if (right === 'humn') operand = left;

  if (operand) {
    switch (op) {
      case '+': return value - monkeyNumber(operand); break;
      case '*': return value / monkeyNumber(operand); break;
      case '-': return monkeyNumber(operand) + operand === right ? value : -value; break;
      case '/': return monkeyNumber(operand) * operand === right ? value : 1 / value; break;
    }
  }

  const isLeftConnected = !!isConnected(left);
  if (!isLeftConnected) [left, right] = [right, left];

  switch (op) {
    case '+': return humanNumber(left, value - monkeyNumber(right)); break;
    case '*': return humanNumber(left, value / monkeyNumber(right)); break;
    case '-': return humanNumber(left, monkeyNumber(right) + (isLeftConnected ? value : -value)); break;
    case '/': return humanNumber(left, monkeyNumber(right) * (isLeftConnected ? value : 1 / value)); break;
  }
}
