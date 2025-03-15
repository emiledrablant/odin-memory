
import React from 'react';
import config from '../config';

import Score from './components/Score';
import CardsHandler from './components/CardsHandler';

function produceNumbers() {
  const randomNumbers = [];
  while(randomNumbers.length < config.numberOfCards) {
      const number = Math.floor(Math.random() * config.maxRandomNumber) + 1;
      if (!randomNumbers.includes(number)) {
          randomNumbers.push(number);
      }
  }
  return randomNumbers;
}

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
      // setCurrentScore((previousScore) => previousScore + 1); ????
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
        arrayOfPokemonsIds={arrayOfPokemonsIds}
        gameHandler={gameHandler}
      />
  </>
  );
}

export default App;
