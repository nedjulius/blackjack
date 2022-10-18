# Freenome Blackjack assignment

## Overview

This is a **Blackjack** game command-line application written in **JavaScript** on **Node.js** environment. It also has a small test suite that runs on **Jest**.

### Application design

I based the application design on a Flux-like pattern. The application has a state object that action events can change through a dispatch function. The dispatch function reassigns a new state based on the reducer that matches the specific action event that dispatch received as an argument. The application also has a bunch of state selectors essential to control the game's flow.

I built this application with the Flux-like pattern in mind because the current iteration of the game has a lot of room for extensibility, which the Flux pattern makes a good choice for. Furthermore, the Flux pattern is an excellent choice for testability as we can manipulate the state object and test any scenarios we want. Finally, I am pretty comfortable with this pattern as I have worked with state management libraries based on this idea, so it didn't take me a long time to incorporate the ideas within the framework.

With the Flux-like pattern that I chose, I could implement efficient summing of the player's/dealer's hand as the program updates the hand score in the state with each hit. The state also keeps track of the ace count in the player's/dealer's hand, which is helpful in the hand score selector that calls an external function to calculate the optimal value of aces. The program's overall efficiency is pretty good because all operations perform in a constant time: for example, state selectors perform in a constant time. Nevertheless, if I had more time, I would undoubtedly improve the algorithm that finds the optimal value of the aces in the deck. Even though we know that there will always be at most four aces per hand, the current implementation would not perform well in cases where this number is more significant because it will generally operate in O(2^N). The recent performance generates all the possible combinations of aces every time the function is called and finds the most optimal combination for the hand sum. A more straightforward improvement would be to write out specific mappings to all possible combinations that could be accessed in constant time because we know the maximum number of aces in the hand anyway. Overall, given more time, I would add more tests, improve the code readability in the driver file (currently, it has a lot of repetitive code), improve the file hierarchy, and maybe even add a TypeScript compiler.

### Structure

- `src/driver.js` - main game driver
- `src/state.js` - state management and initialization
- `src/deck.js` - everything related to deck and card object utilities
- `src/constants.js` - all constants in the project
- `/play.js` - main file that runs the game driver

## Features

- This game is played between one player and a computer
- Player can either bust (B) or hit (H) based on the game state and player decision
- Player wins if he/she/they hits a Blackjack or has a bigger hand sum than the dealer (after dealer stands)
- Game also supports ties - if dealer and player end up having the same hand sum, the game results in a tie

## Running the project

### Installation

To run the project, you will first need to install the dependencies. The project was written and tested on `node` version `16.17.1`. To install the dependencies, run the following command: `npm install`.

### Running the game

To start the game, run the following command: `npm run play`

### Running the tests

To run the tests, run the following command: `npm run test`

**A note on tests:** I only wrote tests that test the two essential functions for the game - a function that shuffles the deck and a function that determines the optimal ace values. I manually tested if the game works in pretty much all possible states: whether the player busts and the game end if they end up with more than 21 in their hand after hit; whether the player wins if and the game ends if the player has exactly 21 in their hand; whether the game ends in a tie if player and dealer have the same score; whether the dealer stops hitting when they reach a score bigger or equal to 17; whether the game ends and dealer wins if the dealer's score is equal to 21; whether the game shuffles the deck every single time we start the game; whether the program correctly updates the deck after each hit. If I had more time, I would have tested all of these scenarios and other things like the output text. The testing would not be too tricky, though, because we can manipulate the initial state (specifically the deck) to give the player and dealer the desired cards.

## Dependencies

- `prompt-sync`
- `@babel/preset-env`
- `eslint-config-prettier`
- `eslint-plugin-prettier`
- `jest`
- `prettier`

