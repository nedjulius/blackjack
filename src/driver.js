import promptSync from 'prompt-sync';
import {
  dealerHitAction,
  playerHitAction,
  changeTurnAction,
  getDealerHandFormattedState,
  getPlayerHandFormattedState,
  getPlayerHandSum,
  isPlayersTurn,
  isPlayerBust,
  isDealerBust,
  didPlayerHitBlackjack,
  shouldDealerStand,
  didPlayerWin,
  isTie,
} from './state.js';

const prompt = promptSync({});

export const driver = () => {
  console.clear();

  // draw two cards for dealer
  dealerHitAction();
  dealerHitAction();
  // draw two cards for human
  playerHitAction();
  playerHitAction();

  while (true) {
    if (isPlayersTurn()) {
      console.log('Dealer has:', getDealerHandFormattedState(true));
      console.log('Player has:', getPlayerHandFormattedState());

      if (isPlayerBust()) {
        console.log('Player busts with ' + getPlayerHandSum());
        console.log('Dealer wins');
        break;
      }

      if (didPlayerHitBlackjack()) {
        console.log('Player wins!');
        console.log('Blackjack!');
        break;
      }

      const userInput = prompt('Would you like to (H)it or (S)tand? ');
      console.log('');

      if (userInput === 'H') {
        playerHitAction();
        continue;
      }

      if (userInput === 'S') {
        changeTurnAction();
        console.log('Player stands with:', getPlayerHandFormattedState());
        console.log('');
        continue;
      }
    } else {
      console.log('Dealer has:', getDealerHandFormattedState());

      if (isDealerBust()) {
        console.log('Player wins!');
        break;
      }

      if (shouldDealerStand()) {
        console.log('Dealer stands');

        if (isTie()) {
          console.log('Tie');
          break;
        }

        if (didPlayerWin()) {
          console.log('Player wins!');
          console.log(
            getPlayerHandFormattedState(),
            "to Dealer's",
            getDealerHandFormattedState()
          );
          break;
        } else {
          console.log('Dealer wins');
          break;
        }
      } else {
        console.log('Dealer hits');
        dealerHitAction();
      }
    }
  }
};
