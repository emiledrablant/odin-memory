
import '../styles/cards.css';

function Card({ pokemon, onClick }) {
    return (
        <div className="card" onClick={() => onClick(pokemon)}>
            <p>{pokemon.name}</p>
            <img src={pokemon.img} alt={pokemon.name} />
        </div>
    );
}

export default Card;