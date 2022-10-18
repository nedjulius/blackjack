import {getAceValue, getShuffledDeck} from './deck.js';

const deckCountersFinal = {
  numberCards: 36,
  kings: 4,
  queens: 4,
  jacks: 4,
  aces: 4,
};

describe('deck.js', () => {
  describe('getAceValue', () => {
    test.each([
      {sum: 2, aceCount: 1, res: 11},
      {sum: 2, aceCount: 2, res: 12},
      {sum: 2, aceCount: 3, res: 13},
      {sum: 2, aceCount: 4, res: 14},
      {sum: 20, aceCount: 1, res: 1},
      {sum: 20, aceCount: 4, res: 4},
      {sum: 10, aceCount: 4, res: 4},
      {sum: 9, aceCount: 2, res: 12},
      {sum: 9, aceCount: 1, res: 11},
      {sum: 9, aceCount: 3, res: 3},
      {sum: 0, aceCount: 1, res: 11},
      {sum: 0, aceCount: 2, res: 12},
      {sum: 0, aceCount: 4, res: 14},
    ])(
      'should get $res for sum: $sum and aceCount: $aceCount',
      ({sum, aceCount, res}) => {
        expect(getAceValue(sum, aceCount)).toEqual(res);
      }
    );
  });

  describe('getShuffledDeck', () => {
    it('should return full deck with 52 cards and correct amounts of named cards', () => {
      const deckCounters = Object.keys(deckCountersFinal).reduce(
        (acc, curr) => ({...acc, [curr]: 0}),
        {}
      );
      const deck = getShuffledDeck();

      deck.forEach(({name}) => {
        if (name === 'A') deckCounters.aces++;
        else if (name === 'J') deckCounters.jacks++;
        else if (name === 'Q') deckCounters.queens++;
        else if (name === 'K') deckCounters.kings++;
        else deckCounters.numberCards++;
      });

      expect(deck.length).toEqual(52);
      expect(JSON.stringify(deckCounters)).toEqual(
        JSON.stringify(deckCountersFinal)
      );
    });

    it('should return truly shuffled deck', () => {
      const firstDeck = getShuffledDeck();
      const secondDeck = getShuffledDeck();

      expect(JSON.stringify(firstDeck)).not.toEqual(JSON.stringify(secondDeck));
    });
  });
});
