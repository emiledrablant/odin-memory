
import '../styles/cards.css'

function Card({ pokemon, onClick }) {
    return (
        <div className="card" onClick={() => onClick(pokemon)}>
            <p>{pokemon.name}</p>
            <img src={pokemon.img} />
        </div>
    )
}

export default Card;