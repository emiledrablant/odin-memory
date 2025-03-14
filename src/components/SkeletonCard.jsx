import '../styles/cards.css';

/**
 * Renders a skeleton loading card
 * @returns {JSX.Element} A placeholder card for loading state
 */
function SkeletonCard() {
  return (
    <div className="card skeleton-card">
      <div className="skeleton-name"></div>
      <div className="skeleton-image"></div>
    </div>
  );
}

export default SkeletonCard;
