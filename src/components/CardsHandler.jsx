
import React from "react";
import Card from "./Card";

// expects a number after /pokemon/
const DATA_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

function CardsHandler() {
    const [pokemons, setPokemons] = React.useState([]);
    
    function produceNumbers() {
        const randomNumbers = []
        while(randomNumbers.length < 12) {
            const number = Math.floor(Math.random() * 151) + 1;
            if (!randomNumbers.includes(number)) {
                randomNumbers.push(number);
            }
        }
        return randomNumbers;
    }
    const rando = produceNumbers();

    React.useEffect(() => {
        const fetchedPokemons = [];
        async function dataFetcher() {
            for (let i = 0; i < rando.length; i++) {
                const response = await fetch(DATA_ENDPOINT + rando[i]);
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
    }, []);

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