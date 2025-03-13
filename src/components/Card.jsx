
import '../styles/cards.css'

function Card({ pokemon }) {
    return (
        <div key={pokemon.id} className="card">
            <p>{pokemon.name}</p>
            <img src={pokemon.img} />
        </div>
    )
}

export default Card;