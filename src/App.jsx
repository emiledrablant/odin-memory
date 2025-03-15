
import React from 'react'

import Score from './components/Score';
import CardsHandler from './components/CardsHandler';

import './App.css'

function produceNumbers() {
  const randomNumbers = []
  while(randomNumbers.length < 12) {
      const number = Math.floor(Math.random() * 151) + 1;
      if (!randomNumbers.includes(number)) {
          randomNumbers.push(number);
      }
  }
  return randomNumbers;
}

//const arrayOfPokemonIds = produceNumbers();

function App() {
  const [currentScore, setCurrentScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const [arrayOfPokemonsIds, setArrayOfPokemonsIds] = React.useState(produceNumbers);

  function gameHandler(gameIsOver = false) {
    if (gameIsOver) {
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setArrayOfPokemonsIds(produceNumbers);
      setCurrentScore(0);
    } else {
      setCurrentScore(currentScore + 1);
    }
  }

  return (
  <>
      <Score
        currentScore={currentScore}
        bestScore={bestScore}
      />
      <CardsHandler
        arrayOfPokemonIds={arrayOfPokemonsIds}
        gameHandler={gameHandler}
      />
  </>
  )
}

export default App
