import { useState, useEffect } from "react";
import Header from "./Header";
import PokemonCard from "./pokemonCard.jsx";

// Constants
const numOfPokemons = 150;
const statLevel = 110;

// API request for Pokemons
async function fetchPokemons(
  numOfPokemons,
  setLoadedPokemons,
  setIsLoading,
  setError,
  filterFunction
) {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${numOfPokemons}`
    );

    const data = await response.json();
    let pokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonDataResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonDataResponse.json();
        return {
          id: pokemonData.id,
          name: pokemon.name,
          image: pokemonData.sprites.front_default,
          abilities: pokemonData.abilities.map((a) => a.ability.name),
          stats: pokemonData.stats.map((s) => ({
            name: s.stat.name,
            base: s.base_stat,
          })),
          types: pokemonData.types.map((t) => t.type.name),
        };
      })
    );

    // Apply the filter function if one was provided
    if (filterFunction) {
      pokemons = pokemons.filter(filterFunction);
    }

    setLoadedPokemons(pokemons);
  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false);
}

// Function to create a component for a specific stat
function createStatComponent(stat, title) {
  return function StatComponent() {
    const [loadedPokemons, setLoadedPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      let filterFunction;
      if (stat !== "all") {
        filterFunction = (pokemon) =>
          pokemon.stats.some((s) => s.name === stat && s.base >= statLevel);
      }
      fetchPokemons(
        numOfPokemons,
        setLoadedPokemons,
        setIsLoading,
        setError,
        filterFunction
      );
    }, []);

    if (isLoading) {
      return <div id="loading-header">Loading...</div>;
    }

    if (error) {
      return <div id="loading-header">Error: {error}</div>;
    }

    return (
      <div>
        <h3 id="component-header">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h3>

        <Header />
        <ul id="pokemons">
          {loadedPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </ul>
      </div>
    );
  };
}

// Create a component for each stat
export const AllPokemon = createStatComponent("all", "All Pokemon");
export const BestAttacks = createStatComponent("attack", "Best Attacks");
export const BestSpeed = createStatComponent("speed", "Best Speed");
export const BestEndurance = createStatComponent("hp", "Best Endurance");
export const BestDefense = createStatComponent("defense", "Best Defense");
