const { Input, Test } = require('./Input');
let part2;

const processSeeds = (section) => {
  const seeds = section.split(':')[1].trim();
  return seeds.split(/\s+/).map(Number);
}

const processSeedRanges = (section) => {
  const seeds = section.split(':')[1].trim().split(/\s+/).map(Number);

  return seeds.reduce((ranges, value, i) => {
    if (i % 2 === 0) ranges.push([value, seeds[i + 1]]);
    return ranges;
  }, [])
}

const processCategory = (section) => {
  const [title, values] = section.split(':\n');

  const mapping = values.split('\n').map((line) => {
    const [destStart, srcStart, rangeLength] = line.split(/\s+/).map(Number);
    return [destStart, srcStart, rangeLength];
  })

  return { title, mapping };
}

const processInput = (input) => {
  const sections = input.split('\n\n');

  return sections.reduce((acc, section) => {
    if (section.startsWith('seeds:')) {
      if (part2) {
        acc.seedRanges = processSeedRanges(section);
      } else {
        acc.seeds = processSeeds(section);
      }
    } else {
      const { title, mapping } = processCategory(section);

      acc.categories = acc.categories || {};
      acc.categories[title] = acc.categories[title] || [];
      acc.categories[title] = mapping || [];
    }

    return acc;
  }, {})
}

const convertNumber = (number, mapping) => {
  for (const [destStart, srcStart, rangeLength] of mapping) {
    if (number >= srcStart && number < srcStart + rangeLength) {
      return destStart + (number - srcStart);
    }
  }

  return number;
}

const convertRange = (range, mapping) => {
  let [start, length] = range;
  let convertedRanges = [];

  mapping.forEach(([destStart, srcStart, rangeLength]) => {
    let srcEnd = srcStart + rangeLength;

    if (start < srcEnd && start + length > srcStart) {
      let overlapStart = Math.max(start, srcStart);
      let overlapEnd = Math.min(start + length, srcEnd);
      let newStart = destStart + (overlapStart - srcStart);

      convertedRanges.push([newStart, overlapEnd - overlapStart]);
    }
  })
  return convertedRanges.length > 0 ? convertedRanges : [[start, length]];
}

const convertThroughCategories = (seed, categories) => {
  let currentNumber = seed;

  for (const key in categories) {
    if (categories.hasOwnProperty(key)) {
      currentNumber = convertNumber(currentNumber, categories[key]);
    }
  }
  return currentNumber;
}

const convertThroughCategoriesRange = (seedRange, categories) => {
  let currentRanges = [seedRange];

  for (const category in categories) {
    let newRanges = [];

    currentRanges.forEach((range) => {
      convertRange(range, categories[category]).forEach((convertedRange) => {
        newRanges.push(convertedRange);
      })
    })
    currentRanges = newRanges;
  }
  return currentRanges;
}

const findLowestLocationNumber = (almanac) => {
  const seeds = almanac['seeds'];
  let lowestLocation = Number.MAX_SAFE_INTEGER;

  seeds.forEach((seed) => {
    const locationNumber = convertThroughCategories(seed, almanac['categories']);

    if (locationNumber < lowestLocation) lowestLocation = locationNumber;
  })
  return lowestLocation;
}

const findLowestLocationNumberRange = (almanac) => {
  let lowestLocation = Number.MAX_SAFE_INTEGER;

  almanac['seedRanges'].forEach((seedRange) => {
    const locationRanges = convertThroughCategoriesRange(seedRange, almanac['categories'])

    locationRanges.forEach(([start]) => {
      if (start < lowestLocation) lowestLocation = start;
    })
  })
  return lowestLocation;
}


function solution(input) {
  const almanac = processInput(input);
  return part2 ? findLowestLocationNumberRange(almanac) : findLowestLocationNumber(almanac);
}

const res = {
  Test: solution(Test),
  Part1: solution(Input),
  Test2: part2 = true && solution(Test),
  Part2: part2 = true && solution(Input)
}

console.table(res);
