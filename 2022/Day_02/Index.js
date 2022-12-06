const { Input, Test } = require('./Input');

const lines = Input.split("\n").map((line) => line.split(" "));
const moves = { rock: 1, paper: 2, scissors: 3, };
const mapInput = {
  A: moves.rock, B: moves.paper, C: moves.scissors,
  X: moves.rock, Y: moves.paper, Z: moves.scissors,
};

function score(opp, me) {
  if (opp === me) { return me + 3; }
  if ((opp === moves.rock && me === moves.paper) ||
    (opp === moves.paper && me === moves.scissors) ||
    (opp === moves.scissors && me === moves.rock)
  ) { return me + 6; }
  return me;
}

function part1() {
  const outcomes = lines.map((line) => {
    const opp = mapInput[line[0]];
    const me = mapInput[line[1]];
    return score(opp, me);
  });
  console.log(outcomes.reduce((a, b) => a + b, 0));
}

const solution = {
  A: { //rock
    X: moves.scissors, //lose
    Y: moves.rock, //draw
    Z: moves.paper, //win
  },
  B: { //paper
    X: moves.rock, Y: moves.paper, Z: moves.scissors,
  },
  C: { //scissors
    X: moves.paper, Y: moves.scissors, Z: moves.rock,
  },
};

function part2() {
  const outcomes = lines.map((line) => {
    const opp = mapInput[line[0]];
    const me = solution[line[0]][line[1]];
    return score(opp, me);
  });
  console.log(outcomes.reduce((a, b) => a + b, 0));
}

part1();
part2();