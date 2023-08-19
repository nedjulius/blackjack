import {FACES, ACE, BLACKJACK_VALUE} from './constants.js';

const createCard = (name, value) => ({
  name,
  value,
});

const createNumberCards = (fullDeck) => {
  for (let i = 2; i <= 10; i++) {
    fullDeck.push(createCard(String(i), i));
  }
};

const createFaceCards = (fullDeck) => {
  for (let i = 0; i < FACES.length; i++) {
    fullDeck.push(createCard(FACES[i], 10));
  }
};

const createAceCard = (fullDeck) => fullDeck.push(createCard(ACE, null));

const getAceValue = (sum, aceCount) => {
  if (aceCount === 0) return 0;

  const aceValues = [1, 11];
  const combinationSums = new Set();

  const buildCombinations = (currSum, i) => {
    if (i === aceCount) return combinationSums.add(currSum);

    for (let j = 0; j < 2; j++) {
      buildCombinations(currSum + aceValues[j], i + 1);
    }
  };

  buildCombinations(0, 0);

  return Array.from(combinationSums).reduce((acc, curr) => {
    return curr + sum > acc + sum && curr + sum <= BLACKJACK_VALUE ? curr : acc;
  }, aceCount);
};

const createFullDeck = () => {
  const fullDeck = [];

  for (let i = 0; i < 4; i++) {
    createNumberCards(fullDeck);
    createFaceCards(fullDeck);
    createAceCard(fullDeck);
  }

  return fullDeck;
};

const shuffleDeck = (fullDeck) => {
  for (let i = fullDeck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = fullDeck[i];
    fullDeck[i] = fullDeck[j];
    fullDeck[j] = temp;
  }
};

const getShuffledDeck = () => {
  const fullDeck = createFullDeck();

  shuffleDeck(fullDeck);

  return fullDeck;
};

export {getAceValue, getShuffledDeck};
