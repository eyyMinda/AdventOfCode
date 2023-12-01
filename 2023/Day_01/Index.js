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
  // console.log(line);
  let newLine = "";
  for (let j = 0; j < line.length; j++) {
    if (line[j] === "o" && line[j + 1] === "n" && line[j + 2] === "e") {
      newLine += "1";
    }
    if (line[j] === "t" && line[j + 1] === "w" && line[j + 2] === "o") {
      newLine += "2";
    }
    if (line[j] === "t" && line[j + 1] === "h" && line[j + 2] === "r" && line[j + 3] === "e" && line[j + 4] === "e") {
      newLine += "3";
    }
    if (line[j] === "f" && line[j + 1] === "o" && line[j + 2] === "u" && line[j + 3] === "r") {
      newLine += "4";
    }
    if (line[j] === "f" && line[j + 1] === "i" && line[j + 2] === "v" && line[j + 3] === "e") {
      newLine += "5";
    }
    if (line[j] === "s" && line[j + 1] === "i" && line[j + 2] === "x") {
      newLine += "6";
    }
    if (line[j] === "s" && line[j + 1] === "e" && line[j + 2] === "v" && line[j + 3] === "e" && line[j + 4] === "n") {
      newLine += "7";
    }
    if (line[j] === "e" && line[j + 1] === "i" && line[j + 2] === "g" && line[j + 3] === "h" && line[j + 4] === "t") {
      newLine += "8";
    }
    if (line[j] === "n" && line[j + 1] === "i" && line[j + 2] === "n" && line[j + 3] === "e") {
      newLine += "9";
    }
    if (line[j] === "z" && line[j + 1] === "e" && line[j + 2] === "r" && line[j + 3] === "o") {
      newLine += "0";
    }
    if (isFinite(parseInt(line[j], 10))) {
      newLine += line[j];
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
