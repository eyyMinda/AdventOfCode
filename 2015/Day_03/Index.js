const { Input } = require('./Input');

function directionsForSanta(inp) {
  let map = {};
  let cord = [0, 0];
  let robCord = [0, 0];
  let rob = false;
  for (let i = 0; i < inp.length; i++) {
    switch (inp[i]) {
      case '>':
        if (!rob) { cord[0]++; rob = true }
        else if (rob) { robCord[0]++; rob = false } break;
      case '<':
        if (!rob) { cord[0]--; rob = true }
        else if (rob) { robCord[0]--; rob = false } break;
      case '^':
        if (!rob) { cord[1]++; rob = true }
        else if (rob) { robCord[1]++; rob = false } break;
      case 'v':
        if (!rob) { cord[1]--; rob = true }
        else if (rob) { robCord[1]--; rob = false } break;
    }
    map[`${cord[0]}, ${cord[1]}`] = 1;
    // Add robot progress below (Comment to get part 1 result)
    map[`${robCord[0]}, ${robCord[1]}`] = 1;
  }

  console.log(map);
  console.log('Houses with presents: ', Object.values(map).reduce((a, b) => a + b, 0));
}

directionsForSanta(Input);