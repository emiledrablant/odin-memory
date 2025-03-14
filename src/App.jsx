import React, { useState, useEffect } from 'react';

import Score from './components/Score';
import CardsHandler from './components/CardsHandler';

import config from '../config';

import './styles/App.css';

/**
 * Generates an array of unique random numbers between 1-151 (Pokémon IDs)
 * @returns {Array} Array of 12 unique random Pokémon IDs
 */
const produceNumbers = () => {
  const randomNumbers = [];
  while (randomNumbers.length < config.numberOfCards) {
    const number = Math.floor(Math.random() * config.maxRandomNumber) + config.minRandomNumber;
    if (!randomNumbers.includes(number)) {
      randomNumbers.push(number);
    }
  }
  return randomNumbers;
};

function App() {
  // Tracks the player's current score in the ongoing game
  const [currentScore, setCurrentScore] = useState(0);
  
  // Stores the best (lowest) score achieved across game sessions
  const [bestScore, setBestScore] = useState(0);
  
  // Stores the randomly generated Pokémon IDs for the current game
  const [arrayOfPokemonIds, setArrayOfPokemonIds] = useState([]);

  /**
   * Handles game state changes including scoring and game reset
   * @param {boolean} gameIsOver - Flag indicating if the game is over
   */
  const gameHandler = (gameIsOver = false) => {
    if (gameIsOver) {
      // Update best score if current score is lower, unless best score is 0 then just set it
      if (currentScore < bestScore) {
        setBestScore(currentScore);
      } else if (bestScore === 0) {
        setBestScore(currentScore);
      }
      // Reset current score
      setCurrentScore(0);

      // Generate new set of Pokemon IDs for a new game
      const c = confirm('Game over! Do you want to play again?');
      if (!c) {
        alert('Thanks for playing!');
      } else {
        setArrayOfPokemonIds(produceNumbers());
      }
    } else {
      setCurrentScore((prevScore) => prevScore + 1);
    }
  };

  /**
   * Initialize the game on component mount by generating random Pokémon IDs
   */
  useEffect(() => {
    setArrayOfPokemonIds(produceNumbers());
  }, []); // Run on initial render only

  return (
    <>
      <Score currentScore={currentScore} bestScore={bestScore} />
      <CardsHandler
        arrayOfPokemonIds={arrayOfPokemonIds}
        gameHandler={gameHandler}
      />
    </>
  );
}

export default App;
