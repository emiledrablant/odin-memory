
import React from "react";
import Card from "./Card";

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
        <>
        {pokemons.map((pokemon) => (
            // to move into the Card component
            <div key={pokemon.id}>
                {pokemon.name}
                <img src={pokemon.img} />
            </div>
        ))}
        </>
    )
}

export default CardsHandler;