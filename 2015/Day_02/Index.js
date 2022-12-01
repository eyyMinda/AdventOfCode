const { Input } = require('./Input');

function someFunction(inp) {
  const initial = inp.split('\n');
  let totalPaper = 0;
  let totalRibbon = 0;

  for (let i = 0; i < initial.length; i++) {
    const [l, w, h] = initial[i].split('x');
    const sq = [l * w, w * h, h * l];
    sq.sort((a, b) => a - b);
    //sorted by shortest
    const r = [l, w, h].sort((a, b) => a - b);
    totalPaper += sq[0] * 2 + sq[1] * 2 + sq[2] * 2 + sq[0];
    totalRibbon += (r[0] * 2 + r[1] * 2) + (l * 1 * w * h);
  }
  console.log('totalPaper: ', totalPaper);
  console.log('totalRibbon: ', totalRibbon);
}

someFunction(Input);