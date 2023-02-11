# Blackjack

## Overview

This is a **Blackjack** game command-line application written in **JavaScript** on **Node.js** environment. It also has a small test suite that runs on **Jest**.

### Application design

I based the application design on a Flux-like pattern. The application has a state object that action events can change through a dispatch function. The dispatch function reassigns a new state based on the reducer that matches the specific action event that dispatch received as an argument. The application also has a bunch of state selectors essential to control the game's flow.

I built this application with the Flux-like pattern in mind because the current iteration of the game has a lot of room for extensibility, which the Flux pattern makes a good choice for. Furthermore, the Flux pattern is an excellent choice for testability as we can manipulate the state object and test any scenarios we want.

With the Flux-like pattern that I chose, I could implement efficient summing of the player's/dealer's hand as the program updates the hand score in the state with each hit. The state also keeps track of the ace count in the player's/dealer's hand, which is helpful in the hand score selector that calls an external function to calculate the optimal value of aces. The program's overall efficiency is pretty good because all operations perform in a constant time: for example, state selectors perform in a constant time.

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

## Dependencies

- `prompt-sync`
- `@babel/preset-env`
- `eslint-config-prettier`
- `eslint-plugin-prettier`
- `jest`
- `prettier`

