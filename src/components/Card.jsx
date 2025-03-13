
import '../styles/cards.css'

function clickHandler(pokemon) {
    console.log(pokemon.id, pokemon.name);
}

function Card({ pokemon }) {
    return (
        <div className="card" onClick={() => clickHandler(pokemon)}>
            <p>{pokemon.name}</p>
            <img src={pokemon.img} />
        </div>
    )
}

export default Card;