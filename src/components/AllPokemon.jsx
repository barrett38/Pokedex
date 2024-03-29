import { useState, useEffect } from "react";
import Header from "./Header";
import PokemonCard from "./pokemonCard.jsx";

// Constants
const numOfPokemons = 333;
const statLevel = 110;

// Only 1 API request is made to get all the pokemons
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
function createStatComponent(stat) {
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
          {stat.charAt(0).toUpperCase() + stat.slice(1)}
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
export const AllPokemon = createStatComponent("all");
export const BestAttacks = createStatComponent("attack");
export const BestSpeed = createStatComponent("speed");
export const BestEndurance = createStatComponent("hp");
export const BestDefense = createStatComponent("defense");

/*
users table
emails table
map.random for pokemon for every sign-in every time
check if email exists in emails table
if it does user gets new pokemon
*/
