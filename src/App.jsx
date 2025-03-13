
import React from 'react'

import Score from './components/Score';
import CardsHandler from './components/CardsHandler';

import './App.css'

function App() {
  const [currentScore, setCurrentScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);

  return (
  <>
      <Score />
      <CardsHandler />
  </>
  )
}

export default App
