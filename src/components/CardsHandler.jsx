import React, { useState, useEffect } from 'react';
import Card from './Card';
import SkeletonCard from './SkeletonCard';

import config from '../../config';

import '../styles/cards.css';

// expects a number after /pokemon/
const DATA_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/';

/**
 * Randomizes the order of items in an array
 * @param {Array} oldArray - The array to shuffle
 * @returns {Array} A new array with the same elements in a random order
 */
function shuffleOrder(oldArray) {
  const newArray = [...oldArray];
  for (let i = newArray.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[random]] = [newArray[random], newArray[i]];
  }
  return newArray;
}

/**
 * Manages the collection of Pokémon cards and their interactions
 * @param {Array} arrayOfPokemonIds - Array of Pokémon IDs to display
 * @param {Function} gameHandler - Function to handle game state changes
 * @returns {JSX.Element} Component containing all cards
 */
function CardsHandler({ arrayOfPokemonIds, gameHandler }) {
  // Stores the fetched Pokémon data for display
  const [pokemons, setPokemons] = useState([]);
  
  // Tracks which Pokémon cards have been clicked in the current game
  const [currentPokemonsPlayed, setCurrentPokemonsPlayed] = useState([]);

  // Loading state indicator for pokemon data load
  const [loading, setLoading] = useState(true);

  /**
   * Fetches Pokémon data from the API when Pokémon IDs change
   * Uses Promise.all for concurrent API requests
   */
  useEffect(() => {
    // Skip fetching if arrayOfPokemonIds is empty
    if (!arrayOfPokemonIds.length) return;
    
    setLoading(true);
    setCurrentPokemonsPlayed([]); // Reset played cards when Pokemon IDs change
    
    async function dataFetcher() {
      try {
        // Create an array of fetch promises to execute in parallel
        const fetchPromises = arrayOfPokemonIds.map(id => 
          fetch(`${DATA_ENDPOINT}${id}`)
            .then(response => response.json())
            .then(json => {
              const capitalizedName = json.name.charAt(0).toUpperCase() + json.name.slice(1);
              return {
                id: id,
                name: capitalizedName,
                img: json.sprites.front_default,
              };
            })
        );
        
        // Wait for all promises to resolve simultaneously
        const fetchedPokemons = await Promise.all(fetchPromises);
        
        setPokemons(fetchedPokemons);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    dataFetcher();
  }, [arrayOfPokemonIds]);

  /**
   * Handles card click events and determines game continuation
   * @param {Object} pokemon - The Pokémon object that was clicked
   */
  function onClick(pokemon) {
    // Check if the pokemon was already played BEFORE updating state
    if (currentPokemonsPlayed.some((p) => p.id === pokemon.id)) {
      gameHandler(true);
      return;
    }

    // The clicked item is added to the current game array
    setCurrentPokemonsPlayed((previousPokemonsPlayed) => [
      ...previousPokemonsPlayed,
      pokemon,
    ]);

    // The game continues
    gameHandler();
    setPokemons(shuffleOrder(pokemons));
  }

  /**
   * Renders skeleton cards for loading state
   * @returns {JSX.Element[]} Array of skeleton card components
   */
  const renderSkeletonCards = () => {
    // Create an array with length of config.numberOfCards
    return Array.from({ length: config.numberOfCards }, (_, index) => (
      <SkeletonCard key={`skeleton-${index}`} />
    ));
  };

  return (
    <div className='card-container'>
      {loading ? (
        renderSkeletonCards()
      ) : (
        pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} onClick={onClick} />
        ))
      )}
    </div>
  );
}

export default CardsHandler;
