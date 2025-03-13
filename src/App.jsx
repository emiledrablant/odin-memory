
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

  const arrayOfPokemonIds = produceNumbers();

  return (
  <>
      <Score />
      <CardsHandler arrayOfPokemonIds={arrayOfPokemonIds} />
  </>
  )
}

export default App
