import { useState, useEffect } from "react";
import Header from "./Header";
import PokemonCard from "./pokemonCard.jsx";

// Filtering Constants
const numOfPokemons = 150;
const statLevel = 110;
const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=";

const NO_FILTER = "all";
const STAT_ATTACK = "attack";
const STAT_SPEED = "speed";
const STAT_HP = "hp";
const STAT_DEFENSE = "defense";

///////////////////////////////////
/// API REQUEST TO POKE API //////
/////////////////////////////////

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
    const response = await fetch(`${API_URL}${numOfPokemons}`);

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

/////////////////////////////////
/// POKEMON STAT FUNCTION //////
///////////////////////////////

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

/////////////////////////////////
/// RUNNING FOR EACH STAT //////
///////////////////////////////

export const AllPokemon = createStatComponent(NO_FILTER, "All Pokemon");
export const BestAttacks = createStatComponent(STAT_ATTACK, "Best Attacks");
export const BestSpeed = createStatComponent(STAT_SPEED, "Best Speed");
export const BestEndurance = createStatComponent(STAT_HP, "Best Endurance");
export const BestDefense = createStatComponent(STAT_DEFENSE, "Best Defense");
