import '../styles/score.css';

/**
 * Displays the current and best scores in the game
 * @param {number} currentScore - The player's score in the current game
 * @param {number} bestScore - The best (lowest) score achieved across games
 * @returns {JSX.Element} Score display component
 */
function Score({ currentScore, bestScore }) {
  return (
    <div className='score'>
      Current score: {currentScore}
      <br />
      Best score: {bestScore}
    </div>
  );
}

export default Score;
