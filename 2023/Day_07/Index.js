const { Input, Test } = require('./Input');

let part2;

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const p2Cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
const handTypes = ['fiveOfAKind', 'fourOfAKind', 'fullHouse', 'threeOfAKind', 'twoPair', 'onePair', 'highCard'];

const getCardStrength = (card) => (part2 ? p2Cards : cards).indexOf(card);

const evaluateHandType = (hand) => {
  const handArray = hand.cards.map((card) => [card, getCardStrength(card)]);

  handArray.sort((a, b) => b[1] - a[1]);

  if (part2 && handArray.some((card) => card[0] === 'J')) {
    return evaluateHandWithJoker(handArray);
  } else {
    return evaluateHandWithoutJoker(handArray);
  }
}

const evaluateHandWithJoker = (handArray) => {
  let bestHand = { type: 'highCard', cards: handArray };

  for (const card of cards) {
    if (card === 'J') continue;

    const modifiedHand = handArray
      .map(([c, s]) => (c === 'J' ? [card, getCardStrength(card)] : [c, s]))
      .sort((a, b) => b[1] - a[1])
    const currentHand = evaluateHandWithoutJoker(modifiedHand);

    if (handTypes.indexOf(currentHand.type) < handTypes.indexOf(bestHand.type)) {
      bestHand = currentHand;
    }
  }

  return bestHand;
}

const evaluateHandWithoutJoker = (handArray) => {
  handArray.sort((a, b) => b[1] - a[1]);

  const cardCounts = handArray.reduce((counts, [_, strength]) => {
    counts[strength] = (counts[strength] || 0) + 1
    return counts;
  }, {});

  const values = Object.values(cardCounts);
  const pairCount = values.filter((count) => count === 2).length;
  const cards = handArray;

  if (values.includes(5)) return { type: 'fiveOfAKind', cards };
  if (values.includes(4)) return { type: 'fourOfAKind', cards };
  if (values.includes(3) && values.includes(2)) return { type: 'fullHouse', cards };
  if (values.includes(3)) return { type: 'threeOfAKind', cards };
  if (pairCount === 2) return { type: 'twoPair', cards };
  if (pairCount === 1) return { type: 'onePair', cards };

  return { type: 'highCard', cards };
}

const compareHands = (handA, handB) => {
  const typeA = evaluateHandType(handA);
  const typeB = evaluateHandType(handB);

  const typeIndexA = handTypes.indexOf(typeA.type);
  const typeIndexB = handTypes.indexOf(typeB.type);

  // compare hand types
  if (typeIndexA !== typeIndexB) {
    return typeIndexA < typeIndexB ? -1 : 1;
  }

  // if hand types are the same, compare based on card strength
  for (let i = 0; i < handA.cards.length; i++) {
    const strengthA = getCardStrength(handA.cards[i]);
    const strengthB = getCardStrength(handB.cards[i]);

    if (strengthA !== strengthB) {
      return strengthA < strengthB ? -1 : 1;
    }
  }
  return 0;
}

const rankHands = (hands) => {
  const sortedHands = hands.sort(compareHands);

  sortedHands.forEach((hand, index) => hand.rank = sortedHands.length - index);

  return sortedHands;
}

const processInput = (hands) => {
  const sortedHands = hands.split('\n').map((hand) => {
    const [cards, bid] = hand.split(' ');

    return {
      cards: cards.split(''),
      bid: Number(bid)
    };
  })

  return rankHands(sortedHands);
}

function solution(input) {
  const hands = processInput(input);
  return hands.reduce((total, hand) => total + hand.bid * hand.rank, 0);
}


const res = {
  Test: solution(Test),
  Part1: solution(Input),
  Test2: part2 = true && solution(Test),
  Part2: part2 = true && solution(Input)
}

console.table(res);
