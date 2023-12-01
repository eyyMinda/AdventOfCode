const { Input, Test, Test2 } = require('./Input');

const lines = Input.trim().split('\n');

const buildNumber = (digits) => {
  if (digits.length === 0) {
    return 0;
  }
  if (digits.length === 1) {
    return parseInt(digits[0].toString() + digits[0].toString(), 10);
  } else {
    return parseInt(digits[0].toString() + digits[digits.length - 1].toString(), 10);
  }
};

const convertStringsToNumbers = (line) => {
  const wordToDigit = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    zero: '0',
  };

  let newLine = '';
  let wordBuffer = '';

  for (let j = 0; j < line.length; j++) {
    const currentChar = line[j].toLowerCase();

    if (currentChar >= 'a' && currentChar <= 'z') {
      // Accumulate characters to form a word
      wordBuffer += currentChar;
    } else {
      // Check if we have a complete word in the buffer
      if (wordToDigit[wordBuffer]) {
        newLine += wordToDigit[wordBuffer];
        wordBuffer = ''; // Reset the word buffer
      } else if (isFinite(parseInt(currentChar, 10))) {
        newLine += currentChar;
      }
    }
  }

  return newLine;
};

async function main() {
  const numbers = lines.map(line => {
    const convertedLine = convertStringsToNumbers(line);
    const filtered = Array.from(convertedLine).map(c => parseInt(c, 10)).filter(n => !isNaN(n));
    return buildNumber(filtered);
  });

  const result = numbers.reduce((a, b) => a + b);
  console.log(result);
}

main();
