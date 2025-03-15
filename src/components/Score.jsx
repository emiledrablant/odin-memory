
import '../styles/score.css';

function Score({ currentScore, bestScore }) {

    return (
    <div className="score">
        Current score: {currentScore}<br />
        Best score: {bestScore}
     </div>
    );
}

export default Score;