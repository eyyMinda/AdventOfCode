const { Input, Test } = require('./Input');

function isUnique(array) {
  return new Set(array).size === array.length;
}

function getMarker(input, max) {
  let marker = [];
  for (let i = 0; i < input.length; i++) {
    marker.push(input[i]);
    if (marker.length > max) {
      marker.shift();
    }
    if (marker.length === max && isUnique(marker)) {
      console.log(i + 1);
      break;
    }
  }
}

getMarker(Test, 4); //Test
getMarker(Input, 4); //part1
getMarker(Input, 14); //part2