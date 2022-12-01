const { Input } = require('./Input');

//part 1
function isNiceString(inp) {
  const strings = inp.split('\n');
  console.log(strings.length);
  //includes at least one letter twice in a row
  const vow = 'aeiou';
  const vowels = ['a', 'e', 'i', 'o', 'u']; //includes at least 3
  const donts = ['ab', 'cd', 'pq', 'xy']; //does not include any
  let nice = 0;

  for (let i = 0; i < strings.length; i++) {
    let str = strings[i].split('');
    let vCount = 0, dupCount = 0, included = false;

    str.map((l, i) => {
      l === str[i + 1] ? dupCount++ : null;
      vowels.includes(l) ? vCount++ : null;
    });

    if (vCount > 2 && dupCount > 0) {
      donts.map(d => str.join('').includes(d) ? included = true : null);
      if (!included) { nice++; }
    }
  }

  console.log('1st Nice Strings: ', nice);
}
isNiceString(Input);

//part 2
function isNiceString2(inp) {
  const strings = inp.split('\n');

  //includes at least one letter which repeats with exactly one letter between them ex: xyx, zaz, bob
  //contains a pair of any two letters that appears twice in the string, no overlap ex: xyxy, aabvdaa (not: aaa, roguuuj)
  let nice = 0;

  for (let i = 0; i < strings.length; i++) {
    let str = strings[i].split('');
    let dupCount = 0;

    str.map((l, i) => {
      l === str[i + 2] ? dupCount++ : null;

    });

    if (dupCount > 0) {
      nice++;
    }
  }

  console.log('2nd Nice Strings: ', nice);
}
isNiceString2(Input);