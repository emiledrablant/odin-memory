import '../styles/cards.css';

/**
 * Renders an individual Pokémon card
 * @param {Object} pokemon - The Pokémon data to display (name, image)
 * @param {Function} onClick - Function to handle card click events
 * @returns {JSX.Element} A clickable card displaying Pokémon info
 */
function Card({ pokemon, onClick }) {
  return (
    <div className='card' onClick={() => onClick(pokemon)}>
      <p>{pokemon.name}</p>
      <img src={pokemon.img} alt={pokemon.name} />
    </div>
  );
}

export default Card;
