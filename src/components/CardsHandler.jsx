
import React from "react";
import Card from "./Card";

import '../styles/cards.css'

// expects a number after /pokemon/
const DATA_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

function CardsHandler({arrayOfPokemonIds}) {
    const [pokemons, setPokemons] = React.useState([]);

    React.useEffect(() => {
        const fetchedPokemons = [];
        async function dataFetcher() {
            for (let i = 0; i < arrayOfPokemonIds.length; i++) {
                const response = await fetch(DATA_ENDPOINT + arrayOfPokemonIds[i]);
                const json = await response.json();

                const capitalizedName = json.name.charAt(0).toUpperCase() + json.name.slice(1);
                const currentPokemon = {
                    id: i,
                    name: capitalizedName,
                    img: json.sprites.front_default,
                }
                fetchedPokemons.push(currentPokemon);
            }
            setPokemons(fetchedPokemons);
        }
        dataFetcher();
    }, [arrayOfPokemonIds]);

    return (
        <div className="card-container">
        {pokemons.map((pokemon) => (
            <Card pokemon={pokemon} />
        ))}
        </div>
    )
}

export default CardsHandler;