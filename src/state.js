import {getShuffledDeck, getAceValue} from './deck.js';
import {
  PLAYER_TURN,
  COMPUTER_TURN,
  ACE,
  BLACKJACK_VALUE,
  DEALER_MAX,
} from './constants.js';

const initializeState = () => ({
  currentTurn: PLAYER_TURN,
  deck: [...getShuffledDeck()],
  playerHand: [],
  playerHandSum: 0,
  playerAceCount: 0,
  dealerHand: [],
  dealerHandSum: 0,
  dealerAceCount: 0,
});

let state = initializeState();

const ACTIONS = {
  HIT_PLAYER: 'HIT_PLAYER',
  HIT_DEALER: 'HIT_DEALER',
  CHANGE_TURN: 'CHANGE_TURN',
};

const reducer = (action) => {
  let card, isAce;
  const {
    deck,
    playerHand,
    playerHandSum,
    playerAceCount,
    dealerHand,
    dealerHandSum,
    dealerAceCount,
  } = state;

  switch (action) {
    case ACTIONS.HIT_PLAYER:
      card = deck.pop();
      isAce = card.name === ACE;
      return {
        ...state,
        playerHand: [...playerHand, card],
        playerAceCount: isAce ? playerAceCount + 1 : playerAceCount,
        playerHandSum: isAce ? playerHandSum : playerHandSum + card.value,
      };
    case ACTIONS.HIT_DEALER:
      card = deck.pop();
      isAce = card.name === ACE;
      return {
        ...state,
        dealerHand: [...dealerHand, card],
        dealerAceCount: isAce ? dealerAceCount + 1 : dealerAceCount,
        dealerHandSum: isAce ? dealerHandSum : dealerHandSum + card.value,
      };
    case ACTIONS.CHANGE_TURN:
      return {
        ...state,
        currentTurn: isPlayersTurn() ? COMPUTER_TURN : PLAYER_TURN,
      };
    default:
      return state;
  }
};

const dispatch = (action) => {
  state = reducer(action);
};

// selectors

const isPlayersTurn = () => state.currentTurn === PLAYER_TURN;

const getPlayerHandSum = () =>
  state.playerHandSum + getAceValue(state.playerHandSum, state.playerAceCount);

const getDealerHandSum = () =>
  state.dealerHandSum + getAceValue(state.dealerHandSum, state.dealerAceCount);

const getPlayerHandLine = () =>
  state.playerHand.map(({name}) => name).join(' ');

const getPlayerHandFormattedState = () =>
  `${getPlayerHandLine()} = ${getPlayerHandSum()}`;

const getDealerHiddenHandLine = () =>
  state.dealerHand.map(({name}, index) => (index !== 0 ? '?' : name)).join(' ');

const getDealerHandLine = () =>
  state.dealerHand.map(({name}) => name).join(' ');

const getDealerHandFormattedState = (isHidden = false) =>
  `${isHidden ? getDealerHiddenHandLine() : getDealerHandLine()} = ${
    isHidden ? '?' : getDealerHandSum()
  }`;

const isPlayerBust = () => getPlayerHandSum() > BLACKJACK_VALUE;

const didPlayerHitBlackjack = () => getPlayerHandSum() === BLACKJACK_VALUE;

const isDealerBust = () => getDealerHandSum() > BLACKJACK_VALUE;

const shouldDealerStand = () => getDealerHandSum() >= DEALER_MAX;

const isTie = () => getDealerHandSum() === getPlayerHandSum();

const didPlayerWin = () => getDealerHandSum() < getPlayerHandSum();

// actions

const playerHitAction = () => dispatch(ACTIONS.HIT_PLAYER);

const dealerHitAction = () => dispatch(ACTIONS.HIT_DEALER);

const changeTurnAction = () => dispatch(ACTIONS.CHANGE_TURN);

export {
  isPlayersTurn,
  isPlayerBust,
  didPlayerHitBlackjack,
  didPlayerWin,
  isDealerBust,
  shouldDealerStand,
  isTie,
  getPlayerHandSum,
  getPlayerHandFormattedState,
  getDealerHandFormattedState,
  playerHitAction,
  dealerHitAction,
  changeTurnAction,
};
