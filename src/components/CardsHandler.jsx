
import React from "react";
import Card from "./Card";

import '../styles/cards.css'

// expects a number after /pokemon/
const DATA_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

// To improve later on because it's probably bugged right now
function shuffleOrder(oldArray) {
    const newArray = [...oldArray];
      for (let i = oldArray.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[random]] = [newArray[random], newArray[i]];
      }
      return newArray;
}

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
                    id: arrayOfPokemonIds[i],
                    name: capitalizedName,
                    img: json.sprites.front_default,
                }
                fetchedPokemons.push(currentPokemon);
            }
            setPokemons(fetchedPokemons);
        }
        dataFetcher();
    }, [arrayOfPokemonIds]);

    function onClick(pokemon) {
        console.log(pokemon);
        const newOrder = shuffleOrder(pokemons);
        setPokemons(newOrder);
    }

    return (
        <div className="card-container">
        {pokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} onClick={onClick} />
        ))}
        </div>
    )
}

export default CardsHandler;