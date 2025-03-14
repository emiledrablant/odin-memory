
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

function App() {
  const [currentScore, setCurrentScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const refScore = React.useRef(0);

  const arrayOfPokemonIds = produceNumbers();

  function gameHandler(gameIsOver = false) {
    if (gameIsOver) {
      console.log("bla");
    } else {
      refScore.current += 1;
      //setCurrentScore(currentScore + 1);
    }
  }

  return (
  <>
      <Score
        currentScore={refScore.current}
        bestScore={bestScore}
      />
      <CardsHandler
        arrayOfPokemonIds={arrayOfPokemonIds}
        gameHandler={gameHandler}
      />
  </>
  )
}

export default App
