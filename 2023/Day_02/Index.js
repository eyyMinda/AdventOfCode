const { Input, Test } = require('./Input');

const games = Input.trim().split('\n');

const conf = { red: 12, green: 13, blue: 14 };

const findFalseGames = (games, conf) => {
  const falseGames = [];
  const gamesPowerSets = [];

  games.forEach((line) => {
    const parts = line.split(':');
    if (parts.length === 2) {
      const gameId = parseInt(parts[0].trim().split(' ')[1], 10);
      const rounds = parts[1].split(';');

      let isValid = true;
      const maxCount = { red: 0, green: 0, blue: 0 };

      rounds.forEach((round) => {
        const counts = round.trim().split(',').map(entry => entry.trim().split(' '));
        counts.forEach(([count, color]) => {
          const num = parseInt(count, 10);
          if (conf[color] < num) {
            isValid = false;
          }
          if (maxCount[color] < num) maxCount[color] = num;
        });
      });

      if (isValid) falseGames.push(gameId);
      gamesPowerSets.push(Object.values(maxCount).reduce((a, b) => a * b));
    }
  });
  const part1 = falseGames.reduce((a, b) => a + b);

  const part2 = gamesPowerSets.reduce((a, b) => a + b);
  return [part1, part2];
};

const [part1, part2] = findFalseGames(games, conf);

console.log(part1); // Output: [1, 2]
console.log(part2); // Output: [1, 2]

